<template>
  <q-badge class="cursor-pointer" outline color="primary" :label="pageName"
           @click="openPage"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'src/store';


export default defineComponent({
  name: 'PageTitleView',
  components: {},
  props: {
    pageId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()

    const pageId = toRef(props, 'pageId')
    const pageName = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      return store.getters['cmsPageView/entities'][pageId.value] ? store.getters['cmsPageView/entities'][pageId.value].title : pageId.value
    })

    const openPage = () => {
      void router.push({name: 'cms.page', params: {id: pageId.value,  action: 'view'}})
    }

    const load = () => {
      void store.dispatch('cmsPageView/loadEntitiesIfNotExist', [pageId.value])
    }

    load()
    watch(pageId, load)

    return {
      pageName,
      openPage,
    };
  }
});
</script>
