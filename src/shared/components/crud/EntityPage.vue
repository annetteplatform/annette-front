<template>
  <div :class="{ 'narrow-layout': narrow, }"
       class="q-px-md">
    <q-toolbar>
      <h5 class="q-mt-md q-mb-md">{{ caption }}</h5>
      <q-space/>
      <slot name="toolbar"></slot>
    </q-toolbar>

    <div class="row q-pb-md" v-if="error">
      <message-box :message="error" @closeMessage="clearError"/>
    </div>

    <div v-if="showForm">
      <slot></slot>
    </div>

    <div v-if="action !== 'view' && !hideStatusBar">
      <div class="q-mb-md" style="height: 64px"></div>
      <q-card bordered flat
              :class="{ 'narrow-layout': narrow }"
              class="fixed-bottom q-mb-md q-px-md">
        <q-card-section horizontal>
          <div class="q-my-sm">
            <slot name="status"></slot>
          </div>
          <q-space/>
          <q-card-actions vertical class="justify-around">
            <slot name="save-toolbar"></slot>
          </q-card-actions>
        </q-card-section>
      </q-card>
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
    action: {
      type: String,
      required: true
    },
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
    hideStatusBar: {
      type: Boolean,
      required: false
    },
    narrow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['clearError'],
  setup(props, {emit}) {

    const clearError = () => {
      emit('clearError')
    }

    return {
      clearError
    };
  }
});
</script>
