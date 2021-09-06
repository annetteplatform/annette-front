<template>
  <entity-page narrow
               caption="Authorization Role"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Roles"
             :to="{name: 'authorization.roles'}"/>

      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="View"
             :to="{ name: 'authorization.role', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Edit"
             :to="{ name: 'authorization.role', params: { action: 'edit', id } }"/>

      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="Assignments"
             :to="{ name: 'authorization.roleAssignments', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Assignments"
             :to="{ name: 'authorization.roleAssignments', params: { action: 'edit', id } }"/>

      <q-btn color="primary"
             v-if="entityModel"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
      <q-chip outline square color="red" text-color="white" label="Changed"
              v-if="changed()"/>
      <q-chip outline square color="green" text-color="white" label="Saved"
              v-if="saved && ! changed()"/>
    </template>
    <template v-slot:default>
      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.id"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="AuthRole Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 label="Name"/>
      </div>

      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12"
          v-model="entityModel.description"
          label="Description"
          type="textarea"
          :readonly="action === 'view'"
        />
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
            <h6 class="q-ma-none">Permissions</h6>
            <q-space/>
            <q-btn color="primary" v-if="action !== 'view'" label="Add permission" @click="addPermission"/>
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
import {defineComponent, ref} from 'vue';

import {useEntityPage} from 'src/shared';
import EntityPage from 'src/shared/components/EntityPage.vue';
import {AuthRole, Permission} from 'src/modules/authorization';
import PermissionDialog from 'src/modules/authorization/role/components/PermissionDialog.vue';
import {useQuasar} from 'quasar';

const NAMESPACE = 'authRole'

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

function emptyEntity() {
  return {
    id: '',
    name: '',
    description: '',
    permissions: []
  }
}

export default defineComponent({
  name: 'AuthRolePage',
  components: {PermissionDialog, EntityPage},
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const quasar = useQuasar()

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

    const entityPage = useEntityPage<AuthRole>({
      namespace: NAMESPACE,
      emptyEntity,
      formHasError,
      props
    })

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
        message: 'Please confirm delete permission',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
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
    };
  }
});
</script>
