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
        {{ props.row.id }}
      </q-td>
      <q-td>
        {{ props.row.name }}
      </q-td>
      <q-td>
        <q-badge outline color="primary" :label="props.row.categoryId" />
      </q-td>
      <q-td auto-width>
        <default-row-toolbar :id="props.row.id"
                             route-name="principalGroup.group"
                             view copy edit del @delete="deleteEntity"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent, ref, useSlots} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import DefaultRowToolbar from 'src/shared/components/crud/DefaultRowToolbar.vue';
import {useDeleteEntity} from 'src/shared/composables/delete-entity';
import {usePrincipalGroupStore} from 'src/modules/principal-group/data/principal-group.store';
import {PrincipalGroup, PrincipalGroupFilter} from 'src/modules/principal-group';


export default defineComponent({
  name: 'PrincipalGroupList',
  components: {DefaultRowToolbar, EntityList},
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
        name: 'id',
        required: true,
        label: i18n.t('annette.principalGroup.group.field.id'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: i18n.t('annette.principalGroup.group.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'categoryId',
        required: true,
        label: i18n.t('annette.principalGroup.group.field.categoryId'),
        align: 'left',
        field: 'categoryId',
        sortable: true,
      }
    ]

    const store = usePrincipalGroupStore()

    const entityList = useEntityList<PrincipalGroup, PrincipalGroupFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.principalGroup.group.deleteQuestion'),
    )

    return {
      columns,
      ...entityList,
      deleteEntity: deleteEntity.deleteEntity
    };
  }
});
</script>
