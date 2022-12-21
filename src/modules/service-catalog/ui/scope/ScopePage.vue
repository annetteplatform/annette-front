<template>
  <entity-page narrow
               :caption="$t('annette.serviceCatalog.scope.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="serviceCatalog.scope"
                                   :back-label="$t('annette.serviceCatalog.scope.titlePl')"
                                   back-route-name="serviceCatalog.scopes"/>
      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="Principals"
             :to="{ name: 'serviceCatalog.scopePrincipals', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Principals"
             :to="{ name: 'serviceCatalog.scopePrincipals', params: { action: 'edit', id } }"/>
    </template>
    <template v-slot:status>
      <q-chip outline square color="red" text-color="white"
              :label="$t('annette.shared.crud.changed')"
              v-if="changed()"/>
      <q-chip outline square color="green" text-color="white"
              :label="$t('annette.shared.crud.saved')"
              v-if="saved && ! changed()"/>
    </template>
    <template v-slot:save-toolbar >
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'serviceCatalog.scope', params: { action: 'view', id } }"/>
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
                 :label="$t('annette.serviceCatalog.scope.field.id')"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 :label="$t('annette.serviceCatalog.scope.field.name')"/>
      </div>
      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 "
          v-model="entityModel.description"
          type="textarea"
          :label="$t('annette.serviceCatalog.scope.field.description')"/>
      </div>
      <div class="row">
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.active"
          disable
          :label="$t('annette.serviceCatalog.scope.field.active')"/>
      </div>
<!--      <div class="row">-->
<!--        <language-scope-list v-if="action !== 'create'"-->
<!--                                   :label="$t('annette.serviceCatalog.scope.field.scopes')"-->
<!--                                   :scope-id="id"-->
<!--                                   :readonly="action ==='view'"/>-->
<!--      </div>-->
    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineComponent, ref} from 'vue';

import {Scope, useScopeStore} from 'src/modules/service-catalog';
import {useEntityPage} from 'src/shared/composables';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';

function emptyEntity(): Scope {
  return {
    id: '',
    name: '',
    description: '',
    categoryId: '',
    children: [],
    active: true,
  }
}

export default defineComponent({
  name: 'ScopePage',
  components: {DefaultEntityPageToolbar,  EntityPage},
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

    const store = useScopeStore()

    const entityPage = useEntityPage<Scope>({
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
