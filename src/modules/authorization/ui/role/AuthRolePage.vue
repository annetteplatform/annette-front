<template>
  <entity-page narrow
               :caption="$t('annette.authorization.authRole.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="authorization.role"
                                   :back-label="$t('annette.authorization.authRole.titlePl')"
                                   back-route-name="authorization.roles"/>
      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="Assignments"
             :to="{ name: 'authorization.roleAssignments', params: { action: 'edit', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Assignments"
             :to="{ name: 'authorization.roleAssignments', params: { action: 'view', id } }"/>

    </template>
    <template v-slot:status>
      <q-chip outline square color="red" text-color="white"
              :label="$t('annette.shared.crud.changed')"
              v-if="changed()"/>
      <q-chip outline square color="green" text-color="white"
              :label="$t('annette.shared.crud.saved')"
              v-if="saved && ! changed()"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'authorization.role', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
    </template>
    <template v-slot:default>
      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.id"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action!=='create'"
                 ref="idRef"
                 :label="$t('annette.authorization.authRole.field.id')"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 :label="$t('annette.authorization.authRole.field.name')"/>
      </div>
      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 "
          v-model="entityModel.description"
          type="textarea"
          :label="$t('annette.authorization.authRole.field.description')"/>
      </div>

      <div class="row">
        <q-table
          class="col-md-12 col-sm-12 col-xs-12 q-mt-lg q-mb-md"
          flat bordered
          :rows="entityModel.permissions"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top>
            <h6 class="q-ma-none"> {{ $t('annette.authorization.authRole.permissions') }}</h6>
            <q-space/>
            <q-btn color="primary" v-if="action !== 'view'"
                   :label="$t('annette.authorization.authRole.addPermission')"
                   @click="addPermission"/>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props">
                {{ col.label }}
              </q-th>
              <q-th auto-width v-if="action !== 'view'"></q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                {{ props.row.id }}
              </q-td>
              <q-td>
                {{ props.row.arg1 }}
              </q-td>
              <q-td>
                {{ props.row.arg2 }}
              </q-td>
              <q-td>
                {{ props.row.arg3 }}
              </q-td>
              <q-td auto-width v-if="action !== 'view'">
                <q-btn flat round color="blue" size="sm" icon="far fa-edit" @click="editPermission(props.row)"/>
                <q-btn flat round color="red" size="sm" icon="fas fa-trash" @click="deletePermission(props.row)"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <permission-dialog ref="permissionDialog"/>
      </div>

    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {defineComponent, ref} from 'vue';

import {AuthRole, Permission, useAuthRoleStore} from 'src/modules/authorization';
import {useEntityPage} from 'src/shared/composables';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {useQuasar} from 'quasar';
import PermissionDialog from './components/PermissionDialog.vue';
import {useI18n} from 'vue-i18n';

function emptyEntity() {
  return {
    id: '',
    name: '',
    description: '',
    permissions: []
  }
}


const COLUMNS = [
  {
    name: 'id',
    align: 'left',
    label: 'Permission Id',
    field: 'id',
    sortable: true,
  },
  {
    name: 'arg1',
    align: 'left',
    label: 'Arg 1',
    field: 'arg1',
    sortable: true,
  },
  {
    name: 'arg2',
    align: 'left',
    label: 'Arg 2',
    field: 'arg2',
    sortable: true,
  },
  {
    name: 'arg3',
    align: 'left',
    label: 'Arg 3',
    field: 'arg3',
    sortable: true,
  }
]

export default defineComponent({
  name: 'AuthRolePage',
  components: {PermissionDialog, DefaultEntityPageToolbar, EntityPage},
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const idRef = ref()
    const nameRef = ref()

    const formHasError = (): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const store = useAuthRoleStore()
    const quasar = useQuasar()
    const i18n = useI18n()

    const entityPage = useEntityPage<AuthRole>({
        store,
        emptyEntity,
        formHasError,
        props
      }
    )

    const columns = ref(COLUMNS)

    const permissionDialog = ref()

    const addPermission = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const newPermission = await permissionDialog.value.showDialog({
        id: '',
        arg1: '',
        arg2: '',
        arg3: '',
      })
      // @ts-ignore
      entityPage.entityModel.value.permissions = [...entityPage.entityModel.value.permissions, newPermission]
    }

    const editPermission = async (perm: Permission) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const changedPermission = await permissionDialog.value.showDialog(perm)
      // @ts-ignore
      entityPage.entityModel.value.permissions = entityPage.entityModel.value.permissions
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map(p => p === perm ? changedPermission : p)
    }

    const deletePermission = (perm: Permission) => {
      quasar.notify({
        type: 'negative',
        message: i18n.t('annette.authorization.authRole.deletePermissionQuestion'),
        actions: [
          {
            label: i18n.t('annette.shared.crud.cancel'),
            color: 'white'
          },
          {
            label: i18n.t('annette.shared.crud.del'),
            color: 'white',
            handler: () => {
              // @ts-ignore
              entityPage.entityModel.value.permissions = entityPage.entityModel.value.permissions.filter(p => p !== perm)
            }
          }
        ]
      })
    }

    return {
      idRef,
      nameRef,
      ...entityPage,
      columns,
      permissionDialog,
      addPermission,
      editPermission,
      deletePermission
    }
  }
})
</script>
