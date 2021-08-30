<template>
  <entity-page class="q-ma-md"
               :caption=" action === 'edit' ? 'Edit organization' : 'View organization' "
               :show-form="!!rootNode">
    <!--               :error="error"-->
    <!--               @clearError="clearError">-->
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Organizations"
             :to="{name: 'orgStructure.organizations'}"/>
      <q-btn v-if="action !== 'view'"
             class="q-mr-md" outline color="primary"
             label="View"
             :to="{ name: 'orgStructure.organization', params: { action: 'view', id } }"/>
      <q-btn v-if="action !== 'edit'"
             class="q-mr-md" outline color="primary"
             label="Edit"
             :to="{ name: 'orgStructure.organization', params: { action: 'edit', id } }"/>

    </template>
    <template v-slot:status>
      <div class="q-ml-md q-mr-md">
        <q-chip outline square color="green" text-color="white" label="Some status info"/>
      </div>
    </template>
    <template v-slot:default>
      <div class="q-ml-md q-mr-md "
           v-if="rootNode">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-xs-12 q-pr-md">
            <q-input v-model="rootNode.id" label="Organization Id" readonly/>
          </div>
          <div class="col-md-9 col-sm-12 col-xs-12 q-pr-md">
            <q-input v-model="rootNode.name" label="Organization name" readonly/>
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
                @lazy-load="onLazyLoad"/>
            </q-scroll-area>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12 q-pr-md">

            <org-unit-form
              v-if="selectedItem && selectedItem.itemType==='unit'"
              :entity="selectedItem"
              :action="action"
              @nameUpdated="itemNameUpdated"/>

            <org-position-form
              v-if="selectedItem && selectedItem.itemType==='position'"
              :entity="selectedItem"
              :action="action"
              @nameUpdated="itemNameUpdated"/>

          </div>
        </div>


      </div>


    </template>
  </entity-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';

import {OrgItem, OrgUnit} from 'src/modules/org-structure';
import EntityPage from 'src/shared/components/EntityPage.vue';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';
import {RouteLocationNormalizedLoaded, useRoute} from 'vue-router';
import {OnCreatedEvent} from './components/on-created-event';
import CreateOrgItemDialog from './components/CreateOrgItemDialog.vue';
import OrgUnitForm from './components/OrgUnitForm.vue';
import OrgPositionForm from './components/OrgPositionForm.vue';
import {orgItemToOrgNode, OrgNode} from './components/org-node';
import {useQuasar} from 'quasar';

export default defineComponent({
  name: 'OrganizationPage',
  components: {OrgPositionForm, OrgUnitForm, CreateOrgItemDialog, EntityPage},
  setup() {
    const store = useStore()
    const quasar = useQuasar()
    const route: RouteLocationNormalizedLoaded = useRoute()

    const action = ref(typeof route.params.action === 'string' ? route.params.action : route.params.action[0])
    const id = ref(typeof route.params.id === 'string' ? route.params.id : route.params.id[0])

    const createOrgItemDialog = ref()
    const treeRef = ref()
    const nodes: Ref<OrgNode[]> = ref([])
    const selected = ref('')
    const expanded: Ref<string[]> = ref([])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const entities = computed(() => store.getters['orgItem/entities'])
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

    const loadEntity = async (newRoute: RouteLocationNormalizedLoaded) => {
      if (!newRoute.params.action) return {}
      action.value = typeof newRoute.params.action === 'string' ? newRoute.params.action : newRoute.params.action[0]
      id.value = typeof newRoute.params.id === 'string' ? newRoute.params.id : newRoute.params.id[0]
      const entity: OrgUnit = await store.dispatch('orgItem/getEntityForEdit', id.value)
      const node = orgItemToOrgNode(entity)
      if (entity.children.length > 0) {
        const childrenEntities: OrgItem[] = await store.dispatch('orgItem/getEntitiesForEdit', node.childrenId)
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
        const childrenEntities: OrgItem[] = await store.dispatch('orgItem/getEntitiesForEdit', node.childrenId)
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
        type: 'negative',
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
          message: 'Please confirm delete org. item',
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
                  void await store.dispatch('orgItem/deleteEntity', selected.value)
                  if (parentNode) {
                    // @ts-ignore
                    parentNode.children = parentNode.children.filter(item => item.id !== selected.value)
                    parentNode.childrenId = parentNode.childrenId.filter(item => item !== selected.value)
                  }
                } catch (ex) {
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

    void loadEntity(route)
    watch(route, loadEntity)

    return {
      action,
      id,
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
      itemNameUpdated
    };
  }
});
</script>
