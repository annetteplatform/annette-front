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
        <q-td auto-width>
          <q-btn flat round color="green" size="sm" icon="far fa-eye"
                 :to="{ name: 'application.application', params: { action: 'view', id: props.row.id } }">
            <q-tooltip>
              {{ $t("annette.shared.crud.view") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat round color="blue" size="sm" icon="far fa-edit"
                 :to="{ name: 'application.application', params: { action: 'edit', id: props.row.id } }">
            <q-tooltip>
              {{ $t("annette.shared.crud.edit") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat round color="blue" size="sm" icon="far fa-copy"
                 :to="{ name: 'application.application', params: { action: 'create', id: props.row.id } }">
            <q-tooltip>
              {{ $t("annette.shared.crud.copy") }}
            </q-tooltip>
          </q-btn>
          <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(props.row.id)">
            <q-tooltip>
              {{ $t("annette.shared.crud.del") }}
            </q-tooltip>
          </q-btn>
        </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {Application, ApplicationFilter} from 'src/modules/application/data/application.model';
import {useApplicationStore} from 'src/modules/application/data/application.store';
import {useI18n} from 'vue-i18n';



export default defineComponent({
  name: 'ApplicationList',
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
        name: 'id',
        required: true,
        label: i18n.t('annette.application.application.field.id'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: i18n.t('annette.application.application.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      }
    ]

    const store = useApplicationStore()

    const entityList = useEntityList<Application, ApplicationFilter>(
      store,
      props.instanceKey,
      i18n.t('annette.application.application.deleteQuestion'),
    )

    return {
      columns,
      ...entityList,
    };
  }
});
</script>
