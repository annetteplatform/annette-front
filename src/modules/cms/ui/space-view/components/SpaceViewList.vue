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
      <q-td auto-width>
        <q-btn flat round color="blue" size="sm" icon="login"
               :to="{name: 'cms.pageViews', query: { spaces: props.row.id } }"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import {SpaceView, SpaceViewFilter, useSpaceViewStore} from 'src/modules/cms';

export default defineComponent({
  name: 'SpaceViewList',
  components: {EntityList},
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
        label: i18n.t('annette.cms.space.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'categoryId',
        required: true,
        label: i18n.t('annette.cms.space.field.categoryId'),
        align: 'left',
        field: 'categoryId',
        sortable: true,
      }
    ]

    const store = useSpaceViewStore()

    const entityList = useEntityList<SpaceView, SpaceViewFilter>(
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
