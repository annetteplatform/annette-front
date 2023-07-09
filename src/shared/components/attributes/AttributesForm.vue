<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle2"> {{ $t('annette.shared.attribute.titlePl') }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row q-pb-md" v-for="meta in metadata" :key="meta.name">
        <q-select class="col-md-12 col-sm-12 col-xs-12 " outlined stack-label dense
                  v-if="meta.type == 'string' && meta.allowedValues"
                  :model-value="modelValue[meta.name]"
                  @update:model-value="setAttribute($event, meta)"
                  :label="getCaption(meta)"
                  :options="[ '', ...meta.allowedValues]"
                  :readonly="readonly"
        />
        <q-checkbox dense
                    v-else-if="meta.type == 'boolean'"
                    :model-value="modelValue[meta.name] === 'true' ? true : modelValue[meta.name] === 'false' ? false : ''"
                    @update:model-value="setAttribute($event === true ? 'true' : $event === '' ? '' : 'false', meta)"
                    :label="getCaption(meta)"
                    :disable="readonly"
                    indeterminate-value=""
                    toggle-indeterminate
                    left-label
        />
        <q-input v-else-if="meta.type == 'json'" outlined stack-label dense
                 class="col-md-12 col-sm-12 col-xs-12 "
                 type="textarea"
                 :model-value="modelValue[meta.name]"
                 @update:model-value="setAttribute($event, meta)"
                 :label="getCaption(meta)"
                 :readonly="readonly"
        />
        <q-input v-else
                 class="col-md-12 col-sm-12 col-xs-12 " outlined stack-label dense
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
import {defineComponent, PropType, toRef} from 'vue';
import {
  AttributeMetadata,
  AttributeValues,
  TextCaption,
  TranslationCaption
} from 'src/shared/model'
import {Ref} from '@vue/reactivity';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'AttributesForm',
  components: {},
  props: {
    modelValue: {
      type: Object as PropType<AttributeValues>,
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
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const attributes: Ref<AttributeValues> = toRef(props, 'modelValue')

    const i18n = useI18n()

    const getCaption = (meta: AttributeMetadata) => {
      let caption = ''
      if (meta.caption.type == 'text') caption = (meta.caption as TextCaption).text
      else caption = i18n.t((meta.caption as TranslationCaption).translationId)
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
      getCaption,
      setAttribute
    }
  }
});
</script>
