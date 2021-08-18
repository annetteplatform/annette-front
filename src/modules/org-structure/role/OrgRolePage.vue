<template>
  <q-form
    @submit="save"
    class="narrow-layout">
    <div class="row">
      <div class="col-md-12 q-pa-md q-gutter-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">Role</h5>
          <q-space/>
          <q-btn class="q-mr-md" outline color="primary"
                 label="Roles"
                 :to="{name: 'orgStructure.roles'}"/>
          <q-btn color="primary"
                 v-if="entityModel"
                 label="Save"
                 @click="save"/>
        </q-item>

      </div>
    </div>

    <div class="row q-pb-md" v-if="error">
      <message-box :message="error" @closeMessage="clearError"/>
    </div>

    <div v-if="entityModel">

      <div class="row q-pb-md">
        <q-chip outline square color="red" text-color="white" label="Changed"
                v-if="changed()"/>
        <q-chip outline square color="green" text-color="white" label="Saved"
                v-if="saved && ! changed()"/>
      </div>

      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.id"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="Role Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || 'Field is required']"
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
    </div>
  </q-form>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

import MessageBox from 'src/common/components/MessageBox.vue';
import {useEntityPage} from 'src/common';
import {OrgRole} from 'src/modules/org-structure';

export default defineComponent({
  name: 'OrgRolePage',
  components: {MessageBox},
  setup() {
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

    const entityPage = useEntityPage<OrgRole>(
      'orgRole',
      () => {
        return {
          id: '',
          name: '',
          description: ''
        }
      },
      formHasError,
    )

    return {
      idRef,
      nameRef,
      ...entityPage
    };
  }
});
</script>
