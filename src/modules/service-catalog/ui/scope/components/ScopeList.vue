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
                             route-name="serviceCatalog.scope"
                             view copy edit del
                             @delete="deleteEntity"/>
        <q-btn class="q-ml-md" flat round color="green" size="sm" icon="fas fa-user"
               :to="{ name: 'serviceCatalog.scopePrincipals', params: { action: 'view', id: props.row.id } }"/>
        <q-btn flat round color="blue" size="sm" icon="fas fa-user-edit"
               :to="{ name: 'serviceCatalog.scopePrincipals', params: { action: 'edit', id: props.row.id } }"/>
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
import {Scope, ScopeFilter, useScopeStore} from 'src/modules/service-catalog';
import {useDeactivateEntity} from 'src/shared/composables/deactivate-entity';
import {useActivateEntity} from 'src/shared/composables/activate-entity';


export default defineComponent({
  name: 'ScopeList',
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
        label: i18n.t('annette.serviceCatalog.scope.field.id'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: i18n.t('annette.serviceCatalog.scope.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'active',
        required: true,
        label: i18n.t('annette.serviceCatalog.scope.field.active'),
        align: 'left',
        field: 'active',
        sortable: true,
      }
    ]

    const store = useScopeStore()

    const entityList = useEntityList<Scope, ScopeFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.serviceCatalog.scope.deleteQuestion'),
    )
    const activateEntity = useActivateEntity(
      store,
      i18n.t('annette.serviceCatalog.scope.activateQuestion'),
    )
    const deactivateEntity = useDeactivateEntity(
      store,
      i18n.t('annette.serviceCatalog.scope.deactivateQuestion'),
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
