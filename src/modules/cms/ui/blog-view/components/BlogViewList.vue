<template>
  <entity-list
    v-if="instance && items"
    :items="items"
    :columns="columns"
    :pagination="pagination"
    :loading="instance.loading"
    @request="onRequest">
    <template v-slot:toolbar>
      <slot name="toolbar"></slot>
    </template>
    <template v-slot:row="props">
      <q-td>
        {{ props.row.name }}
      </q-td>
      <q-td>
        <q-badge outline color="primary" :label="props.row.categoryId" />
      </q-td>
      <q-td>
        <subscription-field :blog-id="props.row.id" :subscriptions="props.row.subscriptions"/>
      </q-td>
      <q-td auto-width>
        <q-btn flat round color="blue" size="sm" icon="login"
               :to="{name: 'cms.postViews', query: { blogs: props.row.id } }"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import {BlogView, BlogViewFilter, useBlogViewStore} from 'src/modules/cms';
import SubscriptionField from 'src/modules/cms/ui/blog-view/components/SubscriptionField.vue';


export default defineComponent({
  name: 'BlogViewList',
  components: {SubscriptionField, EntityList},
  props: {
    instanceKey: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const i18n = useI18n()

    const columns = [
      {
        name: 'name',
        required: true,
        label: i18n.t('annette.cms.blog.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'categoryId',
        required: true,
        label: i18n.t('annette.cms.blog.field.categoryId'),
        align: 'left',
        field: 'categoryId',
        sortable: true,
      },
      {
        name: 'subscription',
        align: 'left',
        label: i18n.t('annette.cms.blogView.field.subscribed'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        field: (row: any) => row.subscriptions.length > 0,
        sortable: true
      }
    ]

    const store = useBlogViewStore()

    const entityList = useEntityList<BlogView, BlogViewFilter>(
      store,
      props.instanceKey,
    )

    return {
      columns,
      ...entityList,
    };
  }
});
</script>
