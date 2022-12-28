<template>
  <page-view-card v-if="page" :page="page"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import PageViewCard from './components/PageViewCard.vue';
import {usePageViewStore} from 'src/modules/cms';

export default defineComponent({
  name: 'PageViewPage',
  components: {PageViewCard},
  props: {
    id: String,
  },
  setup(props) {

    const store = usePageViewStore()

    const id = toRef(props, 'id') as Ref<string>

    const page = computed(() => store.entities[id.value])
    const loadPageView = async () => {
      await store.getPageView(id.value)
      await store.viewPage(id.value)
    }

    void loadPageView()
    watch(id, loadPageView)

    return {
      page
    };
  }
});
</script>
