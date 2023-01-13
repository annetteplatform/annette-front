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
      <q-td key="orgItem">
        <q-badge class="q-mr-sm" v-if="props.row.forOrganization" outline color="primary"
                 :label="$t('annette.orgStructure.category.organization')" />
        <q-badge class="q-mr-sm" v-if="props.row.forUnit" outline color="secondary"
                 :label="$t('annette.orgStructure.category.unit')" />
        <q-badge v-if="props.row.forPosition" outline color="accent"
                 :label="$t('annette.orgStructure.category.position')" />
      </q-td>
      <q-td auto-width>
        <default-row-toolbar :id="props.row.id"
                             route-name="orgStructure.category"
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
import {OrgCategory, OrgCategoryFilter, useOrgCategoryStore} from 'src/modules/org-structure';


export default defineComponent({
  name: 'OrgCategoryList',
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
        label: i18n.t('annette.orgStructure.category.field.id'),
        align: 'left',
        field: 'id',
        sortable: true,
      },
      {
        name: 'name',
        required: true,
        label: i18n.t('annette.orgStructure.category.field.name'),
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'orgItem',
        align: 'left',
        label: 'Org. Items',
        field: 'name',
        classes: 'text-truncate'
      },
    ]

    const store = useOrgCategoryStore()

    const entityList = useEntityList<OrgCategory, OrgCategoryFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.orgStructure.category.deleteQuestion'),
    )

    return {
      columns,
      ...entityList,
      deleteEntity: deleteEntity.deleteEntity
    };
  }
});
</script>
