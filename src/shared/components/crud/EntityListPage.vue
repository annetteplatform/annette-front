<template>
  <div :class="narrow ? 'narrow-layout': 'q-ma-md'">
    <q-toolbar>
      <h5 class="q-mt-md q-mb-md">{{ $t(caption) }}</h5>
      <q-space/>
      <slot name="toolbar"></slot>
    </q-toolbar>
    <div class="q-mb-sm">
      <q-list bordered class="rounded-borders full-width" >
        <q-expansion-item
          bordered
          icon="filter_alt"
          :label="$t('annette.shared.crud.filter')"
          v-model="expanded"
        >
          <slot name="filter"></slot>
        </q-expansion-item>
      </q-list>
    </div>
    <message-box class="q-mb-sm"
                 v-if="message"
                 :message="message"
                 @closeMessage="closeMessage"/>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {PropType, ref} from 'vue';
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
    const expanded = ref(true)

    const closeMessage = () => {
      void emit('closeMessage')
    }

    return {
      closeMessage,
      expanded
    }
  }
})

</script>
