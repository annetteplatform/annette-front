<template>
        <q-select class="col-md-12 col-sm-12 col-xs-12 "
                  v-if="meta.type == 'string' && meta.allowedValues"
                  :model-value="modelValue"
                  @update:model-value="updateAttribute"
                  :label="caption"
                  :options="[ '', ...meta.allowedValues]"
                  :readonly="readonly"
                  stack-label
        />
        <q-checkbox class="q-pt-md q-b-md"
                    v-else-if="meta.type == 'boolean'"
                    :model-value="modelValue === 'true' ? true : modelValue === 'false' ? false : ''"
                    @update:model-value="updateAttribute($event === true ? 'true' : $event === '' ? '' : 'false')"
                    :label="caption"
                    :disable="readonly"
                    indeterminate-value=""
                    toggle-indeterminate
                    left-label
        />
        <q-input v-else-if="meta.type == 'json'"
                 class="col-md-12 col-sm-12 col-xs-12 "
                 stack-label
                 type="textarea"
                 v-model="attributeCache"
                 :label="caption"
                 :readonly="readonly"
        >
          <template v-slot:after v-if="attributeCache !== modelValue">
            <q-btn round dense flat icon="check" color="primary" @click="updateAttribute(attributeCache)"/>
            <q-btn round dense flat icon="clear" color="negative" @click="attributeCache = modelValue"/>
          </template>
        </q-input>
        <q-input v-else
                 class="col-md-12 col-sm-12 col-xs-12 "
                 stack-label
                 v-model="attributeCache"
                 :label="caption"
                 :readonly="readonly"
                 @keydown.enter.prevent="updateAttribute(attributeCache)"
        >
          <template v-slot:append v-if="attributeCache !== modelValue">
            <q-btn round dense flat icon="check" color="primary" @click="updateAttribute(attributeCache)"/>
            <q-btn round dense flat icon="clear" color="negative" @click="attributeCache = modelValue"/>
          </template>
        </q-input>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, toRef, watch} from 'vue';
import {
  AttributeMetadata,
  TextCaption,
  TranslationCaption
} from 'src/shared'
import {Ref} from '@vue/reactivity';

export default defineComponent({
  name: 'AttributeField',
  components: {},
  props: {
    modelValue: {
      type: String,
      required: true
    },
    meta: {
      type:Object as PropType<AttributeMetadata>,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }

  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const attribute: Ref<string> = toRef(props, 'modelValue')
    const attributeCache: Ref<string> = ref(props.modelValue)
    const meta: Ref<AttributeMetadata> = toRef(props, 'meta')

    watch(attribute, (newAttribute: string) => attributeCache.value = newAttribute)

    const caption = computed(() => {
      const caption = meta.value.caption.type == 'text' ? (meta.value.caption as TextCaption).text : (meta.value.caption as TranslationCaption).translationId
      if (meta.value.type === 'boolean' || meta.value.allowedValues) {
        return caption
      } else {
        return `${caption} (${meta.value.type})`
      }
    })

    const updateAttribute = (value: string) => {
      emit('update:modelValue', value)
    }

    return {
      attributeCache,
      caption,
      updateAttribute
    }
  }
});
</script>
