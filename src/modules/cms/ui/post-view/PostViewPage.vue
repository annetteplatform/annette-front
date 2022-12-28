<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <post-view-card v-if="post" :post="post"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import PostViewCard from './components/PostViewCard.vue';
import {usePostViewStore} from 'src/modules/cms';

export default defineComponent({
  name: 'PostViewPage',
  components: {PostViewCard},
  props: {
    id: String,
  },
  setup(props) {

    const store = usePostViewStore()

    const id = toRef(props, 'id') as Ref<string>

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const post = computed(() => store.entities[id.value])
    const loadPostView = async () => {
      await store.getPostView(id.value)
      await store.viewPost(id.value)
    }

    void loadPostView()
    watch(id, loadPostView)

    return {
      post
    };
  }
});
</script>
