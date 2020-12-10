<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">
            <span v-if="action == 'edit'">Edit organization</span>
            <span v-else-if="action == 'view'">View organization</span>

          </div>
        </div>
        <div class="col-auto q-gutter-sm">
          <q-btn outline color="primary"
                 to="/org-structure/organizations"
                 label="Organizations"/>
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
        <q-btn class="q-mr-md" outline color="negative"
               @click="deleteItem"
               :disable="!(selected && selectedItem && selectedItem.parentId !== 'ROOT')"
               icon="delete"
               label="Delete"/>

        <create-org-item-dialog :show="showCreateDialog"
                                :type="itemType"
                                :parentId="selected"
                                :orgId="id"
                                @created="orgItemCreated"
                                @cancel="orgItemCreateCanceled"/>

      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12 col-xs-12 q-pr-md">
          <q-scroll-area class="full-height" style="min-height: 80vh;">
            <q-tree
              ref="tree"
              :nodes="nodes"
              node-key="id"
              label-key="name"
              :expanded.sync="expanded"
              :selected.sync="selected"
              selected-color="primary"
              @lazy-load="onLazyLoad"
            />
          </q-scroll-area>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 q-pr-md">
          <org-unit-form
            v-if="selected && entities[selected] && entities[selected].itemType==='unit'"
            :id="selected"
            :action="action"
            @nameUpdated="itemNameUpdated"
          />

          <org-position-form
            v-if="selected && entities[selected] && entities[selected].itemType==='position'"
            :id="selected"
            :action="action"
            @nameUpdated="itemNameUpdated"
          />

        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'
import OrgCategorySelector from 'src/modules/org-structure/components/org-category/OrgCategorySelector.vue'
import {OrgItem, OrgPosition, OrgUnit} from 'src/store/org-structure/org-hierarchy/state'
import OrgUnitForm from 'src/modules/org-structure/components/org-hierarchy/OrgUnitForm.vue'
import OrgPositionForm from 'src/modules/org-structure/components/org-hierarchy/OrgPositionForm.vue'
import CreateOrgItemDialog from 'src/modules/org-structure/components/org-hierarchy/CreateOrgItemDialog.vue'

const namespace = 'orgItem'

interface OrgNode {
  id: string,
  orgId: string,
  parentId: string,
  itemType: string,
  name: string,
  lazy: boolean,
  icon: string,
  expandable: boolean,
  selectable: boolean,
  children?: OrgNode[]
  childrenId: string[]
}

@Component({
  components: {CreateOrgItemDialog, OrgPositionForm, OrgUnitForm, OrgCategorySelector, UpdatedFields}
})
export default class OrgHierarchy extends Vue {
  @Prop() id
  @Prop() action

  nodes: OrgNode[] = []
  selected = ''
  expanded = []

  showCreateDialog = false
  itemType = 'unit'

  @Action('GetOrganizationForEdit', {namespace: namespace}) getOrganizationForEdit;
  @Action('GetOrgItemsById', {namespace: namespace}) getOrgItemsById;
  @Action('DeleteUnit', {namespace: namespace}) deleteUnit;
  @Action('DeletePosition', {namespace: namespace}) deletePosition;
  @Getter('entities', {namespace: namespace}) entities;

  get rootNode(): OrgNode {
    return this.nodes[0] || null
  }

  get selectedItem(): OrgItem | null {
    if (this.selected) {
      return this.entities[this.selected] as OrgItem
    } else return null
  }

  @Watch('id', {immediate: true})
  onIdChange() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.loadData()
  }

  async loadData() {
    const entity: OrgUnit = await this.getOrganizationForEdit(this.id)
    const node = this.orgItemToOrgNode(entity)
    if (entity.children.length > 0) {
      const entities = await this.getOrgItemsById({orgId: node.orgId, ids: node.childrenId})
      node.children = node.childrenId.map(id => this.orgItemToOrgNode(entities[id]))
      Vue.set(this.expanded, 0, node.id)
      Vue.set(this.nodes, 0, node)
      this.selected = node.id
    } else {
      Vue.set(this.nodes, 0, node)
      this.selected = node.id
    }
  }

  onLazyLoad({node, done, fail}) {
    this.getOrgItemsById({orgId: node.orgId, ids: node.childrenId}).then(entities => {
      const subNodes = node.childrenId.map(id => this.orgItemToOrgNode(entities[id]))
      if (done) done(subNodes)
    }).catch(failure => {
      console.error(failure)
      if (fail) fail(failure)
    })
  }

  orgItemToOrgNode(orgItem: OrgItem): OrgNode {
    if (orgItem.itemType === 'unit') {
      const orgUnit = orgItem as OrgUnit
      return {
        id: orgUnit.id,
        orgId: orgUnit.orgId,
        parentId: orgUnit.parentId,
        itemType: orgUnit.itemType,
        name: orgUnit.name,
        icon: orgUnit.parentId === 'ROOT' ? 'account_balance' : 'account_tree',
        lazy: orgUnit.children.length > 0,
        selectable: true,
        expandable: orgUnit.children.length > 0,
        childrenId: orgUnit.children
      }
    } else {
      const orgPosition = orgItem as OrgPosition
      return {
        id: orgPosition.id,
        orgId: orgPosition.orgId,
        parentId: orgPosition.parentId,
        itemType: orgPosition.itemType,
        name: orgPosition.name,
        icon: 'person',
        lazy: false,
        selectable: true,
        expandable: false,
        childrenId: []
      }
    }
  }

  itemNameUpdated(newName: string) {
    // @ts-ignore
    const node = this.$refs.tree.getNodeByKey(this.selected)
    node.name = newName
  }

  createUnit() {
    this.itemType = 'unit'
    this.showCreateDialog = true
  }

  createPosition() {
    this.itemType = 'position'
    this.showCreateDialog = true
  }

  deleteItem() {
    if (this.selected && this.selectedItem) {
      const message = this.selectedItem.itemType === 'unit' ? 'Please confirm delete unit.' : 'Please confirm delete position.'
      const selectedItem = this.selectedItem
      this.$q.notify({
        type: 'negative',
        message,
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
            color: 'white',
            handler: () => {
              const payload = {orgId: selectedItem.orgId, id: selectedItem.id}
              const promise = selectedItem.itemType === 'unit' ? this.deleteUnit(payload) : this.deletePosition(payload)
              promise
                .then(() => {
                  // @ts-ignore
                  const parentNode: OrgNode = this.$refs.tree.getNodeByKey(selectedItem.parentId)
                  if (parentNode) {
                    // @ts-ignore
                    parentNode.children = parentNode.children.filter(item => item.id !== payload.id)
                    parentNode.childrenId = parentNode.childrenId.filter(item => item !== payload.id)
                  }
                })
            }
          }
        ]
      })
    }
  }

  orgItemCreated(item) {
    const node = this.orgItemToOrgNode(item.child)
    // @ts-ignore
    const parentNode: OrgNode = this.$refs.tree.getNodeByKey(node.parentId)
    if (parentNode) {
      parentNode.childrenId.push(node.id)
      if (parentNode.children) {
        parentNode.children.push(node)
      } else {
        parentNode.expandable = true
        Vue.set(parentNode, 'children', [node])
      }
    }
    this.showCreateDialog = false
  }

  orgItemCreateCanceled() {
    this.showCreateDialog = false
  }
}

</script>
