<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle2">Attributes</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row" v-for="meta in sortedMeta" :key="meta.name">
        <q-select class="col-md-12 col-sm-12 col-xs-12 "
                  v-if="meta.type == 'string' && meta.allowedValues"
                  :model-value="modelValue[meta.name]"
                  @update:model-value="setAttribute($event, meta)"
                  :label="getCaption(meta)"
                  :options="meta.allowedValues"
                  :readonly="readonly"/>
        <q-checkbox class="q-pt-md q-b-md"
                    v-else-if="meta.type == 'boolean'"
                    :model-value="modelValue[meta.name] === 'true' ? true : modelValue[meta.name] === 'false' ? false : ''"
                    @update:model-value="setAttribute($event === true ? 'true' : $event === '' ? '' : 'false', meta)"
                    :label="getCaption(meta)"
                    :disable="readonly"
                    indeterminate-value=""
                    toggle-indeterminate
                    left-label/>
        <q-input v-else-if="meta.type == 'json'"
                 class="col-md-12 col-sm-12 col-xs-12 "
                 stack-label
                 type="textarea"
                 :model-value="modelValue[meta.name]"
                 @update:model-value="setAttribute($event, meta)"
                 :label="getCaption(meta)"
                 :readonly="readonly"/>
        <q-input v-else
                 class="col-md-12 col-sm-12 col-xs-12 "
                 stack-label
                 :model-value="modelValue[meta.name]"
                 @update:model-value="setAttribute($event, meta)"
                 :label="getCaption(meta)"
                 :readonly="readonly"
        />
      </div>
    </q-card-section>
  </q-card>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {
  AttributeMetadata,
  AttributeValues,
  EntityAttributesMetadata,
  TextCaption,
  TranslationCaption
} from 'src/shared'
import {Ref} from '@vue/reactivity';

export default defineComponent({
  name: 'AttributesForm',
  components: {},
  props: {
    modelValue: {
      type: Object as PropType<AttributeValues>,
      required: true
    },
    metadata: {
      type: Object as PropType<EntityAttributesMetadata>,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }

  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const metadata: Ref<EntityAttributesMetadata> = toRef(props, "metadata")
    const attributes: Ref<AttributeValues> = toRef(props, "modelValue")

    const sortedMeta = computed(() => Object.values(metadata.value).sort((a, b) => a.name < b.name ? -1 : 1))

    const getCaption = (meta: AttributeMetadata) => {
      const caption = meta.caption.type == 'text' ? (meta.caption as TextCaption).text : (meta.caption as TranslationCaption).translationId
      if (meta.type === 'boolean' || meta.allowedValues) {
        return caption
      } else {
        return `${caption} (${meta.type})`
      }
    }

    const setAttribute = (value: string, meta: AttributeMetadata) => {
      const updatedAttributes = {...attributes.value}
      updatedAttributes[meta.name] = value
      emit('update:modelValue', updatedAttributes)
    }

    return {
      sortedMeta,
      getCaption,
      setAttribute
    }
  }
});
</script>
