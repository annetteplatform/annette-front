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

          <div class="row">
            <q-input class="full-width"
                     :model-value="modelValue.data.title"
                     @update:model-value="updateTitle"
                     label="Title">
            </q-input>
          </div>

          <div class="row ">
            <q-input class="full-width"
                     :model-value="modelValue.data.textColor"
                     @update:model-value="updateTextColor"
                     label="Text color">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color :model-value="modelValue.data.textColor"
                             @update:model-value="updateTextColor"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="row ">
            <q-input class="full-width"
                     :model-value="modelValue.data.backgroundColor"
                     @update:model-value="updateBackgroundColor"
                     label="Background color">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color :model-value="modelValue.data.backgroundColor"
                             @update:model-value="updateBackgroundColor"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row q-mt-md">
            <q-list class="full-width" bordered separator>
              <q-item>
                <q-item-section>Menu items</q-item-section>
                <q-item-section top side>
                  <q-btn size="12px" flat dense round icon="add" @click="addAction"/>
                </q-item-section>
              </q-item>
              <q-item v-for="(action, index) in modelValue.data.actions" :key="index">
                <q-card class="full-width" flat>
                  <q-card-section horizontal>
                    <div class="full-width">
                      <q-input class="full-width" dense
                               :model-value="action.caption"
                               @update:model-value="updateActionCaption(index, $event)"
                               label="Title">
                      </q-input>
                      <q-select class="full-width" dense
                                :model-value="action.type"
                                @update:model-value="updateActionType(index, $event)"
                                :options="actionOptions"
                                label="Type"/>
                      <div v-if="action.type === 'url' ">
                        <q-input class="full-width" dense
                                 :model-value="action.url"
                                 @update:model-value="updateActionUrl(index, $event)"
                                 label="URL"/>
                        <q-checkbox left-label dense
                                    :model-value="action.newWindow"
                                    @update:model-value="updateActionNewWindow(index, $event)"
                                    label="Open in new window"/>
                      </div>
                    </div>
                    <q-card-actions vertical class="justify-around q-ml-md">
                      <q-btn size="sm" flat round color="red" icon="delete"/>
                      <q-btn size="sm" flat round color="primary" icon="arrow_upward"
                             :disable="index === 0"
                      @click="swapActions(index - 1, index)"/>
                      <q-btn size="sm" flat round color="primary" icon="arrow_downward"
                             :disable="index === modelValue.data.actions.length-1"
                             @click="swapActions(index, index + 1)"/>
                    </q-card-actions>
                  </q-card-section>
                </q-card>
              </q-item>
            </q-list>

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
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef} from 'vue';
import {Widget} from 'src/modules/cms';
import {HeaderData, WidgetLayout} from 'src/shared/components/content';
import LayoutEditForm from 'src/shared/components/content/widgets/components/LayoutEditForm.vue';

export default defineComponent({
  name: 'HeaderWidgetEditor',
  components: {LayoutEditForm},
  props: {
    modelValue: {
      type: Object as PropType<Widget<HeaderData>>,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const tab = ref('content')
    const modelValue = toRef(props, 'modelValue')
    const actionOptions = ref(['login', 'logout', 'url'])

    const updateAnchor = (anchor: string) => {
      const widget: Widget<HeaderData> = {...modelValue.value}
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }


    const updateTitle = (text: string) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      widget.data.title = text
      emit('update:modelValue', widget)
    }


    const updateTextColor = (color: string) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      widget.data.textColor = color
      emit('update:modelValue', widget)
    }

    const updateBackgroundColor = (color: string) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      widget.data.backgroundColor = color
      emit('update:modelValue', widget)
    }

    const addAction = () => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      const action = {
        caption: 'Action',
        type: 'url',
        // @ts-ignore
        url: '#',
        newWindow: false
      }
      widget.data.actions = [...widget.data.actions, action]
      console.log(widget.data.actions)
      emit('update:modelValue', widget)
    }

    const swapActions = (index1: number, index2: number) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      const actions = [...widget.data.actions]
      const swap = actions[index1]
      actions[index1] = actions[index2]
      actions[index2] = swap
      widget.data.actions = actions
      emit('update:modelValue', widget)
    }

    const updateActionCaption = (index: number, caption: string) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      widget.data.actions[index].caption = caption
      emit('update:modelValue', widget)
    }

    const updateActionType = (index: number, type: string) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      const caption = widget.data.actions[index].caption
      switch (type) {
        case 'login':
        case 'logout': {
          widget.data.actions[index] = {caption, type}
          break
        }
        case 'url': {
          widget.data.actions[index] = {
            caption,
            type,
            // @ts-ignore
            url: '#',
            newWindow: false
          }
        }
      }

      emit('update:modelValue', widget)
    }

    const updateActionUrl = (index: number, url: string) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      if (widget.data.actions[index].type === 'url') {
        // @ts-ignore
        widget.data.actions[index].url = url
      }
      emit('update:modelValue', widget)
    }

    const updateActionNewWindow = (index: number, newWindow: boolean) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      if (widget.data.actions[index].type === 'url') {
        // @ts-ignore
        widget.data.actions[index].newWindow = newWindow
      }
      emit('update:modelValue', widget)
    }

    const updateLayout = (layout: WidgetLayout) => {
      const widget: Widget<HeaderData> = {
        ...modelValue.value,
      }
      widget.data.layout = layout
      emit('update:modelValue', widget)
    }


    return {
      tab,
      actionOptions,
      updateAnchor,
      updateTitle,
      updateTextColor,
      updateBackgroundColor,
      addAction,
      swapActions,
      updateActionCaption,
      updateActionType,
      updateActionUrl,
      updateActionNewWindow,
      updateLayout,
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
