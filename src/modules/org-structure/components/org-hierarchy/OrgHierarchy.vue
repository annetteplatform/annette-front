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
      <div class="row">
        <div class="col-md-6 col-sm-12 col-xs-12 q-pr-md">
          <q-scroll-area style="height: 80vh;">
            <q-tree
              ref="tree"
              :nodes="nodes"
              node-key="id"
              label-key="name"
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
  childrenId?: string[]
}

@Component({
  components: {OrgPositionForm, OrgUnitForm, OrgCategorySelector, UpdatedFields}
})
export default class OrgHierarchy extends Vue {
  @Prop() id
  @Prop() action

  nodes: OrgNode[] = []
  selected = ''

  @Action('GetOrganizationForEdit', {namespace: namespace}) getOrganizationForEdit;
  @Action('GetOrgItemsById', {namespace: namespace}) getOrgItemsById;
  @Action('CreateEntity', {namespace: namespace}) createEntity;
  @Action('UpdateEntity', {namespace: namespace}) updateEntity;
  @Getter('entities', {namespace: namespace}) entities;

  get rootNode(): OrgNode {
    return this.nodes[0] || null
  }

  @Watch('id', {immediate: true})
  onIdChange() {
    this.loadData()
  }

  loadData() {
    this.getOrganizationForEdit(this.id).then((entity: OrgUnit) => {
      const node = this.orgItemToOrgNode(entity)
      this.nodes = [node]
      this.selected = node.id
      this.getOrgItemsById({orgId: node.orgId, ids: node.childrenId}).then(entities => {
        const subNodes = node.childrenId.map(id => this.orgItemToOrgNode(entities[id]))
        node.children = subNodes
        this.$refs.tree.setExpanded(node.orgId, true)
      })
    })
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
    const node = this.$refs.tree.getNodeByKey(this.selected)
    node.name = newName
  }
}

</script>
