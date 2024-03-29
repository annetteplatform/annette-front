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
            <q-editor
              ref="qEditor"
              :model-value="modelValue.data.html"
              @update:model-value="updateHtml"
              debounce="1000"
              min-height="10rem"
              height="80vh"
              :toolbar="[
                  [
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      list: 'only-icons',
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                  [ 'hr', 'link', 'image', 'doc'],
                  ['print', 'fullscreen'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      label: $q.lang.editor.defaultFont,
                      icon: $q.iconSet.editor.font,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                      ]
                    },
                    'removeFormat'
                  ],
                  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  ['undo', 'redo'],
                  [ 'viewsource']
                ]"
              :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana'
                }"
              :definitions="{
                  image: {
                    tip: 'Insert image',
                    icon: 'image',
                    handler: insertImage
                   },
                   doc: {
                    tip: 'Insert doc',
                    icon: 'article',
                    handler: insertDoc
                   },
        }
"
            />
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

    <ImageSelector ref="imageSelector" :files="media" @select="selectImage"/>
    <DocSelector ref="docSelector" :files="docs" @select="selectDoc"/>
  </div>

</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef} from 'vue';
import {FileDescriptor, Widget} from 'src/modules/cms';
import {HtmlData, htmlToIndex, WidgetLayout} from '../widget-model';
import ImageSelector from 'src/modules/cms/ui/content/file-selector/ImageSelector.vue';
import DocSelector from 'src/modules/cms/ui/content/file-selector/DocSelector.vue';
import LayoutEditForm from 'src/modules/cms/ui/content/widgets/components/LayoutEditForm.vue';

export default defineComponent({
  name: 'HtmlWidgetEditor',
  components: {LayoutEditForm, DocSelector, ImageSelector},
  props: {
    modelValue: {
      type: Object as PropType<Widget<HtmlData>>,
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
    const qEditor = ref()
    const imageSelector = ref()
    const docSelector = ref()
    const modelValue = toRef(props, 'modelValue')
    const updateHtml = (content: string) => {
      const widget: Widget<HtmlData> = {
        ...modelValue.value,
        indexData: htmlToIndex(content)
      }
      widget.data.html = content
      emit('update:modelValue', widget)
    }

    const updateAnchor = (anchor: string) => {
      const widget: Widget<HtmlData> = {
        ...modelValue.value,
      }
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }

    const updateLayout = (layout: WidgetLayout) => {
      const widget: Widget<HtmlData> = {
        ...modelValue.value,
      }
      widget.data.layout = layout
      emit('update:modelValue', widget)
    }

    const insertImage = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      imageSelector.value.showDialog()
    }

    const selectImage = (file: FileDescriptor) => {
      console.log(file)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      qEditor.value.runCmd('insertImage', `/api/annette/v1/cms/file/${file.objectId}/media/${file.fileId}`)
    }

    const insertDoc = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      docSelector.value.showDialog()
    }

    const selectDoc = (file: FileDescriptor) => {
      console.log(file)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      qEditor.value.runCmd('insertHTML',
        `<a href="/api/annette/v1/cms/file/${file.objectId}/doc/${file.fileId}">${file.filename}</a>`)
    }


    return {
      tab,
      qEditor,
      imageSelector,
      docSelector,
      updateAnchor,
      updateHtml,
      updateLayout,
      insertImage,
      selectImage,
      insertDoc,
      selectDoc
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
