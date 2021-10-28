<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle2">Attributes</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row" v-for="meta in metadata" :key="meta.name">
        <attribute-field
          :model-value="attributes[meta.name]"
          @update:model-value="updateAttribute($event, meta)"
          :meta="meta"
          :readonly="readonly"
        />

      </div>
    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, watch} from 'vue';
import {AttributeMetadata, AttributeValues, UpdateAttributesPayload} from 'src/shared'
import {Ref} from '@vue/reactivity';
import {orgStructureService} from 'src/modules/org-structure';
import AttributeField from 'src/shared/components/attributes/AttributeField.vue';

export default defineComponent({
  name: 'OrgItemAttributesForm',
  components: {AttributeField},
  props: {
    id: {
      type: String,
      required: true
    },
    metadata: {
      type: Object as PropType<AttributeMetadata[]>,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }

  },
  setup(props) {
    const id: Ref<string> = toRef(props, 'id')
    const readonly: Ref<boolean> = toRef(props, 'readonly')
    const attributes: Ref<AttributeValues> = ref({})

    const loadAttributes = () => {
      if (id.value) {
        void orgStructureService
          .getOrgItemAttributes(id.value, readonly.value, 'all')
          .then(data => attributes.value = data)
      } else {
        attributes.value = {}
      }
    }

    loadAttributes()
    watch(id, loadAttributes)

    const updateAttribute = (value: string, meta: AttributeMetadata) => {
      const payload: UpdateAttributesPayload = {
        id: id.value,
        attributes: {}
      }
      payload.attributes[meta.name] = value
      void orgStructureService.updateOrgItemAttributes(payload)
      .then(() => attributes.value[meta.name] = value)
    }

    return {
      attributes,
      updateAttribute
    }
  }
});
</script>
