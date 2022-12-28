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
        <default-row-toolbar :id="props.row.id"
                             route-name="application.application"
                             view copy edit del @delete="deleteEntity"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent, ref, useSlots} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {Application, ApplicationFilter} from 'src/modules/application/data/application.model';
import {useApplicationStore} from 'src/modules/application/data/application.store';
import {useI18n} from 'vue-i18n';
import DefaultRowToolbar from 'src/shared/components/crud/DefaultRowToolbar.vue';
import {useDeleteEntity} from 'src/shared/composables/delete-entity';


export default defineComponent({
  name: 'ApplicationList',
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
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.application.application.deleteQuestion'),
    )

    return {
      columns,
      ...entityList,
      deleteEntity: deleteEntity.deleteEntity
    };
  }
});
</script>
