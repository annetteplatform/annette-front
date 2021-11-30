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

          <!--    Insert your code here  -->

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
import {ContentData, WidgetLayout} from 'src/shared/components/content';
import LayoutEditForm from 'src/shared/components/content/widgets/components/LayoutEditForm.vue';

export default defineComponent({
  name: 'ContentWidgetEditor',
  components: {LayoutEditForm},
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
      // Replace any with your type
      const widget: Widget<ContentData> = {...modelValue.value}
      widget.data.anchor = anchor
      emit('update:modelValue', widget)
    }

     // Insert your code here

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
