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
      <org-hierarchy :id="id" :action="action"/>
    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import {uid} from 'quasar'
import {OrgUnitDto} from 'src/store/org-structure/org-hierarchy/state'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'
import OrgCategorySelector from 'src/modules/org-structure/components/org-category/OrgCategorySelector.vue'
import OrgHierarchy from 'src/modules/org-structure/components/org-hierarchy/OrgHierarchy.vue'

const namespace = 'orgItem'

@Component({
  components: {OrgHierarchy, OrgCategorySelector, UpdatedFields}
})
export default class OrganizationForm extends Vue {
  @Prop() id
  @Prop() action

  entity: OrgUnitDto = {
    id: '',
    orgId: '',
    parentId: 'ROOT',
    itemType: 'unit',
    name: '',
    shortName: '',
    categoryId: '',
    level: 0,
    children: []
  }

  @Action('GetOrganizationForEdit', {namespace: namespace}) getOrganizationForEdit;
  @Action('CreateEntity', {namespace: namespace}) createEntity;
  @Action('UpdateEntity', {namespace: namespace}) updateEntity;

  @Watch('id', {immediate: true})
  onIdChange() {
    this.loadData()
  }

  loadData() {
    console.log('load data', this.action, this.id)
    if (this.action === 'create' && this.id === 'new') {
      this.entity = {
        id: '',
        orgId: '',
        parentId: 'ROOT',
        itemType: 'unit',
        name: '',
        shortName: '',
        categoryId: '',
        level: 0,
        children: []
      }
    } else if (this.action === 'create') {
      this.getOrganizationForEdit(this.id).then(entity => {
        this.entity = {...entity, id: uid()}
      })
    } else {
      this.getOrganizationForEdit(this.id).then(entity => {
        this.entity = {...entity}
      })
    }
  }

  save() {
    console.log('save')
    if (this.action === 'create') {
      this.createEntity(this.entity).then(entity => {
        // eslint-disable-next-line no-void
        void this.$router.push({name: 'organization', params: {action: 'edit', id: entity.id}})
      })
    } else if (this.action === 'edit') {
      this.updateEntity(this.entity).then(entity => {
        this.entity = entity
      })
    }
  }
}

</script>
