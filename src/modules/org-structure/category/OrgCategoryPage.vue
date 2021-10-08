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
      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="View"
             :to="{ name: 'orgStructure.category', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Edit"
             :to="{ name: 'orgStructure.category', params: { action: 'edit', id } }"/>
      <q-btn color="primary"
             v-if="action !== 'view'"
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
                 :readonly="action ==='view'"
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
          :disable="action ==='view'"
          label="Organization"
        />
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forUnit"
          :disable="action ==='view'"
          label="Unit"
        />
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forPosition"
          :disable="action ==='view'"
          label="Position"
        />
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useEntityPage} from 'src/shared';
import {OrgCategory} from 'src/modules/org-structure';
import EntityPage from 'src/shared/components/EntityPage.vue';


function emptyEntity() {
  return {
    id: '',
    name: '',
    forOrganization: false,
    forUnit: false,
    forPosition: false
  }
}

const NAMESPACE = 'orgCategory';

export default defineComponent({
  name: 'OrgCategoryPage',
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

    const entityPage = useEntityPage<OrgCategory>({
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
