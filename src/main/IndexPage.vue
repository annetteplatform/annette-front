<template>
  <PageViewCard v-if="page" :page="page"/>
  <div class="narrow-layout" v-if="!page && !loading">
    <h5 class="text-center" v-if="isAuthenticated && profile">
      Welcome, {{ profile.firstname }} {{ profile.lastname }}
    </h5>
    <h5 class="text-center" v-if="isAuthenticated && !profile">Welcome</h5>
    <NotAuthenticated v-if="!isAuthenticated"/>
  </div>

</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import NotAuthenticated from './components/NotAuthenticated.vue'
import {useStore} from 'src/store';
import {cmsHomePageService} from 'src/modules/cms/service/cms-home-page.service';
import {APPLICATION_ID, PersonProfile} from 'src/main/store';
import {PageView} from 'src/modules/cms';
import PageViewCard from 'src/modules/cms/ui/page-view/components/PageViewCard.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    PageViewCard,
    NotAuthenticated
  },
  setup() {
    // const quasar = useQuasar()
    const store = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const profile:  ComputedRef<PersonProfile> = computed(() => store.getters['main/profile'])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const isAuthenticated = computed(() => store.getters['main/isAuthenticated'])

    const page: Ref<PageView | null> = ref(null)
    const loading = ref(true)


    const loadPageView = async () => {
      try {
        page.value = await cmsHomePageService.getMyHomePage(APPLICATION_ID)
        loading.value = false
        await store.dispatch('cmsPageView/viewPage', page.value.id)
      } catch (ex) {
        page.value = null
        loading.value = false
        console.log(ex)
      }
    }

    void loadPageView()
    watch(isAuthenticated, loadPageView)

    return {
      profile,
      isAuthenticated,
      page,
      loading
    };
  }
});
</script>
