<template>
  <entity-page narrow
               :caption="$t('annette.person.person.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="person.person"
                                   :back-label="$t('annette.person.person.titlePl')"
                                   back-route-name="person.persons"/>
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
               :to="{ name: 'person.person', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
    </template>
    <template v-slot:default>
      <div class="row q-pb-md ">
        <q-input class="col-md-4 col-sm-12 col-xs-12 " stack-label dense
                 v-model="entityModel.id"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action!=='create'"
                 ref="idRef"
                 :label="$t('annette.person.person.field.id')"/>
      </div>
      <div class="row q-pb-sm ">
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                 v-model="entityModel.lastname"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="lastnameRef"
                 :label="$t('annette.person.person.field.lastname')"/>
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                 v-model="entityModel.firstname"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="firstnameRef"
                 :label="$t('annette.person.person.field.firstname')"/>
        <q-input class="col-md-4 col-sm-12 col-xs-12" stack-label dense
                 v-model="entityModel.middlename"
                 :readonly="action ==='view'"
                 ref="middlenameRef"
                 :label="$t('annette.person.person.field.middlename')"/>
      </div>

      <div class="row q-pb-sm">
        <person-category-selector v-model="entityModel.categoryId"
                                  :readonly="action ==='view'"/>
      </div>

      <div class="row q-pb-md q-pb-md">
        <q-input class="col-md-6 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                 v-model="entityModel.email"
                 :readonly="action ==='view'"
                 :label="$t('annette.person.person.field.email')"/>

        <q-input class="col-md-6 col-sm-12 col-xs-12 " stack-label dense
                 v-model="entityModel.phone"
                 :readonly="action ==='view'"
                 :label="$t('annette.person.person.field.phone')"/>
      </div>

      <div class="row q-pb-md ">
        <q-input class="col-md-6 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                 v-model="entityModel.source"
                 :readonly="action ==='view'"
                 :label="$t('annette.person.person.field.source')"/>
        <q-input class="col-md-6 col-sm-12 col-xs-12 " stack-label dense
                 v-model="entityModel.externalId"
                 :readonly="action ==='view'"
                 :label="$t('annette.person.person.field.externalId')"/>
      </div>

      <div class="q-pt-md q-pb-md">
        <attributes-form v-if="attributes && metadata"
                         v-model="attributes"
                         :metadata="metadata"
                         :readonly="action === 'view'"/>
      </div>


    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {computed, defineComponent, ref} from 'vue';

import {Person, personService, usePersonStore} from 'src/modules/person';
import {useQuasar} from 'quasar';
import {useEntityPage} from 'src/shared/composables';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {useI18n} from 'vue-i18n';
import AttributesForm from 'src/shared/components/attributes/AttributesForm.vue';
import PersonCategorySelector from 'src/modules/person/ui/category/components/PersonCategorySelector.vue';

function emptyEntity(): Person {
  return {
    id: '',
    lastname: '',
    firstname: '',
    middlename: '',
    categoryId: '',
    phone: '',
    email: '',
    source: '',
    externalId: ''
  }
}

export default defineComponent({
  name: 'PersonPage',
  components: {PersonCategorySelector, AttributesForm, DefaultEntityPageToolbar,  EntityPage, /*PersonCategorySelector*/},
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const idRef = ref()
    const lastnameRef = ref()
    const firstnameRef = ref()


    const formHasError = (entity?: Person | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      lastnameRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      firstnameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!lastnameRef.value.hasError || !!firstnameRef.value.hasError || !!idRef.value.hasError ||
        !!(entity && (entity.categoryId === '' || entity.categoryId === null || entity.categoryId === undefined))
    }

    const store = usePersonStore()
    const quasar = useQuasar()
    const i18n = useI18n()

    const entityPage = useEntityPage<Person>({
        store,
        emptyEntity,
        formHasError,
        props,
      enableAttributes: true,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      getAttributes: personService.getPersonAttributes,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      getMetadata: personService.getPersonMetadata
    })

    return {
      idRef,
      lastnameRef,
      firstnameRef,
      ...entityPage
    };
  }
});
</script>
