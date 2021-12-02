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

    <q-drawer v-model="showWidgetEditor"
              side="right" bordered
              :width="$q.screen.lt.md ? $q.screen.width : 750 ">
      <WidgetContentEditor v-if="selectedWidgetId !== null && entityContent.widgets[selectedWidgetId]"
                           v-model="entityContent.widgets[selectedWidgetId]"
                           :media="media"
                           :docs="docs"
                           @cancel="cancelEdit"
                           @save="save"/>
    </q-drawer>

    <q-page-container>
      <q-page style="background-color: white">
        <div :class="{ 'narrow-layout': narrow, 'q-pa-md': narrow}">
          <q-card flat  >
            <div :class="{'q-pa-md': narrow} ">
              <SeparatorLine v-if="!readonly"
                             :showButton="mode === 'main'"
                             @add="setTemplateSelectionMode(0)"/>

              <div class="full-width"
                   v-for="(widget, index) in entityContentWidgets"
                   :key="widget.id">

                <div class=" q-mt-xs q-mb-xs z-top"
                     v-if="!readonly && selectedWidgetId === widget.id">
                  <div class="float-right1">
                    <q-btn-group>
                      <q-btn color="primary" size="xs" icon="edit"
                             @click.stop="setEditMode(widget)"
                             :disable="mode !== 'main'"/>
                      <q-btn color="primary" size="xs" icon="content_copy"
                             @click.stop="duplicate(widget, index + 1)"
                             :disable="mode !== 'main'"/>

                    </q-btn-group>
                    <q-btn-group class="q-ml-md">
                      <q-btn color="primary" size="xs" label="" icon="arrow_upward"
                             @click.stop="changeOrder(widget, index - 1)"
                             :disable="mode !== 'main' || index === 0"/>
                      <q-btn color="primary" size="xs" icon="arrow_downward"
                             @click.stop="changeOrder(widget, index + 1)"
                             :disable="mode !== 'main' || index === entityContentWidgets.length-1"/>
                    </q-btn-group>
                    <q-btn class="q-ml-lg" color="negative" size="xs" icon="delete"
                           @click.stop="deleteWidget(widget)"
                           :disable="mode !== 'main'"/>
                  </div>
                </div>

                <div @click="toggleWidget(widget.id, index)">
                  <WidgetView :widget="widget" />&nbsp;
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
import {computed, defineComponent, PropType, ref, toRef, watch} from 'vue';
import SeparatorLine from 'src/shared/components/content/editor/SeparatorLine.vue';
import {Content, FileDescriptor, Widget} from 'src/modules/cms';
import {extend, uid} from 'quasar';
import WidgetView from 'src/shared/components/content/WidgetView.vue';
import {Ref} from '@vue/reactivity';
import WidgetContentEditor from './WidgetContentEditor.vue';
import WidgetTemplateSelector from './WidgetTemplateSelector.vue';
import {useRouter} from 'vue-router';

const MAIN_MODE = 'main'
const TEMPLATE_SELECTION_MODE = 'selection'
const EDIT_MODE = 'edit'

export default defineComponent({
  name: 'ContentEditor',
  components: {WidgetTemplateSelector, WidgetContentEditor, SeparatorLine, WidgetView},
  props: {
    readonly: {
      type: Boolean,
      required: true
    },
    content: {
      type: Object as PropType<Content>,
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



    const entityContent: Ref<Content> = ref(extend(true, {}, props.content))
    const entityContentWidgets = computed(() => {
      if (entityContent.value) {
        return entityContent.value.widgetOrder
          // @ts-ignore
          .map(id => entityContent.value.widgets[id])
          .filter(c => c)

      } else {
        return []
      }
    })

    const mode = ref(MAIN_MODE)
    const selectedWidgetId = ref('')
    const selectedWidgetIndex: Ref<number | null> = ref(null)
    const selectedWidgetOrder: Ref<number | null> = ref(null)
    const originalWidget: Ref<Widget<any> | null> = ref(null)
    const showWidgetEditor = ref(false)
    const showWidgetTemplateSelector = ref(false)

    const setMainMode = () => {
      mode.value = MAIN_MODE
      selectedWidgetId.value = ''
      selectedWidgetIndex.value = null
      selectedWidgetOrder.value = null
      originalWidget.value = null
      showWidgetEditor.value = false
      showWidgetTemplateSelector.value = false
    }

    const setTemplateSelectionMode = (order: number) => {
      mode.value = TEMPLATE_SELECTION_MODE
      selectedWidgetId.value = ''
      selectedWidgetIndex.value = null
      originalWidget.value = null
      showWidgetEditor.value = false
      showWidgetTemplateSelector.value = true
      selectedWidgetOrder.value = order
    }

    const setEditMode = (widget: Widget<any>) => {
      showWidgetTemplateSelector.value = false
      if (mode.value === TEMPLATE_SELECTION_MODE) {
        originalWidget.value = null
        // @ts-ignore
        entityContent.value.widgetOrder.splice(selectedWidgetOrder.value, 0, widget.id)
        entityContent.value.widgets[widget.id] = widget
        selectedWidgetIndex.value = selectedWidgetOrder.value
        selectedWidgetId.value = widget.id
      } else {
        let original: Widget<any> = {data: undefined, id: '', widgetType: ''}
        extend(true, original, widget)
        originalWidget.value = original
      }
      mode.value = EDIT_MODE
      showWidgetEditor.value = true
    }


    watch(content, () => {
      entityContent.value = extend(true, {}, content.value)
    }, {deep: true})

    const close = () => {
      router.go(-1)
    }

    const toggleWidget = (id: string, index: number) => {
      if (mode.value == MAIN_MODE) {
        if (selectedWidgetId.value == id) {
          selectedWidgetId.value = ''
          selectedWidgetIndex.value = null
        } else {
          selectedWidgetId.value = id
          selectedWidgetIndex.value = index
        }
      }
    }


    const cancelEdit = () => {
      showWidgetEditor.value = false
      selectedWidgetOrder.value = null
      if (originalWidget.value && selectedWidgetIndex.value !== null) {
        console.log('cancelEdit: update')
        entityContent.value.widgets[selectedWidgetId.value] = originalWidget.value
      } else {
        console.log('cancelEdit: new, index ', selectedWidgetIndex.value)
        // @ts-ignore
        const widgetId = entityContent.value.widgetOrder[selectedWidgetIndex.value] as string
        delete entityContent.value.widgets[widgetId]
        // @ts-ignore
        entityContent.value.widgetOrder.splice(selectedWidgetIndex.value, 1)
        selectedWidgetIndex.value = null
        selectedWidgetId.value = ''
      }
      mode.value = MAIN_MODE
    }

    const save = () => {
      const data = {
        // @ts-ignore
        widget: entityContent.value.widgets[selectedWidgetId.value],
        order: selectedWidgetOrder.value != null ? selectedWidgetOrder.value : undefined
      }
      selectedWidgetOrder.value = null
      originalWidget.value = null
      showWidgetEditor.value = false
      emit('update', data)
      mode.value = MAIN_MODE
    }

    const changeOrder = (widget: Widget<any>, order: number) => {
      const data = {
        widgetId: widget.id,
        order: order
      }
      emit('changeOrder', data)
    }

    const duplicate = (widget: Widget<any>, order: number) => {
      const data = {
        widget: {...widget},
        order: order
      }
      data.widget.id = uid()
      emit('update', data)
    }

    const deleteWidget = (widget: Widget<any>) => {
      emit('delete', widget.id)
    }

    setMainMode()

    return {
      mode,
      entityContent,
      entityContentWidgets,
      showWidgetTemplateSelector,
      showWidgetEditor,
      selectedWidgetId,
      selectedWidgetIndex,
      originalWidget,
      close,
      setMainMode,
      setTemplateSelectionMode,
      setEditMode,
      cancelEdit,
      save,
      toggleWidget,
      changeOrder,
      duplicate,
      deleteWidget,
    }
  }
})
</script>
