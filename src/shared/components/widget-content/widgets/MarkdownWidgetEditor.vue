<template>
  <div>
    <div class="row q-mt-md">
      <q-btn outline color="primary" label="Image" @click="insertImage"/>
      <q-btn class="q-ml-md" outline color="primary" label="Doc" @click="insertDoc"/>
      <ImageSelector ref="imageSelector" :files="media" @select="selectImage"/>
      <DocSelector ref="docSelector" :files="docs" @select="selectDoc"/>
    </div>
    <div class="row q-mt-md">
      <div class="col-md-12 col-sm-12 col-xs-12 ">
        <v-ace-editor
          ref="editor"
          :value="modelValue.data"
          @update:value="update"
          lang="markdown"
          theme="chrome"
          :options="options"
          style="height: 75vh"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef} from 'vue';
import {FileDescriptor, WidgetContent} from 'src/modules/cms';
import ImageSelector from 'src/shared/components/widget-content/file-selector/ImageSelector.vue';
import DocSelector from 'src/shared/components/widget-content/file-selector/DocSelector.vue';
import { VAceEditor } from 'vue3-ace-editor';

import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-chrome';

export default defineComponent({
  name: 'MarkdownWidgetEditor',
  components: {DocSelector, ImageSelector, VAceEditor},
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
    const editor = ref()
    const imageSelector = ref()
    const docSelector = ref()

    const options = {
      wrap: 80
    }

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
      editor.value._editor.session.insert(editor.value._editor.getCursorPosition(), insert)

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
      editor,
      imageSelector,
      docSelector,
      options,
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
