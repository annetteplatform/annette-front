<template>
  <entity-page narrow
               caption="Organization"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Organizations"
             :to="{name: 'orgStructure.organizations'}"/>
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
                 label="Role Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || 'Field is required']"
                 ref="nameRef"
                 label="Name"/>
      </div>

    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

import {useEntityPage} from 'src/shared';
import {OrgItem} from 'src/modules/org-structure';
import EntityPage from 'src/shared/components/EntityPage.vue';

const NAMESPACE = 'orgItem'

export default defineComponent({
  name: 'OrganizationPage',
  components: {EntityPage},
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

    const entityPage = useEntityPage<OrgItem>(
      NAMESPACE,
      () => {
        return {
          id: '',
          parentId: 'ROOT',
          name: '',
          categoryId: '',
          itemType: 'U'
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
