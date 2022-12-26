<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.blog.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:filter>
      <simple-filter-form
        :filter="instance.filter"
        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <blog-view-list
        :instance-key="instanceKey">
      </blog-view-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import BlogViewList from './components/BlogViewList.vue';
import {defineComponent} from 'vue';
import {BlogViewFilter, useBlogViewStore} from 'src/modules/cms';

export default defineComponent({
  name: 'BlogViewListPage',
  components: {
   BlogViewList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'blogViews'
    const store = useBlogViewStore()
    const entityListPage = useEntityListPage<BlogViewFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>
