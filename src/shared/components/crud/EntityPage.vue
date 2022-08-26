<template>
  <div :class="{ 'narrow-layout': narrow }">
    <div class="row">
      <div class="col-md-12 q-pa-md q-gutter-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">{{ caption }}</h5>
          <q-space/>
          <slot name="toolbar"></slot>
        </q-item>
      </div>
    </div>

    <div class="row q-pb-md" v-if="error">
      <message-box :message="error" @closeMessage="clearError"/>
    </div>

    <div v-if="showForm">
      <div class="row q-pb-md">
        <slot name="status"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';

import MessageBox from './MessageBox.vue';
import {AnnetteError} from 'src/shared/model';

export default defineComponent({
  name: 'EntityPage',
  components: {MessageBox},
  props: {
    caption: {
      type: String,
      required: true
    },
    error: {
      type: Object as PropType<AnnetteError>,
      required: false
    },
    showForm: {
      type: Boolean,
      required: true
    },
    narrow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['clearError'],
  setup(props, {emit}) {

    const clearError = () => { emit('clearError') }

    return {
      clearError
    };
  }
});
</script>
