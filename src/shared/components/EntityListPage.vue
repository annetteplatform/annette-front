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
import {computed, defineComponent, toRefs} from 'vue';
import {useStore} from 'src/store';
import MessageBox from './MessageBox.vue';


export default defineComponent({
  name: 'EntityListPage',
  components: {MessageBox},
  props: {
    caption: {
      type: String,
      required: true
    },
    namespace: {
      type: String,
      required: true
    },
    instanceKey: {
      type: String,
      required: true
    },
    narrow: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {

    const store = useStore()
    const {namespace,  instanceKey} = toRefs(props)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    const message = computed(() => store.getters[`${namespace.value}/instance`](instanceKey.value).message)

    const closeMessage = () => {
      void store.commit(`${namespace.value}/clearMessage`, {key: instanceKey.value})
    }

    return {
      message,
      closeMessage
    };
  }
});
</script>
