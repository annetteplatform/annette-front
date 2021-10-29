<template>
  <entity-list-page narrow caption="Blogs" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             :to="{name: 'cms.blog', params: {action: 'create', id: 'new'}}"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <blog-list class="q-mb-md"
                   :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useEntityListPage} from 'src/shared';
import BlogList from './components/BlogList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {BlogFilter} from 'src/modules/cms';

const NAMESPACE = 'cmsBlog';
const INSTANCE_KEY = 'blogs'

export default defineComponent({
  name: 'BlogListPage',
  components: {EntityListPage, BlogList, SimpleFilterForm},
  setup() {

    const entityListPage = useEntityListPage<BlogFilter>({
      namespace: NAMESPACE,
      instanceKey: INSTANCE_KEY,
    })

    return {
      ...entityListPage
    };
  }
});
</script>
