<template>
  <entity-list-page narrow
                    :caption="$t('annette.cms.blog.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form
        :filter="instance.filter"
        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <blog-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
         <default-list-toolbar create create-route-name="cms.blog"/>
        </template>
      </blog-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import BlogList from './components/BlogList.vue';
import {defineComponent} from 'vue';
import DefaultListToolbar from 'src/shared/components/crud/DefaultListToolbar.vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {BlogFilter, useBlogStore} from 'src/modules/cms';

export default defineComponent({
  name: 'BlogListPage',
  components: {
    DefaultListPageToolbar,
    DefaultListToolbar, BlogList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'blogs'
    const store = useBlogStore()
    const entityListPage = useEntityListPage<BlogFilter>({
      store,
      instanceKey
    })
    return {
      ...entityListPage
    };
  }
});
</script>
