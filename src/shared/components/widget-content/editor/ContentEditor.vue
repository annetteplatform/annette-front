<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="arrow_back" @click="close"/>

        <q-toolbar-title>
          Content editor
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="showWidgetTemplateSelector" side="left" overlay bordered>
      <WidgetTemplateSelector @select="setEditMode" @cancel="setMainMode"/>
    </q-drawer>

    <q-drawer v-model="showWidgetContentEditor"
              side="right" bordered
              :width="750">
      <WidgetContentEditor v-if="selectedWidgetContentIndex !== null && entityContent[selectedWidgetContentIndex]"
                           v-model="entityContent[selectedWidgetContentIndex]"
                           :media="media"
                           :docs="docs"
                           @cancel="cancelEdit"
                           @save="save"/>
    </q-drawer>

    <q-page-container>
      <q-page style="background-color: white">
        <div :class="{ 'narrow-layout': narrow, 'q-pa-md': narrow}">
          <q-card flat :bordered="narrow" >
            <div :class="{'q-pa-md': narrow} ">
              <SeparatorLine v-if="!readonly"
                             :showButton="mode === 'main'"
                             @add="setTemplateSelectionMode(0)"/>

              <div class="full-width"
                   v-for="(widgetContent, index) in entityContent"
                   :key="widgetContent.id">

                <div class=" q-mt-xs q-mb-xs z-top"
                     v-if="!readonly && selectedWidgetContentId === widgetContent.id">
                  <div class="float-right1">
                    <q-btn-group>
                      <q-btn color="primary" size="xs" icon="edit"
                             @click.stop="setEditMode(widgetContent)"
                             :disable="mode !== 'main'"/>
                      <q-btn color="primary" size="xs" icon="content_copy"
                             @click.stop="duplicate(widgetContent, index + 1)"
                             :disable="mode !== 'main'"/>

                    </q-btn-group>
                    <q-btn-group class="q-ml-md">
                      <q-btn color="primary" size="xs" label="" icon="arrow_upward"
                             @click.stop="changeOrder(widgetContent, index - 1)"
                             :disable="mode !== 'main' || index === 0"/>
                      <q-btn color="primary" size="xs" icon="arrow_downward"
                             @click.stop="changeOrder(widgetContent, index + 1)"
                             :disable="mode !== 'main' || index === entityContent.length-1"/>
                    </q-btn-group>
                    <q-btn class="q-ml-lg" color="negative" size="xs" icon="delete"
                           @click.stop="deleteWidgetContent(widgetContent)"
                           :disable="mode !== 'main'"/>
                  </div>
                </div>

                <div @click="toggleWidgetContent(widgetContent.id, index)">
                  <WidgetContentView :content="widgetContent"/>&nbsp;
                </div>

                <SeparatorLine v-if="!readonly"
                               :showButton="mode === 'main'"
                               @add="setTemplateSelectionMode(index + 1)"/>
              </div>
            </div>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, watch} from 'vue';
import SeparatorLine from 'src/shared/components/widget-content/editor/SeparatorLine.vue';
import {FileDescriptor, WidgetContent} from 'src/modules/cms';
import {extend, uid} from 'quasar';
import WidgetContentView from 'src/shared/components/widget-content/WidgetContentView.vue';
import {Ref} from '@vue/reactivity';
import WidgetContentEditor from './WidgetContentEditor.vue';
import WidgetTemplateSelector from './WidgetTemplateSelector.vue';
import {useRouter} from 'vue-router';

const MAIN_MODE = 'main'
const TEMPLATE_SELECTION_MODE = 'selection'
const EDIT_MODE = 'edit'

export default defineComponent({
  name: 'ContentEditor',
  components: {WidgetTemplateSelector, WidgetContentEditor, SeparatorLine, WidgetContentView},
  props: {
    readonly: {
      type: Boolean,
      required: true
    },
    content: {
      type: Array as PropType<WidgetContent[]>,
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
    },
    narrow: {
      type: Boolean,
      required: true
    },
  },
  emits: ['changeOrder', 'update', 'delete'],
  setup(props, {emit}) {
    const router = useRouter()

    const content = toRef(props, 'content')

    const entityContent: Ref<WidgetContent[]> = ref(extend(true, [], props.content))

    const mode = ref(MAIN_MODE)
    const selectedWidgetContentId = ref('')
    const selectedWidgetContentIndex: Ref<number | null> = ref(null)
    const selectedWidgetContentOrder: Ref<number | null> = ref(null)
    const originalWidgetContent: Ref<WidgetContent | null> = ref(null)
    const showWidgetContentEditor = ref(false)
    const showWidgetTemplateSelector = ref(false)

    const setMainMode = () => {
      mode.value = MAIN_MODE
      selectedWidgetContentId.value = ''
      selectedWidgetContentIndex.value = null
      selectedWidgetContentOrder.value = null
      originalWidgetContent.value = null
      showWidgetContentEditor.value = false
      showWidgetTemplateSelector.value = false
    }

    const setTemplateSelectionMode = (order: number) => {
      mode.value = TEMPLATE_SELECTION_MODE
      selectedWidgetContentId.value = ''
      selectedWidgetContentIndex.value = null
      originalWidgetContent.value = null
      showWidgetContentEditor.value = false
      showWidgetTemplateSelector.value = true
      selectedWidgetContentOrder.value = order
    }

    const setEditMode = (widgetContent: WidgetContent) => {
      showWidgetTemplateSelector.value = false
      if (mode.value === TEMPLATE_SELECTION_MODE) {
        originalWidgetContent.value = null
        // @ts-ignore
        entityContent.value.splice(selectedWidgetContentOrder.value, 0, widgetContent)
        selectedWidgetContentIndex.value = selectedWidgetContentOrder.value
        selectedWidgetContentId.value = widgetContent.widgetType
      } else {
        let original: WidgetContent = {data: undefined, id: '', widgetType: ''}
        extend(true, original, widgetContent)
        originalWidgetContent.value = original
      }
      mode.value = EDIT_MODE
      showWidgetContentEditor.value = true
    }



    watch(content, () => {
      console.log('watch content')
      entityContent.value = extend(true, [], content.value)
    })

    const close = () => {
      router.go(-1)
    }

    const toggleWidgetContent = (id: string, index: number) => {
      if (mode.value == MAIN_MODE) {
        if (selectedWidgetContentId.value == id) {
          selectedWidgetContentId.value = ''
          selectedWidgetContentIndex.value = null
        } else {
          selectedWidgetContentId.value = id
          selectedWidgetContentIndex.value = index
        }
      }
    }


    const cancelEdit = () => {
      showWidgetContentEditor.value = false
      selectedWidgetContentOrder.value = null
      if (originalWidgetContent.value && selectedWidgetContentIndex.value !== null) {
        console.log('cancelEdit: update')
        entityContent.value[selectedWidgetContentIndex.value] = originalWidgetContent.value
      } else {
        console.log('cancelEdit: new, index ', selectedWidgetContentIndex.value)
        // @ts-ignore
        entityContent.value.splice(selectedWidgetContentIndex.value, 1)
        selectedWidgetContentIndex.value = null
        selectedWidgetContentId.value = ''
      }
      mode.value = MAIN_MODE
    }

    const save = () => {
      const data = {
        // @ts-ignore
        widgetContent: entityContent.value[selectedWidgetContentIndex.value],
        order: selectedWidgetContentOrder.value != null ? selectedWidgetContentOrder.value : undefined
      }
      selectedWidgetContentOrder.value = null
      originalWidgetContent.value = null
      showWidgetContentEditor.value = false
      emit('update', data)
      mode.value = MAIN_MODE
    }

    const changeOrder = (widgetContent: WidgetContent, order: number) => {
      const data = {
        widgetContentId: widgetContent.id,
        order: order
      }
      emit('changeOrder', data)
    }

    const duplicate = (widgetContent: WidgetContent, order: number) => {
      const data = {
        widgetContent: {...widgetContent},
        order: order
      }
      data.widgetContent.id = uid()
      emit('update', data)
    }

    const deleteWidgetContent = (widgetContent: WidgetContent) => {
      emit('delete', widgetContent.id)
    }

    setMainMode()

    return {
      mode,
      entityContent,
      showWidgetTemplateSelector,
      showWidgetContentEditor,
      selectedWidgetContentId,
      selectedWidgetContentIndex,
      originalWidgetContent,
      close,
      setMainMode,
      setTemplateSelectionMode,
      setEditMode,
      cancelEdit,
      save,
      toggleWidgetContent,
      changeOrder,
      duplicate,
      deleteWidgetContent,
    }
  }
})
</script>
