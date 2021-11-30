<template>
  <PageViewCard v-if="page" :page="page"/>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'src/store';
import PageViewCard from 'src/modules/cms/ui/page-view/components/PageViewCard.vue';

export default defineComponent({
  name: 'MainPage',
  components: {PageViewCard},
  setup() {
    const store = useStore()
    const login = () => store.dispatch('main/Login')

    const id = '0b805606-c3e4-44e8-b185-2eed5102a4f5'

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const page = computed(() => store.getters['cmsPageView/entities'][id])
    const loadPageView = async () => {
      await store.dispatch('cmsPageView/getPageView', id)
      await store.dispatch('cmsPageView/viewPage', id)
    }

    void loadPageView()

    return {
      login,
      page
    };
  }
});
</script>
