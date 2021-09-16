<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <post-view-card v-if="post" :post="post"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {useStore} from 'src/store';
import {Ref} from '@vue/reactivity';
import PostViewCard from 'src/modules/cms/ui/post-view/components/PostViewCard.vue';

export default defineComponent({
  name: 'PostViewPage',
  components: {PostViewCard},
  props: {
    id: String,
  },
  setup(props) {

    const store = useStore()

    const id = toRef(props, 'id') as Ref<string>

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const post = computed(() => store.getters['cmsPostView/entities'][id.value])
    const loadPostView = async () => {
      await store.dispatch('cmsPostView/getPostView', id.value)
      await store.dispatch('cmsPostView/viewPost', id.value)
    }

    void loadPostView()
    watch(id, loadPostView)

    return {
      post
    };
  }
});
</script>
