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
        <org-category-selector
          :type="unitType"
          label="Organizational category"
          :model-value="entity.categoryId"
          @update:model-value="assignCategory"
          :readonly="action === 'view'"
        />
      </div>

      <div class="row">
        <q-list class="full-width " bordered>
          <q-item-label header>Chief</q-item-label>
          <q-item>
            <q-item-section>
<!--              <pre>-->
<!--{{ entity.chief }}-->
<!--              </pre>-->
              <position-view-field v-if="entity.chief" :position-id="entity.chief"/>
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
      <org-item-selector ref="orgItemSelector" @selected="assignChief"/>


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
import {computed, defineComponent, PropType, ref, toRef} from 'vue';
import OrgCategorySelector from 'src/modules/org-structure/category/components/OrgCategorySelector.vue';
import {useOrgItemForm} from './org-item-form';
import {Ref} from '@vue/reactivity';
import {AssignChiefPayloadDto, OrgItem, UnassignChiefPayloadDto} from 'src/modules/org-structure';
import {useStore} from 'src/store';
import OrgItemSelector from './OrgItemSelector.vue';
import PositionViewField from "src/modules/org-structure/organization/components/PositionViewField.vue";


export default defineComponent({
  name: 'OrgUnitForm',
  components: {PositionViewField, OrgItemSelector, OrgCategorySelector},
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
    const store = useStore()

    const unitType = computed( () => props.entity.parentId === 'ROOT' ? 'org' : 'unit' )
    const entity: Ref<OrgItem> = toRef(props, 'entity')

    const orgItemForm = useOrgItemForm(entity, emit)


    const orgItemSelector = ref()



    const selectChief = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      orgItemSelector.value.showDialog(entity.value.id, 'position')
    }

    const assignChief = (chiefId: string) => {
      const payload: AssignChiefPayloadDto = {
        unitId: entity.value.id,
        chiefId
      }
      store.dispatch('orgItem/assignChief', payload)
        .catch(failure => {
          console.error(failure)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
          orgItemForm.showErrorNotification(failure.code)
        })
    }

    const unassignChief = () => {
      const payload: UnassignChiefPayloadDto = {
        unitId: entity.value.id
      }
      store.dispatch('orgItem/unassignChief', payload)
        .catch(failure => {
          console.error(failure)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
          orgItemForm.showErrorNotification(failure.code)
        })
    }

    return {
      unitType,
      ...orgItemForm,
      orgItemSelector,
      selectChief,
      assignChief,
      unassignChief
    };
  }
});
</script>
