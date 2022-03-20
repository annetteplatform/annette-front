<template>
  <q-infinite-scroll @load="onLoad" :offset="250">
    <q-list>
      <post-view-card v-for="post in items" :key="post.id" :post="post" annotation-mode/>
    </q-list>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>

</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, toRef} from 'vue';
import {PostView} from 'src/modules/cms';
import {useStore} from 'src/store';
import PostViewCard from 'src/modules/cms/ui/post-view/components/PostViewCard.vue';
import {SetPagePayload} from 'src/shared';

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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const instanceKey = toRef(props, 'instanceKey')

    const items: ComputedRef<PostView[]> =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      computed(() => store.getters['cmsPostView/items'](props.instanceKey))

    const page: ComputedRef<number> =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
      computed(() => store.getters['cmsPostView/instance'](props.instanceKey).page)

    const onLoad = async (index: number, done: () => void) => {
      const payload: SetPagePayload = {
        key: instanceKey.value,
        page: page.value + 1
      }
      await store.dispatch('cmsPostView/setPage', payload)
      done()
    }

    return {
      items,
      onLoad
    };
  }
});
</script>
