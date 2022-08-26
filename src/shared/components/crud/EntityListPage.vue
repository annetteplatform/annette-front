<template>
  <div :class="narrow ? 'narrow-layout': 'q-ma-md'">
    <div class="row">
      <div class="col-md-12 q-pa-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">{{ caption }}</h5>
          <q-space/>
          <slot name="toolbar"></slot>
        </q-item>
      </div>
    </div>
    <slot name="filter"></slot>
    <message-box class="q-mb-md"
                 v-if="message"
                 :message="message"
                 @closeMessage="closeMessage"/>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {PropType} from 'vue';
import MessageBox from './MessageBox.vue';
import {AnnetteError} from 'src/shared/model';

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'EntityListPage',
  components: {MessageBox},
  props: {
    caption: {
      type: String,
      required: true
    },
    message: {
      type: Object as PropType<AnnetteError | null>,
      required: false
    },
    narrow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeMessage'],
  setup(props, {emit}) {

    const closeMessage = () => {
      void emit('closeMessage')
    }

    return {
      closeMessage
    }
  }
})

</script>
