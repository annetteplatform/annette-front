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
            <q-select class="col-md-4" dense
                      :model-value="modelValue.data.container.wrap"
                      @update:model-value="updateContainerWrap"
                      :options="wrapOptions"
                      label="Wrap"/>
            <q-select class="col-md-4" dense
                      :model-value="modelValue.data.container.justify"
                      @update:model-value="updateContainerJustify"
                      :options="justifyOptions"
                      label="Justify"/>
            <q-select class="col-md-4" dense
                      :model-value="modelValue.data.container.align"
                      @update:model-value="updateContainerAlign"
                      :options="alignOptions"
                      label="Align"/>
          </div>

          <!--          Content Items    -->
          <div class="row q-mt-md">
            <q-list class="full-width" bordered separator>
              <q-item>
                <q-item-section>Columns</q-item-section>
                <q-item-section top side>
                  <q-btn size="12px" flat dense round icon="add" @click="addColumn"/>
                </q-item-section>
              </q-item>
              <q-item v-for="(item, index) in modelValue.data.items" :key="index">
                <q-card class="full-width" flat>
                  <q-card-section class="q-px-none q-pt-none q-pb-xs">
                    <q-item-label class="text-subtitle2 ">Item #{{ index }}</q-item-label>
                  </q-card-section>
                  <q-card-section class="q-mb-md" horizontal>
                    <div class="full-width">
                      <q-input class="full-width" dense
                               :model-value="item.maxWidth"
                               @update:model-value="updateItemMaxWidth(index, $event)"
                               label="Max Width">
                      </q-input>
                      <div class="row q-mt-sm">
                        <q-checkbox dense
                                    :model-value="!!item.media"
                                    @update:model-value="enableItemMedia(index, $event)"
                                    label="Show media"/>
                      </div>
                      <MediaForm v-if="!!item.media"
                                 :model-value="item.media"
                                 @update:model-value="updateItemMedia(index,$event)"
                                 :media="media"/>
                      <div class="row q-mt-sm">
                        <q-checkbox dense
                                    :model-value="!!item.header"
                                    @update:model-value="enableItemHeader(index, $event)"
                                    label="Show header"/>
                      </div>
                      <div v-if="!!item.header" class="q-mb-md">
                        <q-input class="full-width" dense
                                 :model-value="item.header.text"
                                 @update:model-value="updateItemElementText(index, 'header', $event)"
                                 label="Text"/>
                        <div class="row q-my-md">
                          <q-select class="col-md-4" dense
                                    :model-value="item.header.style"
                                    @update:model-value="updateItemElementStyle(index, 'header', $event)"
                                    :options="styleOptions"
                                    label="Style"/>
                          <q-select class="col-md-4" dense
                                    :model-value="item.header.weight"
                                    @update:model-value="updateItemElementWeight(index, 'header', $event)"
                                    :options="weightOptions"
                                    label="Weight"/>
                          <q-select class="col-md-4" dense
                                    :model-value="item.header.justify"
                                    @update:model-value="updateItemElementJustify(index, 'header', $event)"
                                    :options="textJustifyOptions"
                                    label="Justify"/>
                        </div>
                      </div>
                      <div class="row q-mt-sm">
                        <q-checkbox dense
                                    :model-value="!!item.subheader"
                                    @update:model-value="enableItemSubheader(index, $event)"
                                    label="Show subheader"/>
                      </div>
                      <div v-if="!!item.subheader" class="q-mb-md">
                        <q-input class="full-width" dense
                                 :model-value="item.subheader.text"
                                 @update:model-value="updateItemElementText(index, 'subheader', $event)"
                                 label="Text"/>
                        <div class="row q-my-md">
                          <q-select class="col-md-4" dense
                                    :model-value="item.subheader.style"
                                    @update:model-value="updateItemElementStyle(index, 'subheader', $event)"
                                    :options="styleOptions"
                                    label="Style"/>
                          <q-select class="col-md-4" dense
                                    :model-value="item.subheader.weight"
                                    @update:model-value="updateItemElementWeight(index, 'subheader', $event)"
                                    :options="weightOptions"
                                    label="Weight"/>
                          <q-select class="col-md-4" dense
                                    :model-value="item.subheader.justify"
                                    @update:model-value="updateItemElementJustify(index, 'subheader', $event)"
                                    :options="textJustifyOptions"
                                    label="Justify"/>
                        </div>
                      </div>
                      <div class="row  q-mt-sm">
                        <q-checkbox dense
                                    :model-value="!!item.text"
                                    @update:model-value="enableItemText(index, $event)"
                                    label="Show text"/>
                      </div>
                      <div v-if="!!item.text" class="q-mb-md">
                        <q-input class="full-width" dense outlined
                                 :model-value="item.text.text"
                                 @update:model-value="updateItemElementText(index, 'text', $event)"
                                 type="textarea"
                                 label="Text"/>
                        <div class="row q-mt-sm">
                          <q-select class="col-md-4" dense
                                    :model-value="item.text.style"
                                    @update:model-value="updateItemElementStyle(index, 'text', $event)"
                                    :options="styleOptions"
                                    label="Style"/>
                          <q-select class="col-md-4" dense
                                    :model-value="item.text.weight"
                                    @update:model-value="updateItemElementWeight(index, 'text', $event)"
                                    :options="weightOptions"
                                    label="Weight"/>
                          <q-select class="col-md-4" dense
                                    :model-value="item.text.justify"
                                    @update:model-value="updateItemElementJustify(index, 'text', $event)"
                                    :options="textJustifyOptions"
                                    label="Justify"/>
                        </div>
                      </div>
                      <div class="row q-mt-sm">
                        <q-checkbox dense
                                    :model-value="!!item.action"
                                    @update:model-value="enableItemAction(index, $event)"
                                    label="Show action"/>
                      </div>
                      <div v-if="!!item.action" class="q-mb-md">
                        <q-input class="full-width" dense
                                 :model-value="item.action.caption"
                                 @update:model-value="updateActionCaption(index, $event)"
                                 label="Caption"/>
                        <div class="row q-mt-sm">
                          <q-select class="col-md-6" dense
                                    :model-value="item.action.type"
                                    @update:model-value="updateActionType(index, $event)"
                                    :options="actionTypeOptions"
                                    label="Type"/>
                          <q-select class="col-md-6" dense
                                    :model-value="item.action.justify"
                                    @update:model-value="updateActionJustify(index, $event)"
                                    :options="justifyOptions"
                                    label="Justify"/>
                        </div>
                          <q-select class="full-width" dense
                                    :model-value="item.action.action"
                                    @update:model-value="updateActionAction(index, $event)"
                                    :options="actionOptions"
                                    label="Action"/>
                        <div v-if="item.action.action === 'url'">
                          <q-input class="full-width" dense
                                   :model-value="item.action.url"
                                   @update:model-value="updateActionUrl(index, $event)"
                                   label="URL"/>
                          <q-checkbox dense
                                      :model-value="item.action.newWindow"
                                      @update:model-value="updateActionNewWindow(index, $event)"
                                      label="Open in new window"/>
                        </div>
                      </div>

                    </div>
                    <q-card-actions vertical class="justify-start q-ml-md">
                      <q-btn size="sm" flat round color="red" icon="delete"
                             @click="deleteColumn(index)"/>
                      <q-btn size="sm" flat round color="primary" icon="arrow_upward"
                             :disable="index === 0"
                             @click="swapColumns(index - 1, index)"/>
                      <q-btn size="sm" flat round color="primary" icon="arrow_downward"
                             :disable="index === modelValue.data.items.length-1"
                             @click="swapColumns(index, index + 1)"/>
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
import {FileDescriptor, Widget} from 'src/modules/cms';
import {
  CONTENT_ACTION_TYPES, CONTENT_ACTIONS,
  CONTENT_ALIGNMENTS,
  CONTENT_JUSTIFIES,
  CONTENT_TEXT_JUSTIFIES,
  CONTENT_TEXT_STYLES,
  CONTENT_TEXT_WEIGHTS,
  CONTENT_WRAPS,
  ContentData,
  ContentItemData,
  MediaData,
  WidgetLayout
} from 'src/shared/components/content';
import LayoutEditForm from 'src/shared/components/content/widgets/components/LayoutEditForm.vue';
import MediaForm from 'src/shared/components/content/widgets/components/MediaForm.vue';

export default defineComponent({
  name: 'ContentWidgetEditor',
  components: {MediaForm, LayoutEditForm},
  props: {
    modelValue: {
      // Replace any with your type
      type: Object as PropType<Widget<ContentData>>,
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
    const tab = ref('content')
    const modelValue = toRef(props, 'modelValue')

    const updateAnchor = (anchor: string) => {
      const widget: Widget<ContentData> = {...modelValue.value}
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }

    const wrapOptions = ['', ...CONTENT_WRAPS]

    const updateContainerWrap = (wrap: string) => {
      // Replace any with your type
      const widget: Widget<ContentData> = {...modelValue.value}
      widget.data.container.wrap = wrap
      emit('update:modelValue', widget)
    }

    const justifyOptions = ['', ...CONTENT_JUSTIFIES]

    const updateContainerJustify = (justify: string) => {
      // Replace any with your type
      const widget: Widget<ContentData> = {...modelValue.value}
      widget.data.container.justify = justify
      emit('update:modelValue', widget)
    }

    const alignOptions = ['', ...CONTENT_ALIGNMENTS]

    const updateContainerAlign = (align: string) => {
      // Replace any with your type
      const widget: Widget<ContentData> = {...modelValue.value}
      widget.data.container.align = align
      emit('update:modelValue', widget)
    }


    const addColumn = () => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      const column: ContentItemData = {
        maxWidth: '300px',
      }
      widget.data.items = [...widget.data.items, column]
      emit('update:modelValue', widget)
    }

    const deleteColumn = (index: number) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      widget.data.items.splice(index, 1)
      emit('update:modelValue', widget)
    }

    const swapColumns = (index1: number, index2: number) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      const columns = [...widget.data.items]
      const swap = columns[index1]
      columns[index1] = columns[index2]
      columns[index2] = swap
      widget.data.items = columns
      emit('update:modelValue', widget)
    }

    const updateItemMaxWidth = (index: number, maxWidth: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      widget.data.items[index].maxWidth = maxWidth
      emit('update:modelValue', widget)
    }

    const enableItemMedia = (index: number, enable: boolean) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      if (enable) {
        widget.data.items[index].media = {
          type: 'source',
          // @ts-ignore
          src: 'https://cdn.quasar.dev/img/parallax1.jpg'
        }
      } else {
        widget.data.items[index].media = undefined
      }
      emit('update:modelValue', widget)
    }

    const updateItemMedia = (index: number, media: MediaData) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      widget.data.items[index].media = media
      emit('update:modelValue', widget)
    }

    const enableItemHeader = (index: number, enable: boolean) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      if (enable) {
        widget.data.items[index].header = {
          text: 'Header',
          style: 'h6',
          weight: '',
          justify: 'center'
        }
      } else {
        widget.data.items[index].header = undefined
      }
      emit('update:modelValue', widget)
    }

    const enableItemSubheader = (index: number, enable: boolean) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      if (enable) {
        widget.data.items[index].subheader = {
          text: 'Subheader',
          style: 'subtitle1',
          weight: '',
          justify: 'center'
        }
      } else {
        widget.data.items[index].subheader = undefined
      }
      emit('update:modelValue', widget)
    }

    const enableItemText = (index: number, enable: boolean) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      if (enable) {
        widget.data.items[index].text = {
          text: 'Text',
          style: '',
          weight: '',
          justify: 'center'
        }
      } else {
        widget.data.items[index].text = undefined
      }
      emit('update:modelValue', widget)
    }

    const updateItemElementText = (index: number, element: string, text: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      widget.data.items[index][element].text = text
      emit('update:modelValue', widget)
    }

    const styleOptions = ['', ...CONTENT_TEXT_STYLES]
    const weightOptions = ['', ...CONTENT_TEXT_WEIGHTS]
    const textJustifyOptions = ['', ...CONTENT_TEXT_JUSTIFIES]

    const updateItemElementStyle = (index: number, element: string, style: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      widget.data.items[index][element].style = style
      emit('update:modelValue', widget)
    }

    const updateItemElementWeight = (index: number, element: string, weight: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      widget.data.items[index][element].weight = weight
      emit('update:modelValue', widget)
    }

    const updateItemElementJustify = (index: number, element: string, justify: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      widget.data.items[index][element].justify = justify
      emit('update:modelValue', widget)
    }

    const enableItemAction = (index: number, enable: boolean) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      if (enable) {
        widget.data.items[index].action = {
          caption: 'Action',
          type: 'default',
          action: 'url',
          justify: 'start',
          url: '',
          newWindow: false
        }
      } else {
        widget.data.items[index].action = undefined
      }
      emit('update:modelValue', widget)
    }

    const actionTypeOptions = CONTENT_ACTION_TYPES

    const actionOptions = CONTENT_ACTIONS

    const updateActionCaption = (index: number,  caption: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      widget.data.items[index].action.caption = caption
      emit('update:modelValue', widget)
    }

    const updateActionType = (index: number,  type: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      widget.data.items[index].action.type = type
      emit('update:modelValue', widget)
    }

    const updateActionJustify = (index: number,  justify: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      widget.data.items[index].action.justify = justify
      emit('update:modelValue', widget)
    }

    const updateActionAction = (index: number,  action: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      widget.data.items[index].action.action = action
      emit('update:modelValue', widget)
    }

    const updateActionUrl = (index: number,  url: string) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      widget.data.items[index].action.url = url
      emit('update:modelValue', widget)
    }

    const updateActionNewWindow = (index: number,  newWindow: boolean) => {
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      // @ts-ignore
      widget.data.items[index].action.newWindow = newWindow
      emit('update:modelValue', widget)
    }

    const updateLayout = (layout: WidgetLayout) => {
      // Replace any with your type
      const widget: Widget<ContentData> = {
        ...modelValue.value,
      }
      widget.data.layout = layout
      emit('update:modelValue', widget)
    }


    return {
      tab,
      updateAnchor,
      wrapOptions,
      updateContainerWrap,
      justifyOptions,
      updateContainerJustify,
      alignOptions,
      updateContainerAlign,

      addColumn,
      deleteColumn,
      swapColumns,

      updateItemMaxWidth,
      enableItemMedia,
      updateItemMedia,
      enableItemHeader,
      enableItemSubheader,
      enableItemText,
      styleOptions,
      weightOptions,
      textJustifyOptions,
      updateItemElementStyle,
      updateItemElementWeight,
      updateItemElementJustify,
      updateItemElementText,

      actionTypeOptions,
      actionOptions,
      enableItemAction,
      updateActionCaption,
      updateActionType,
      updateActionJustify,
      updateActionAction,
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
