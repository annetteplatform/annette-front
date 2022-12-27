<template>
  <div class="row q-mt-md">
    <q-card flat class="full-width">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="content" label="Content"/>
        <q-tab name="layout" label="Layout"/>
      </q-tabs>
      <q-separator/>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="content">
          <div class="row">
            <q-input class="full-width"
                     :model-value="modelValue.data.anchor"
                     @update:model-value="updateAnchor"
                     label="Anchor">
            </q-input>
          </div>
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
                :value="modelValue.data.markdown"
                @update:value="update"
                lang="markdown"
                theme="chrome"
                :options="options"
                style="height: 75vh"/>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="layout">
          <div class="full-width">
            <LayoutEditForm
              :model-value="modelValue.data.layout"
              @update:model-value="updateLayout"/>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
  <div>

  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef} from 'vue';
import {FileDescriptor, Widget} from 'src/modules/cms';
import ImageSelector from 'src/modules/cms/ui/content/file-selector/ImageSelector.vue';
import DocSelector from 'src/modules/cms/ui/content/file-selector/DocSelector.vue';
import { VAceEditor } from 'vue3-ace-editor';

import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-chrome';
import {MarkdownData, markdownToIndex, WidgetLayout} from 'src/modules/cms/ui/content/widget-model';
import LayoutEditForm from 'src/modules/cms/ui/content/widgets/components/LayoutEditForm.vue';

export default defineComponent({
  name: 'MarkdownWidgetEditor',
  components: {LayoutEditForm, DocSelector, ImageSelector, VAceEditor},
  props: {
    modelValue: {
      type: Object as PropType<Widget<MarkdownData>>,
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
    const tab = ref('content')
    const editor = ref()
    const imageSelector = ref()
    const docSelector = ref()

    const options = {
      wrap: 80
    }

    const modelValue = toRef(props, 'modelValue')

    const updateAnchor = (anchor: string) => {
      const widget: Widget<MarkdownData> = {...modelValue.value}
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }

    const update = (content: string) => {
      const widget = {
        ...modelValue.value,
        indexData: markdownToIndex(content),
      }
      widget.data.markdown = content
      emit('update:modelValue', widget)
    }

    const updateLayout = (layout: WidgetLayout) => {
      const widget: Widget<MarkdownData> = {...modelValue.value}
      widget.data.layout = layout
      emit('update:modelValue', widget)
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
      tab,
      editor,
      imageSelector,
      docSelector,
      options,
      insertImage,
      selectImage,
      insertDoc,
      selectDoc,
      updateAnchor,
      update,
      updateLayout
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
