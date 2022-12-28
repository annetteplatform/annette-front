<template>
  <q-badge class="cursor-pointer" outline color="primary" :label="pageName"
           @click="openPage"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef, watch} from 'vue';
import {useRouter} from 'vue-router';
import {usePageViewStore} from 'src/modules/cms';

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
    const store = usePageViewStore()

    const pageId = toRef(props, 'pageId')
    const pageName = computed(() => {
      return store.entities[pageId.value] ? store.entities[pageId.value].title : pageId.value
    })

    const openPage = () => {
      void router.push({name: 'cms.page', params: {id: pageId.value,  action: 'view'}})
    }

    const load = () => {
      void store.loadEntitiesIfNotExist([pageId.value])
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
