<template>
  <entity-page narrow
               :caption="action === 'edit' ? $t('annette.orgStructure.organization.editTitle') : $t('annette.orgStructure.organization.viewTitle') "
               :action="action"
               :show-form="!!rootNode"
               hide-status-bar>
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="orgStructure.organization"
                                   :back-label="$t('annette.orgStructure.organization.titlePl')"
                                   back-route-name="orgStructure.organizations"/>
    </template>
    <template v-slot:default>
      <div class="q-ml-md q-mr-md "
           v-if="rootNode">

        <div class="row">
          <div class="col-md-3 col-sm-12 col-xs-12 q-pr-md">
            <q-input v-model="rootNode.id"
                     :label="$t('annette.orgStructure.orgItem.field.id')" readonly/>
          </div>
          <div class="col-md-9 col-sm-12 col-xs-12 q-pr-md">
            <q-input v-model="rootNode.name"
                     :label="$t('annette.orgStructure.orgItem.field.name')" readonly/>
          </div>
        </div>

        <div class="row q-ma-md " v-if="action === 'edit'">
          <q-btn class="q-mr-md" outline color="primary"
                 @click="createUnit"
                 :disable="!(selected && selectedItem && selectedItem.itemType === 'unit')"
                 icon="add"
                 label="Unit"/>
          <q-btn class="q-mr-md" outline color="primary"
                 @click="createPosition"
                 :disable="!(selected && selectedItem && selectedItem.itemType === 'unit')"
                 icon="add"
                 label="Position"/>
          <q-btn class="q-mr-md" outline color="primary"
                 @click="moveItem"
                 :disable="!(selected && selectedItem && selectedItem.parentId !== 'ROOT')"
                 icon="low_priority"
                 label="Move"/>
          <q-btn class="q-mr-md" outline color="negative"
                 @click="deleteItem"
                 :disable="!(selected && selectedItem && selectedItem.parentId !== 'ROOT')"
                 icon="delete"
                 label="Delete"/>
          <create-org-item-dialog ref="createOrgItemDialog" @created="orgItemCreated"/>
        </div>
        <div class="row q-mt-md">
          <div class="col-md-6 col-sm-12 col-xs-12 q-pr-md">
            <q-scroll-area class="full-height" style="min-height: 72vh;">
              <q-tree
                ref="treeRef"
                :nodes="nodes"
                node-key="id"
                label-key="name"
                v-model:expanded="expanded"
                v-model:selected="selected"
                selected-color="primary"
                @lazy-load="onLazyLoad"
              />
            </q-scroll-area>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12 q-pr-md">
            <org-unit-form
              v-if="selectedItem && selectedItem.itemType==='unit'"
              :entity="selectedItem"
              :action="action"
              @nameUpdated="itemNameUpdated"
            />

            <org-position-form
              v-if="selectedItem && selectedItem.itemType==='position'"
              :entity="selectedItem"
              :action="action"
              @nameUpdated="itemNameUpdated"
            />

            <org-item-attributes-form
              v-if="selected && metadata"
              :id="selected"
              :metadata="metadata"
              :readonly="action === 'view'"
            />
          </div>
        </div>

      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {computed, defineComponent, Ref, ref, toRefs, watch} from 'vue';

import {OrgItem, orgStructureService, OrgUnit, useOrgItemStore} from 'src/modules/org-structure';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {useQuasar} from 'quasar';
import {orgItemToOrgNode, OrgNode} from 'src/modules/org-structure/ui/organization/components/org-node';
import {AttributeMetadata} from 'src/shared/model';
import {OnCreatedEvent} from 'src/modules/org-structure/ui/organization/components/on-created-event';
import {useI18n} from 'vue-i18n';
import CreateOrgItemDialog from 'src/modules/org-structure/ui/organization/components/CreateOrgItemDialog.vue';
import OrgUnitForm from 'src/modules/org-structure/ui/organization/components/OrgUnitForm.vue';
import OrgPositionForm from 'src/modules/org-structure/ui/organization/components/OrgPositionForm.vue';
import OrgItemAttributesForm from 'src/modules/org-structure/ui/organization/components/OrgItemAttributesForm.vue';

export default defineComponent({
  name: 'OrganizationPage',
  components: {
    OrgItemAttributesForm,
    OrgPositionForm, OrgUnitForm, CreateOrgItemDialog, DefaultEntityPageToolbar, EntityPage
  },
  props: {
    id: String,
    action: String
  },
  setup(props) {

    const store = useOrgItemStore()
    const quasar = useQuasar()
    const i18n = useI18n()


    const {id, action} = toRefs(props)
    const prevProps = ref('')

    const createOrgItemDialog = ref()
    const treeRef = ref()
    const nodes: Ref<OrgNode[]> = ref([])
    const selected = ref('')
    const expanded: Ref<string[]> = ref([])

    const metadata: Ref<AttributeMetadata[]> = ref([])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const entities = computed(() => store.entities)
    const rootNode = computed(() => nodes.value[0] || null)
    const selectedItem = computed(() => {
      if (selected.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return entities.value[selected.value] as OrgItem
      } else return null
    })

    const showErrorNotification = (message: string) => {
      quasar.notify({
        type: 'negative',
        message,
        actions: [
          {label: 'Close', color: 'white'},
        ]
      })
    }

    const loadEntity = async () => {
      void orgStructureService
        .getOrgItemMetadata()
        .then(data => metadata.value = Object.values(data).sort((a, b) => a.name < b.name ? -1 : 1))
      const entity: OrgUnit = await store.getEntityForEdit(id.value as string) as OrgUnit
      const node = orgItemToOrgNode(entity)
      if (entity.children.length > 0) {
        const childrenEntities: OrgItem[] = await store.getEntitiesForEdit(node.childrenId)
        const entitiesMap: { [id: string]: OrgItem } = {}
        childrenEntities.map(entity => entitiesMap[entity.id] = {...entity})
        node.children = node.childrenId.map(id => orgItemToOrgNode(entitiesMap[id]))
        expanded.value[0] = node.id
        nodes.value[0] = node
        selected.value = node.id
      } else {
        nodes.value[0] = node
        selected.value = node.id
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLazyLoad = async ({node, done, fail}: { node: OrgNode, done: Function, fail: Function }) => {
      try {
        const childrenEntities: OrgItem[] = await store.getEntitiesForEdit(node.childrenId)
        const entitiesMap: { [id: string]: OrgItem } = {}
        childrenEntities.map(entity => entitiesMap[entity.id] = {...entity})
        const subNodes = node.childrenId.map(id => orgItemToOrgNode(entitiesMap[id]))
        if (done) done(subNodes)
      } catch (failure) {
        console.error(failure)
        if (fail) fail(failure)
      }
    }


    const createUnit = () => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      createOrgItemDialog.value.showDialog('unit', selectedItem.value.id)
    }

    const createPosition = () => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      createOrgItemDialog.value.showDialog('position', selectedItem.value.id)
    }

    const orgItemCreated = (item: OnCreatedEvent) => {
      const node = orgItemToOrgNode(item.child)
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const parentNode: OrgNode = treeRef.value.getNodeByKey(node.parentId)
      if (parentNode) {
        parentNode.childrenId.push(node.id)
        if (parentNode.children) {
          parentNode.children.push(node)
        } else {
          parentNode.expandable = true
          parentNode.children = [node]
        }
      }
    }

    const moveItem = () => {
      quasar.notify({
        type: 'warning',
        message: 'Not implemented',
        actions: [
          {label: 'Close', color: 'white'},
        ]
      })
    }

    const deleteItem = () => {
      if (selectedItem.value) {
        quasar.notify({
          type: 'negative',
          message: i18n.t('annette.orgStructure.organization.deleteOrgItemQuestion'),
          actions: [
            {label: 'Cancel', color: 'white'},
            {
              label: 'Delete',
              color: 'white',
              handler: async () => {
                try {
                  // @ts-ignore
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                  const parentNode: OrgNode = treeRef.value.getNodeByKey(selectedItem.value.parentId)
                  void await store.deleteEntity(selected.value)
                  if (parentNode) {
                    // @ts-ignore
                    parentNode.children = parentNode.children.filter(item => item.id !== selected.value)
                    parentNode.childrenId = parentNode.childrenId.filter(item => item !== selected.value)
                  }
                } catch (ex: any) {
                  console.error(ex)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  showErrorNotification(ex.code)
                }
              }
            }
          ]
        })
      }
    }

    const itemNameUpdated = (newName: string) => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const node: OrgNode = treeRef.value.getNodeByKey(selected.value)
      if (node) {
        node.name = newName
      }
    }

    const watcher = () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const newProps = `${action.value}/${id.value}`
      if (prevProps.value !== newProps) {
        void loadEntity()
      }
      prevProps.value = newProps
    }

    void loadEntity()
    watch(id, watcher)
    watch(action, watcher)

    return {
      createOrgItemDialog,
      treeRef,
      nodes,
      selected,
      expanded,
      entities,
      rootNode,
      selectedItem,
      onLazyLoad,
      createUnit,
      createPosition,
      orgItemCreated,
      moveItem,
      deleteItem,
      itemNameUpdated,
      metadata
    }
  }
});
</script>
