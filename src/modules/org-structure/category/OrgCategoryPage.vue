<template>
  <entity-page narrow
               caption="Org. Category"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Categories"
             :to="{name: 'orgStructure.categories'}"/>
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
                 label="Category Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || 'Field is required']"
                 ref="nameRef"
                 label="Name"/>
      </div>
      <div>
        <div>
          Allowed organizational items
        </div>
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forOrganization"
          label="Organization"
        />
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forUnit"
          label="Unit"
        />
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forPosition"
          label="Position"
        />
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useEntityPage} from 'src/common';
import {OrgCategory} from 'src/modules/org-structure';
import EntityPage from 'src/common/components/EntityPage.vue';

const NAMESPACE = 'orgCategory';

export default defineComponent({
  name: 'OrgCategoryPage',
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

    const entityPage = useEntityPage<OrgCategory>(
      NAMESPACE,
      () => {
        return {
          id: '',
          name: '',
          forOrganization: false,
          forUnit: false,
          forPosition: false
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
