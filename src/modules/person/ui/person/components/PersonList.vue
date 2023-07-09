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
        {{ props.row.lastname }}
      </q-td>
      <q-td>
        {{ props.row.firstname }}
      </q-td>
      <q-td>
        {{ props.row.middlename }}
      </q-td>
      <q-td>
        {{ props.row.email }}
      </q-td>
      <q-td>
        {{ props.row.phone }}
      </q-td>
      <q-td auto-width>
        <default-row-toolbar :id="props.row.id"
                             route-name="person.person"
                             view copy edit del @delete="deleteEntity"/>
      </q-td>
    </template>
  </entity-list>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import EntityList from 'src/shared/components/crud/EntityList.vue';
import {useEntityList} from 'src/shared/composables';
import {Person, PersonFilter} from 'src/modules/person/data/person.model';
import {usePersonStore} from 'src/modules/person/data/person.store';
import {useI18n} from 'vue-i18n';
import DefaultRowToolbar from 'src/shared/components/crud/DefaultRowToolbar.vue';
import {useDeleteEntity} from 'src/shared/composables/delete-entity';


export default defineComponent({
  name: 'PersonList',
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
        name: 'lastname',
        required: true,
        label: i18n.t('annette.person.person.field.lastname'),
        align: 'left',
        field: 'lastname',
        sortable: true,
      },
      {
        name: 'firstname',
        required: true,
        label: i18n.t('annette.person.person.field.firstname'),
        align: 'left',
        field: 'firstname',
        sortable: true,
      }
      , {
        name: 'middlename',
        required: true,
        label: i18n.t('annette.person.person.field.middlename'),
        align: 'left',
        field: 'middlename',
        sortable: true,
      },
      {
        name: 'email',
        align: 'left',
        label: i18n.t('annette.person.person.field.email'),
        field: 'email'
      },
      {
        name: 'phone',
        align: 'left',
        label: i18n.t('annette.person.person.field.phone'),
        field: 'phone'
      },
    ]

    const store = usePersonStore()

    const entityList = useEntityList<Person, PersonFilter>(
      store,
      props.instanceKey,
    )

    const deleteEntity = useDeleteEntity(
      store,
      i18n.t('annette.person.person.deleteQuestion'),
    )

    return {
      columns,
      ...entityList,
      deleteEntity: deleteEntity.deleteEntity
    };
  }
});
</script>
