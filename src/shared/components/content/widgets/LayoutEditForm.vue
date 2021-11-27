<template>

  <div class="row full-width q-mt-md">
    Margin
  </div>
  <div class="row full-width">
    <div class="col-md-3 q-pr-sm">
      <q-input
        :model-value="modelValue.margin.left"
        @update:model-value="updateMargin('left', $event)"
        label="Left"/>
    </div>

    <div class="col-md-3 q-pr-sm">
      <q-input
        :model-value="modelValue.margin.right"
        @update:model-value="updateMargin('right', $event)"
        label="Right"/>
    </div>
    <div class="col-md-3 q-pr-sm">
      <q-input
        :model-value="modelValue.margin.top"
        @update:model-value="updateMargin('top', $event)"
        label="Top"/>
    </div>
    <div class="col-md-3 ">
      <q-input
        :model-value="modelValue.margin.bottom"
        @update:model-value="updateMargin('bottom', $event)"
        label="Bottom"/>
    </div>
  </div>


  <div class="row full-width q-mt-md">
    Padding
  </div>
  <div class="row full-width">
    <div class="col-md-3 q-pr-sm">
      <q-input
        :model-value="modelValue.padding.left"
        @update:model-value="updatePadding('left', $event)"
        label="Left"/>
    </div>

    <div class="col-md-3 q-pr-sm">
      <q-input
        :model-value="modelValue.padding.right"
        @update:model-value="updatePadding('right', $event)"
        label="Right"/>
    </div>
    <div class="col-md-3 q-pr-sm">
      <q-input
        :model-value="modelValue.padding.top"
        @update:model-value="updatePadding('top', $event)"
        label="Top"/>
    </div>
    <div class="col-md-3 ">
      <q-input
        :model-value="modelValue.padding.bottom"
        @update:model-value="updatePadding('bottom', $event)"
        label="Bottom"/>
    </div>
  </div>

  <div class="row q-mt-md">
    <q-input class="full-width"
             :model-value="modelValue.backgroundColor"
             @update:model-value="updateBackgroundColor"
             label="Background Color">
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color :model-value="modelValue.backgroundColor"
                     @update:model-value="updateBackgroundColor"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

  <div class="row q-mt-md">
    <q-select class="full-width"
              :model-value="selected"
              @update:model-value="updateJustify"
              :options="options"
              label="Justify"/>
  </div>
  <div class="row  q-mt-md" v-if="modelValue.horizontal">
    <q-input class="full-width"
             :model-value="modelValue.horizontal.maxWidth"
             @update:model-value="updateMaxWidth"
             label="Max width"/>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, toRef} from 'vue';
import {WidgetLayout} from '../widget-model';

export default defineComponent({
  name: 'LayoutEditForm',
  components: {},
  props: {
    modelValue: {
      type: Object as PropType<WidgetLayout>,
      required: true
    },

  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const modelValue = toRef(props, 'modelValue')
    const options = ref(['none', 'center'])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const selected = computed(() => modelValue.value.horizontal ? modelValue.value.horizontal.justify : 'none')

    const updateMargin = (pos: string, value: string) => {
      const widgetLayout: WidgetLayout = {
        ...modelValue.value,
      }
      if (pos === 'top') widgetLayout.margin.top = value
      if (pos === 'right') widgetLayout.margin.right = value
      if (pos === 'bottom') widgetLayout.margin.bottom = value
      if (pos === 'left') widgetLayout.margin.left = value
      emit('update:modelValue', widgetLayout)
    }

    const updatePadding = (pos: string, value: string) => {
      const widgetLayout: WidgetLayout = {
        ...modelValue.value,
      }
      if (pos === 'top') widgetLayout.padding.top = value
      if (pos === 'right') widgetLayout.padding.right = value
      if (pos === 'bottom') widgetLayout.padding.bottom = value
      if (pos === 'left') widgetLayout.padding.left = value
      emit('update:modelValue', widgetLayout)
    }
    const updateBackgroundColor = (value: string) => {
      const widgetLayout: WidgetLayout = {
        ...modelValue.value,
        backgroundColor: value
      }
      emit('update:modelValue', widgetLayout)
    }

    const updateJustify = (value: string) => {
      const widgetLayout: WidgetLayout = {
        ...modelValue.value,
      }
      if (value === 'none') {
        delete widgetLayout.horizontal
      } else if (value === 'center') {
        widgetLayout.horizontal = {
          justify: 'center',
          maxWidth: '900px'
        }
      }
      emit('update:modelValue', widgetLayout)
    }

    const updateMaxWidth = (value: string) => {
      if (modelValue.value.horizontal) {
        const widgetLayout: WidgetLayout = {
          ...modelValue.value,
        }
        // @ts-ignore
        widgetLayout.horizontal.maxWidth = value
        emit('update:modelValue', widgetLayout)
      }
    }

    return {
      options,
      selected,
      updateMargin,
      updatePadding,
      updateBackgroundColor,
      updateJustify,
      updateMaxWidth


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
