<template>
  <entity-page narrow
               :caption="$t('annette.orgStructure.category.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="orgStructure.category"
                                   :back-label="$t('annette.orgStructure.category.titlePl')"
                                   back-route-name="orgStructure.categories"/>
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
               :to="{ name: 'org-structure.category', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
    </template>
    <template v-slot:default>
      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 " stack-label dense
                 v-model="entityModel.id"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action!=='create'"
                 ref="idRef"
                 :label="$t('annette.orgStructure.category.field.id')"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 " stack-label dense
                 v-model="entityModel.name"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 :label="$t('annette.orgStructure.category.field.name')"/>
      </div>
      <div>
        <div>
          {{ $t('annette.orgStructure.category.allowedOrgItems')}}
        </div>
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forOrganization"
          :disable="action ==='view'"
          :label="$t('annette.orgStructure.category.field.forOrganization')"/>
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forUnit"
          :disable="action ==='view'"
          :label="$t('annette.orgStructure.category.field.forUnit')"/>
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.forPosition"
          :disable="action ==='view'"
          :label="$t('annette.orgStructure.category.field.forPosition')"/>
      </div>

    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {defineComponent, ref} from 'vue';

import {useEntityPage} from 'src/shared/composables';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {OrgCategory, useOrgCategoryStore} from 'src/modules/org-structure';

function emptyEntity(): OrgCategory {
  return {
    id: '',
    name: '',
    forOrganization: false,
    forUnit: false,
    forPosition: false
  }
}

export default defineComponent({
  name: 'OrgCategoryPage',
  components: {DefaultEntityPageToolbar, EntityPage},
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

    const store = useOrgCategoryStore()

    const entityPage = useEntityPage<OrgCategory>({
        store,
        emptyEntity,
        formHasError,
        props
      }
    )

    return {
      idRef,
      nameRef,
      ...entityPage,
    };
  }
});
</script>
