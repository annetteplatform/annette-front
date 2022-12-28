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
      <q-td>
        <q-btn v-if="props.row.active"
               flat round color="green" size="sm" icon="fa-regular fa-circle-check" @click="deactivateEntity(props.row.id)">
          <q-tooltip>
            {{ $t('annette.shared.crud.deactivate') }}
          </q-tooltip>
        </q-btn>
        <q-btn v-else
               flat round color="grey" size="sm" icon="fa-regular fa-circle" @click="activateEntity(props.row.id)">
          <q-tooltip>
            {{ $t('annette.shared.crud.activate') }}
          </q-tooltip>
        </q-btn>
      </q-td>
      <q-td auto-width>
        <default-row-toolbar :id="props.row.id"
                             route-name="cms.space"
                             view copy edit del @delete="deleteEntity"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent, ref, useSlots} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useActivateEntity, useDeactivateEntity, useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import DefaultRowToolbar from 'src/shared/components/crud/DefaultRowToolbar.vue';
import {useDeleteEntity} from 'src/shared/composables/delete-entity';
import {Space, SpaceFilter, useSpaceStore} from 'src/modules/cms';


export default defineComponent({
  name: 'SpaceList',
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
        label: i18n.t('annette.cms.space.field.id'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
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
      },
      {
        name: 'active',
        required: true,
        label: i18n.t('annette.cms.space.field.active'),
        align: 'left',
        field: 'active',
        sortable: true,
      }
    ]

    const store = useSpaceStore()

    const entityList = useEntityList<Space, SpaceFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.cms.space.deleteQuestion'),
    )
    const activateEntity = useActivateEntity(
      store,
      i18n.t('annette.cms.space.activateQuestion'),
    )
    const deactivateEntity = useDeactivateEntity(
      store,
      i18n.t('annette.cms.space.deactivateQuestion'),
    )

    return {
      columns,
      ...entityList,
      deleteEntity: deleteEntity.deleteEntity,
      deactivateEntity: deactivateEntity.deactivateEntity,
      activateEntity: activateEntity.activateEntity,
    };
  }
});
</script>
