<template>
  <div>
    <div class="row q-mt-md">
      <q-btn outline color="primary" label="Image" @click="insertImage"/>
      <q-btn class="q-ml-md" outline color="primary" label="Doc" @click="insertDoc"/>
    </div>
    <div class="row q-mt-md">
      <div class="col-md-12 col-sm-12 col-xs-12 markdown">
        <q-input outlined
                 ref="qInput"
                 :model-value="modelValue.data"
                 @update:model-value="update"
                 style="height: 80vh;"
                 type="textarea"
                 label="Markdown Content"/>
      </div>
      <ImageSelector ref="imageSelector" :files="media" @select="selectImage"/>
      <DocSelector ref="docSelector" :files="docs" @select="selectDoc"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef} from 'vue';
import {FileDescriptor, WidgetContent} from 'src/modules/cms';
import ImageSelector from "src/shared/components/widget-content/file-selector/ImageSelector.vue";
import DocSelector from "src/shared/components/widget-content/file-selector/DocSelector.vue";

export default defineComponent({
  name: 'MarkdownWidgetEditor',
  components: {DocSelector, ImageSelector},
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
    docs: {
      type: Array as PropType<FileDescriptor[]>,
      default: () => {
        return []
      }
    }
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

    const insertImage = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      imageSelector.value.showDialog()
    }

    const insertText = (insert: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const tArea = qInput.value.getNativeElement() as HTMLTextAreaElement
      // get cursor's position:
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value;

      const content = tmpStr.substring(0, startPos) + insert + tmpStr.substring(endPos, tmpStr.length);
      update(content)

      // // move cursor:
      // setTimeout(() => {
      //   cursorPos += insert.length;
      //   tArea.selectionStart = tArea.selectionEnd = cursorPos;
      // }, 10);
    }

    const selectImage = (file: FileDescriptor) => {
      const insert = `![${file.filename}](/api/annette/v1/cms/file/${file.objectId}/media/${file.fileId})`
     insertText(insert)
    }

    const insertDoc = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      docSelector.value.showDialog()
    }

    const selectDoc = (file: FileDescriptor) => {
      const insert = `[${file.filename}](/api/annette/v1/cms/file/${file.objectId}/doc/${file.fileId})`
      insertText(insert)
    }

    return {
      qInput,
      imageSelector,
      docSelector,
      insertImage,
      selectImage,
      insertDoc,
      selectDoc,
      update
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
