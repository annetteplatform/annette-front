<template>
  <div class="q-ma-md full-width ">

    <div class="q-gutter-md" v-if="entity">
      <div class="row text-subtitle1">
        Position
      </div>
      <div class="row">
        <q-input
          class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
          :model-value="entity.id"
          label="Id"
          readonly
        />
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          debounce="500"
          :model-value="entity.name"
          @update:model-value="updateName"
          label="Name"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <org-position-category-selector
          label="Organizational category"
          :model-value="entity.categoryId"
          @update:model-value="assignCategory"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <person-assignment-form :entity="entity" :readonly="action === 'view'" />
      </div>

      <div class="row">
        <org-role-assignment-form :entity="entity" :readonly="action === 'view'" />
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          debounce="500"
          :model-value="entity.source"
          @update:model-value="updateSource"
          label="Source"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          debounce="500"
          :model-value="entity.externalId"
          @update:model-value="updateExternalId"
          label="External Id"
          :readonly="action === 'view'"
        />
      </div>

      <!--      <updated-fields-->
      <!--        v-if="entity.updatedAt && entity.updatedBy"-->
      <!--        :updated-at="entity.updatedAt"-->
      <!--        :updated-by="entity.updatedBy"/>-->

    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, toRef} from 'vue';
import {useOrgItemForm} from './org-item-form';
import {Ref} from '@vue/reactivity';
import {OrgItem} from 'src/modules/org-structure';
import OrgPositionCategorySelector from 'src/modules/org-structure/category/components/OrgPositionCategorySelector.vue';
import PersonAssignmentForm from './PersonAssignmentForm.vue';
import OrgRoleAssignmentForm from './OrgRoleAssignmentForm.vue';


export default defineComponent({
  name: 'OrgPositionForm',
  components: {OrgRoleAssignmentForm, PersonAssignmentForm, OrgPositionCategorySelector},
  props: {
    action: {
      type: String,
      required: true,
    },
    entity: {
      type: Object as PropType<OrgItem>,
      required: true
    },
  },
  emits: ['nameUpdated'],
  setup(props, {emit}) {

    const unitType = 'position'

    const entity: Ref<OrgItem> = toRef(props, 'entity')

    const orgItemForm = useOrgItemForm(entity, emit)

    return {
      unitType,
      ...orgItemForm

    };
  }
});
</script>
