<template>
  <q-list>
    <post-view-card v-for="post in items" :key="post.id" :post="post" annotation-mode/>
  </q-list>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent} from 'vue';
import {PostView} from 'src/modules/cms';
import {useStore} from 'src/store';
import PostViewCard from 'src/modules/cms/ui/post-view/components/PostViewCard.vue';

export default defineComponent({
  name: 'PostViewList',
  components: {PostViewCard},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const items: ComputedRef<PostView[]> =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      computed(() => store.getters['cmsPostView/items'](props.instanceKey))

    return {
      items
    };
  }
});
</script>
