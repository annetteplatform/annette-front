<template>
  <q-btn v-if="subscribed" flat round :color="color" icon="check_circle_outline" @click="unsubscribe"/>
  <q-btn v-else flat round :color="color" icon="radio_button_unchecked" @click="subscribe"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import {useBlogViewStore} from 'src/modules/cms';

export default defineComponent({
  name: 'SubscriptionField',
  components: {},
  props: {
    blogId: {
      type: String,
      required: true
    },
    subscriptions: {
      type: Array,

    }
  },
  setup(props) {

    const store = useBlogViewStore()

    const blogId = toRef(props, 'blogId')
    const subscriptions = toRef(props, 'subscriptions')

    // @ts-ignore
    const subscribed = computed ( () => subscriptions.value.length > 0 )
    // @ts-ignore
    const hasPersonPrincipal = computed( () => !!subscriptions.value.find(p => p.principalType === 'person') )
    const color = computed( () => hasPersonPrincipal.value ? 'green' : 'grey' )

    const subscribe = () => {
      void store.subscribeToBlog(blogId.value)
    }

    const unsubscribe = () => {
      if (hasPersonPrincipal.value) {
        void store.unsubscribeFromBlog(blogId.value)
      }
    }

    return {
      subscribed,
      hasPersonPrincipal,
      color,
      subscribe,
      unsubscribe
    }
  }
});
</script>
