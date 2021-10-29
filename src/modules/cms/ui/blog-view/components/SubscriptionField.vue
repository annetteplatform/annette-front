<template>
  <q-btn v-if="subscribed" flat round :color="color" icon="check_circle_outline" @click="unsubscribe"/>
  <q-btn v-else flat round :color="color" icon="radio_button_unchecked" @click="subscribe"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import {AnnettePrincipal} from 'src/shared';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';

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

    const store = useStore()

    const blogId = toRef(props, 'blogId') as Ref<string>
    const subscriptions = toRef(props, 'subscriptions') as Ref<AnnettePrincipal[]>

    const subscribed = computed ( () => subscriptions.value.length > 0 )
    const hasPersonPrincipal = computed( () => !!subscriptions.value.find(p => p.principalType === 'person') )
    const color = computed( () => hasPersonPrincipal.value ? 'primary' : 'grey' )

    const subscribe = () => {
      void store.dispatch('cmsBlogView/subscribeToBlog', blogId.value)
    }

    const unsubscribe = () => {
      if (hasPersonPrincipal.value) {
        void store.dispatch('cmsBlogView/unsubscribeFromBlog', blogId.value)
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
