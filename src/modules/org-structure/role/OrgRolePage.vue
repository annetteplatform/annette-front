<template>
  <entity-page narrow
               caption="Org. Role"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Roles"
             :to="{name: 'orgStructure.roles'}"/>
      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="View"
             :to="{ name: 'orgStructure.role', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Edit"
             :to="{ name: 'orgStructure.role', params: { action: 'edit', id } }"/>
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
                 :readonly="action !== 'create'"
                 ref="idRef"
                 label="Role Id"/>
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
          class="col-md-12 col-sm-12 col-xs-12 "
          v-model="entityModel.description"
          type="textarea"
          label="Description"/>
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

import {useEntityPage} from 'src/shared';
import {OrgRole} from 'src/modules/org-structure';
import EntityPage from 'src/shared/components/EntityPage.vue';

function emptyEntity() {
  return {
    id: '',
    name: '',
    description: ''
  }
}
const NAMESPACE = 'orgRole'

export default defineComponent({
  name: 'OrgRolePage',
  components: {EntityPage},
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

    const entityPage = useEntityPage<OrgRole>({
      namespace: NAMESPACE,
      emptyEntity,
      formHasError,
      props
    })

    return {
      idRef,
      nameRef,
      ...entityPage
    };
  }
});
</script>
