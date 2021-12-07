<template>
  <div class="row  q-mt-md">
    <q-btn-group spread>
      <q-btn color="primary" label="Source" :disabled="modelValue.type === 'source'" @click="setSource"/>
      <q-btn color="primary" label="Media" @click="setImage"/>
    </q-btn-group>
  </div>

  <div class="row q-mt-md" v-if=" modelValue.type === 'source'">
    <q-input class="full-width" bottom-slots
             :model-value="modelValue.src"
             @update:model-value="updateSource"
             label="Source">
    </q-input>
  </div>
  <ImageSelector ref="imageSelector" :files="media" @select="selectImage"/>

</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {FileMediaData, MediaData, SourceMediaData,} from '../../widget-model';
import {FileDescriptor} from 'src/modules/cms';
import ImageSelector from 'src/shared/components/content/file-selector/ImageSelector.vue';

export default defineComponent({
  name: 'MediaForm',
  components: {ImageSelector},
  props: {
    modelValue: {
      type: Object as PropType<MediaData>,
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

    const imageSelector = ref()

    const updateSource = (src: string) => {
      const mediaData = {
        type: 'source',
        src: src
      } as SourceMediaData
      console.log('MediaForm: updateSource:', mediaData)
      emit('update:modelValue', mediaData)
    }

    const setSource = () => {
      updateSource('https://cdn.quasar.dev/img/parallax1.jpg')
    }

    const setImage = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      imageSelector.value.showDialog()
    }

    const selectImage = (file: FileDescriptor) => {
      const mediaData: FileMediaData = {
        type: 'media',
        objectId: file.objectId,
        fileId: file.fileId
      }
      emit('update:modelValue', mediaData)
    }

    return {
      imageSelector,
      setImage,
      setSource,
      updateSource,
      selectImage,
    }
  }
})
</script>

