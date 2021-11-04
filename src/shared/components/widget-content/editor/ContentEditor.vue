<template>
  <q-dialog persistent
            :model-value="show"
            :maximized="show">

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
       <WidgetTemplateSelector @select="startEdit" @cancel="cancelWidgetTemplateSelection" />
      </q-drawer>

      <q-drawer v-model="showWidgetContentEditor"
                side="right" overlay bordered
                :width="600">
        <WidgetContentEditor v-if="selectedWidgetContent"
                             :widget-content="selectedWidgetContent"
                             @cancel="cancelEdit"
                             @save="save"/>
      </q-drawer>

      <q-page-container>
        <q-page style="background-color: white">
          <div class="narrow-layout q-pa-md ">
            <q-card flat bordered>
              <div class="q-pa-md ">
                <SeparatorLine v-if="!readonly"
                               @add="addWidgetContent(0)"/>

                <div class="full-width"
                     v-for="(widgetContent, index) in content"
                     :key="widgetContent.id">

                  <div class=" q-mt-xs q-mb-xs z-top"
                       v-if="!readonly && selectedWidget === widgetContent.id">
                    <div class="float-right1">
                      <q-btn-group>
                        <q-btn color="primary" size="xs" icon="edit"
                               @click.stop="startEdit(widgetContent)"/>
                        <q-btn color="primary" size="xs" icon="content_copy"
                               @click.stop="duplicate(widgetContent, index + 1)"/>

                      </q-btn-group>
                      <q-btn-group class="q-ml-md">
                        <q-btn color="primary" size="xs" label="" icon="arrow_upward"
                               :disable="index === 0"
                               @click.stop="changeOrder(widgetContent, index - 1)"/>
                        <q-btn color="primary" size="xs" icon="arrow_downward"
                               :disable="index === content.length-1"
                               @click.stop="changeOrder(widgetContent, index + 1)"/>
                      </q-btn-group>
                      <q-btn class="q-ml-lg" color="negative" size="xs" icon="delete"
                             @click.stop="deleteWidgetContent(widgetContent)"/>
                    </div>
                  </div>

                  <div @click="toggleWidgetContent(widgetContent.id)">
                    <WidgetContentView :content="widgetContent"/>&nbsp;
                  </div>

                  <SeparatorLine v-if="!readonly"
                                 @add="addWidgetContent(index + 1)"/>
                </div>
              </div>
            </q-card>
          </div>
        </q-page>
      </q-page-container>

    </q-layout>


  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import SeparatorLine from 'src/shared/components/widget-content/editor/SeparatorLine.vue';
import {WidgetContent} from 'src/modules/cms';
import {uid} from 'quasar';
import WidgetContentView from 'src/shared/components/widget-content/WidgetContentView.vue';
import {Ref} from '@vue/reactivity';
import WidgetContentEditor from './WidgetContentEditor.vue';
import WidgetTemplateSelector from './WidgetTemplateSelector.vue';


export default defineComponent({
  name: 'ContentEditor',
  components: {WidgetTemplateSelector, WidgetContentEditor, SeparatorLine, WidgetContentView},
  props: {
    show: {
      type: Boolean,
      required: true
    },
    readonly: {
      type: Boolean,
      required: true
    },
    content: {
      type: Array as PropType<WidgetContent[]>,
      required: true
    }
  },
  emits: ['close', 'changeOrder', 'update', 'delete'],
  setup(props, {emit}) {


    const showWidgetContentEditor = ref(false)
    const selectedWidgetContent: Ref<WidgetContent | null> = ref(null)
    const selectedWidgetContentOrder: Ref<number | null> = ref(null)

    const startEdit = (widgetContent: WidgetContent) => {
      console.log(widgetContent)
      showWidgetTemplateSelector.value = false
      showWidgetContentEditor.value = true
      selectedWidgetContent.value = widgetContent
    }

    const cancelEdit = () => {
      showWidgetContentEditor.value = false
      selectedWidgetContent.value = null
      selectedWidgetContentOrder.value = null
    }

    const save = (widgetContent: WidgetContent) => {
      const data = {
        widgetContent,
        order: selectedWidgetContentOrder.value != null ? selectedWidgetContentOrder.value : undefined
      }
      selectedWidgetContentOrder.value = null
      showWidgetContentEditor.value = false
      selectedWidgetContent.value = null
      emit('update', data)
    }


    const close = () => {
      emit('close')
    }

    const selectedWidget = ref('')

    const toggleWidgetContent = (id: string) => {
      if (selectedWidget.value == id) {
        selectedWidget.value = ''
      } else {
        selectedWidget.value = id
      }
    }

    const showWidgetTemplateSelector = ref(false)

    const addWidgetContent = (order: number) => {
      showWidgetTemplateSelector.value = true
      selectedWidgetContentOrder.value = order
    }

    const cancelWidgetTemplateSelection = () => {
      showWidgetTemplateSelector.value = false
      selectedWidgetContentOrder.value = null
    }

    const changeOrder = (widgetContent: WidgetContent, order: number) => {
      const data = {
        widgetContentId: widgetContent.id,
        order: order
      }
      console.log(widgetContent)
      console.log(data)
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

    return {
      close,
      showWidgetTemplateSelector,
      showWidgetContentEditor,
      selectedWidgetContent,
      cancelWidgetTemplateSelection,
      startEdit,
      cancelEdit,
      save,
      selectedWidget,
      toggleWidgetContent,
      changeOrder,
      duplicate,
      addWidgetContent,
      deleteWidgetContent,
    }
  }
})
</script>
