<template>
  <page-view-card v-if="page" :page="page"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {useStore} from 'src/store';
import {Ref} from '@vue/reactivity';
import PageViewCard from 'src/modules/cms/ui/page-view/components/PageViewCard.vue';

export default defineComponent({
  name: 'PageViewPage',
  components: {PageViewCard},
  props: {
    id: String,
  },
  setup(props) {

    const store = useStore()

    const id = toRef(props, 'id') as Ref<string>

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const page = computed(() => store.getters['cmsPageView/entities'][id.value])
    const loadPageView = async () => {
      await store.dispatch('cmsPageView/getPageView', id.value)
      await store.dispatch('cmsPageView/viewPage', id.value)
    }

    void loadPageView()
    watch(id, loadPageView)

    return {
      page
    };
  }
});
</script>
