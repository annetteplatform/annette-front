<template>
  <div class="q-ma-md full-width ">

    <div class="q-gutter-md" v-if="entity">
      <div class="row text-subtitle1" >
         Position
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
          type="position"
          label="Category"
          :value="entity.categoryId"
          @input="assignCategory"
          :readonly="action === 'view'"
        />
      </div>

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
  AssignCategoryPayloadDto, OrgPosition,
  UpdateNamePayloadDto,
  UpdateShortNamePayloadDto
} from 'src/store/org-structure/org-hierarchy/state'

const namespace = 'orgItem'

@Component({
  components: {OrgCategorySelector, UpdatedFields}
})
export default class OrgPositionForm extends Vue {
  @Prop() id
  @Prop() action

  entity: OrgPosition

  @Getter('entities', {namespace: namespace}) entities;
  @Action('UpdateName', {namespace: namespace}) updateNameAction;
  @Action('UpdateShortName', {namespace: namespace}) updateShortNameAction;
  @Action('AssignCategory', {namespace: namespace}) assignCategoryAction;

  @Watch('id', {immediate: true})
  onIdChange() {
    this.entity = {...this.entities[this.id]}
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
      .then(entity => { this.entity = entity })
      .catch(failure => console.log(failure))
  }

  assignCategory(categoryId: string) {
    const payload: AssignCategoryPayloadDto = {
      orgId: this.entity?.orgId,
      itemId: this.entity?.id,
      categoryId: categoryId
    }
    this.assignCategoryAction(payload)
      .then(entity => { this.entity = entity })
      .catch(failure => console.log(failure))
  }
}

</script>
