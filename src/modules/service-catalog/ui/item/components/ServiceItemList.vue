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
        <q-badge outline color="primary" :label="props.row.type"/>
      </q-td>
      <q-td>
        <q-btn v-if="props.row.active"
               flat round color="green" size="sm" icon="fa-regular fa-circle-check"
               @click="deactivateEntity(props.row.id)">
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
                             route-name="serviceCatalog.serviceItem"
                             view copy edit del
                             @delete="deleteEntity"/>

        <q-btn v-if="props.row.type === 'service'"
          class="q-ml-md" flat round color="green" size="sm" icon="fas fa-user"
               :to="{ name: 'serviceCatalog.servicePrincipals', params: { action: 'view', id: props.row.id } }"/>
        <q-btn  v-if="props.row.type === 'service'"
                flat round color="blue" size="sm" icon="fas fa-user-edit"
               :to="{ name: 'serviceCatalog.servicePrincipals', params: { action: 'edit', id: props.row.id } }"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {useI18n} from 'vue-i18n';
import DefaultRowToolbar from 'src/shared/components/crud/DefaultRowToolbar.vue';
import {useDeleteEntity} from 'src/shared/composables/delete-entity';
import {useDeactivateEntity} from 'src/shared/composables/deactivate-entity';
import {useActivateEntity} from 'src/shared/composables/activate-entity';
import {ServiceItem, ServiceItemFilter, useServiceItemStore} from 'src/modules/service-catalog';


export default defineComponent({
  name: 'ServiceItemList',
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
        label: i18n.t('annette.serviceCatalog.serviceItem.field.id'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: i18n.t('annette.serviceCatalog.serviceItem.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'type',
        required: true,
        label: i18n.t('annette.serviceCatalog.serviceItem.field.type'),
        align: 'left',
        field: 'type',
        sortable: true,
      },
      {
        name: 'active',
        required: true,
        label: i18n.t('annette.serviceCatalog.serviceItem.field.active'),
        align: 'left',
        field: 'active',
        sortable: true,
      }
    ]

    const store = useServiceItemStore()

    const entityList = useEntityList<ServiceItem, ServiceItemFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.serviceCatalog.serviceItem.deleteQuestion'),
    )
    const activateEntity = useActivateEntity(
      store,
      i18n.t('annette.serviceCatalog.serviceItem.activateQuestion'),
    )
    const deactivateEntity = useDeactivateEntity(
      store,
      i18n.t('annette.serviceCatalog.serviceItem.deactivateQuestion'),
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
