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
        <q-badge outline color="primary" :label="props.row.notation.toUpperCase()" />
      </q-td>
      <q-td>
        {{props.row.code }}
      </q-td>
      <q-td auto-width>
        <default-row-toolbar :id="props.row.id"
                             route-name="bpm.bpmModel"
                             view copy edit del @delete="deleteEntity"/>
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
import {BpmModel, BpmModelFilter, useBpmModelStore} from 'src/modules/bpm';


export default defineComponent({
  name: 'BpmModelList',
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
        label: i18n.t('annette.bpm.bpmModel.field.id'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: i18n.t('annette.bpm.bpmModel.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
        classes: 'text-truncate'
      },
      {
        name: 'notation',
        required: true,
        label: i18n.t('annette.bpm.bpmModel.field.notation'),
        align: 'left',
        field: 'notation',
        sortable: true,
        classes: 'text-truncate'
      },
      {
        name: 'code',
        required: true,
        label: i18n.t('annette.bpm.bpmModel.field.code'),
        align: 'left',
        field: 'code',
        sortable: true,
        classes: 'text-truncate'
      },
    ]

    const store = useBpmModelStore()

    const entityList = useEntityList<BpmModel, BpmModelFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.bpm.bpmModel.deleteQuestion'),
    )

    return {
      columns,
      ...entityList,
      deleteEntity: deleteEntity.deleteEntity
    };
  }
});
</script>
