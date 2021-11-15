<template>
  <div>

    <div class="row q-mt-md">
      <q-input class="full-width" bottom-slots
               :model-value="modelValue.data.src"
               @update:model-value="updateSource"
               label="Source">
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="insertImage"/>
        </template>
      </q-input>
      <ImageSelector ref="imageSelector" :files="media" @select="selectImage"/>
    </div>
    <div class="row">
      <q-input class="full-width" bottom-slots
               :model-value="modelValue.data.height"
               @update:model-value="updateHeight"
               label="Height">
      </q-input>
    </div>
    <div class="row">
      <q-input class="full-width" bottom-slots
               :model-value="modelValue.data.speed"
               @update:model-value="updateSpeed"
               label="Speed">
      </q-input>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef} from 'vue';
import {FileDescriptor, WidgetContent} from 'src/modules/cms';
import ImageSelector from 'src/shared/components/widget-content/file-selector/ImageSelector.vue';

export default defineComponent({
  name: 'ParallaxWidgetEditor',
  components: {ImageSelector},
  props: {
    modelValue: {
      type: Object as PropType<WidgetContent>,
      required: true
    },
    media: {
      type: Array as PropType<FileDescriptor[]>,
      default: () => {
        return []
      }
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const qInput = ref()
    const imageSelector = ref()
    const docSelector = ref()

    const modelValue = toRef(props, 'modelValue')
    const update = (content: string) => {
      const data = {
        ...modelValue.value,
        data: content,
        indexData: content,
      }
      emit('update:modelValue', data)
    }
    const updateSource = (src: string) => {
      const updated = {
        ...modelValue.value,
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updated.data.src = src
      emit('update:modelValue', updated)
    }
    const updateHeight = (src: string) => {
      const updated = {
        ...modelValue.value,
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updated.data.height = src
      emit('update:modelValue', updated)
    }

    const updateSpeed = (src: string) => {
      const updated = {
        ...modelValue.value,
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updated.data.speed = src
      emit('update:modelValue', updated)
    }

    const insertImage = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      imageSelector.value.showDialog()
    }


    const selectImage = (file: FileDescriptor) => {
      updateSource(`/api/annette/v1/cms/file/${file.objectId}/media/${file.fileId}`)
    }


    return {
      qInput,
      imageSelector,
      insertImage,
      selectImage,
      update,
      updateSource,
      updateHeight,
      updateSpeed
    }
  }
})
</script>


<style>
.markdown textarea {
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}
</style>
