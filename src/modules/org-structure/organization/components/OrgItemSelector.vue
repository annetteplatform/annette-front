<template>
  <q-dialog v-model="show" persistent>
    <q-card class="q-ma-md" style="width: 900px;">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">
              <span>Select </span>
            </div>
          </div>
        </div>

      </q-card-section>
      <q-card-section>
        <div class="row" v-if="rootNode">
          <div class="col-md-3 col-sm-12 col-xs-12 q-pr-md">
            <q-input v-model="rootNode.orgId" label="Organization Id" readonly/>
          </div>
          <div class="col-md-9 col-sm-12 col-xs-12 q-pr-md">
            <q-input v-model="rootNode.name" label="Organization name" readonly/>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12 q-pr-md">
            <q-scroll-area class="full-height" style="min-height: 50vh;">
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
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="cancel"/>
        <q-btn label="Select"
               color="primary"
               :disable="!allowSelect "
               @click="select"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';

import {OrgItem, OrgUnit} from 'src/modules/org-structure';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';
import {orgItemToOrgNode, OrgNode} from './org-node';
import {useQuasar} from 'quasar';

export default defineComponent({
  name: 'OrgItemSelector',
  components: {},
  emits: ['selected'],
  setup(props, {emit}) {
    const store = useStore()

    const show = ref(false)
    const id = ref('')
    const type = ref('any')

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

    const showDialog = (idVal: string, typeVal: string) => {
      type.value = typeVal
      id.value = idVal
      void loadEntity(idVal)
      show.value = true
    }

    const loadEntity = async (newId: string) => {
      const entity: OrgUnit = await store.dispatch('orgItem/getEntityForEdit', newId)
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

    const allowSelect = computed(() => {
      return selectedItem.value && (type.value === 'any' || selectedItem.value.itemType === type.value)
    })

    const select = () => {
      emit('selected', selected.value)
      show.value = false
    }

    const cancel = () => {
      show.value = false
    }

    return {
      show,
      id,
      treeRef,
      nodes,
      selected,
      expanded,
      entities,
      rootNode,
      selectedItem,
      onLazyLoad,
      showDialog,
      allowSelect,
      select,
      cancel
    };
  }
});
</script>
