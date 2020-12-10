<template>
  <div class="q-ma-md full-width ">

    <div class="q-gutter-md" v-if="entity">
      <div class="row text-subtitle1" v-if="this.entity.parentId === 'ROOT'">
        Organization
      </div>
      <div class="row text-subtitle1" v-else>
        Unit
      </div>
      <div class="row">
        <q-input
          class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
          v-model="entity.id"
          label="Id"
          readonly
        />
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          debounce="500"
          :value="entity.name"
          @input="updateName"
          label="Name"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          :value="entity.shortName"
          @input="updateShortName"
          label="Short name"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <org-category-selector
          :type="unitType"
          label="Organization category"
          :value="entity.categoryId"
          @input="assignCategory"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <q-list class="full-width " bordered>
          <q-item-label header>Chief</q-item-label>
          <q-item>
            <q-item-section>
              <position-field v-if="entity.chief" :position-id="entity.chief"/>
              <div v-else class="text-grey-8">Not assigned</div>
            </q-item-section>
            <q-item-section center side>
              <div class="q-gutter-xs">
                <q-btn round dense flat icon="close"
                       v-if="action === 'edit' && entity.chief"
                       @click="unassignChief"/>
                <q-btn round dense flat icon="edit"
                       v-if="action === 'edit' && !entity.chief"
                       @click="selectChief"/>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <org-item-selector :id="entity.orgId" type="position" :show="showChiefSelector" @selected="chiefSelected"
                         @canceled="chiefSelectCanceled"/>

      <updated-fields
        v-if="entity.updatedAt && entity.updatedBy"
        :updated-at="entity.updatedAt"
        :updated-by="entity.updatedBy"/>

    </div>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'
import OrgCategorySelector from 'src/modules/org-structure/components/org-category/OrgCategorySelector.vue'
import {
  AssignCategoryPayloadDto,
  AssignChiefPayloadDto,
  OrgUnit,
  UnassignChiefPayloadDto,
  UpdateNamePayloadDto,
  UpdateShortNamePayloadDto
} from 'src/store/org-structure/org-hierarchy/state'
import OrgItemSelector from 'src/lib/components/org-structure/OrgItemSelector.vue'
import PositionField from 'src/lib/components/org-structure/PositionField.vue'

const namespace = 'orgItem'

@Component({
  components: {PositionField, OrgItemSelector, OrgCategorySelector, UpdatedFields}
})
export default class OrgUnitForm extends Vue {
  @Prop() id
  @Prop() action

  // @ts-ignore
  entity: OrgUnit = null
  unitType = 'unit'

  showChiefSelector = false

  @Getter('entities', {namespace: namespace}) entities;
  @Action('UpdateName', {namespace: namespace}) updateNameAction;
  @Action('UpdateShortName', {namespace: namespace}) updateShortNameAction;
  @Action('AssignCategory', {namespace: namespace}) assignCategoryAction;
  @Action('AssignChief', {namespace: namespace}) assignChiefAction;
  @Action('UnassignChief', {namespace: namespace}) unassignChiefAction;

  @Watch('id', {immediate: true})
  onIdChange(id) {
    this.entity = {...this.entities[id]}
    this.unitType = this.entity.parentId === 'ROOT' ? 'org' : 'unit'
  }

  updateName(newName: string) {
    const payload: UpdateNamePayloadDto = {
      orgId: this.entity?.orgId,
      orgItemId: this.entity?.id,
      name: newName
    }
    this.updateNameAction(payload)
      .then(entity => {
        this.entity = entity
        this.$emit('nameUpdated', entity.name)
      })
      .catch(failure => console.log(failure))
  }

  updateShortName(newName: string) {
    const payload: UpdateShortNamePayloadDto = {
      orgId: this.entity?.orgId,
      orgItemId: this.entity?.id,
      shortName: newName
    }
    this.updateShortNameAction(payload)
      .then(entity => {
        this.entity = entity
      })
      .catch(failure => console.log(failure))
  }

  assignCategory(categoryId: string) {
    const payload: AssignCategoryPayloadDto = {
      orgId: this.entity?.orgId,
      itemId: this.entity?.id,
      categoryId: categoryId
    }
    this.assignCategoryAction(payload)
      .then(entity => {
        this.entity = entity
      })
      .catch(failure => console.log(failure))
  }

  selectChief() {
    this.showChiefSelector = true
  }

  chiefSelected(chiefId) {
    this.showChiefSelector = false
    const payload: AssignChiefPayloadDto = {
      orgId: this.entity?.orgId,
      unitId: this.entity?.id,
      chiefId
    }
    this.assignChiefAction(payload)
      .then(entity => {
        this.entity = entity
      })
      .catch(failure => console.log(failure))
  }

  chiefSelectCanceled() {
    this.showChiefSelector = false
  }

  unassignChief() {
    const payload: UnassignChiefPayloadDto = {
      orgId: this.entity?.orgId,
      unitId: this.entity?.id
    }
    this.unassignChiefAction(payload)
      .then(entity => {
        this.entity = entity
      })
      .catch(failure => console.log(failure))
  }
}

</script>
