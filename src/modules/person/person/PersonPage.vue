<template>
  <entity-page narrow
               caption="Person"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Persons"
             :to="{name: 'person.persons'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'person.person', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'person.person', params: { action: 'edit', id}}"/>
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
      <div class="row">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.id"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="Person Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                 v-model="entityModel.lastname"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action ==='view'"
                 ref="lastnameRef"
                 label="Lastname"/>
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                 v-model="entityModel.firstname"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action ==='view'"
                 ref="firstnameRef"
                 label="Firstname"/>
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.middlename"
                 :readonly="action ==='view'"
                 label="Middlename"/>
      </div>

      <div class="row">
        <person-category-selector v-model="entityModel.categoryId"
                                  :readonly="action ==='view'"/>
      </div>

      <div class="row">
        <q-input
          class="col-md-5 col-sm-12 col-xs-12 q-pr-md "
          type="email"
          v-model="entityModel.email"
          :readonly="action ==='view'"
          label="Email"
        />

        <q-input
          class="col-md-4 col-sm-12 col-xs-12 q-pr-md "
          v-model="entityModel.phone"
          :readonly="action ==='view'"
          label="Phone number "/>
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

import {useEntityPage} from 'src/shared';
import {Person} from 'src/modules/person';
import PersonCategorySelector from 'src/modules/person/category/components/PersonCategorySelector.vue'
import EntityPage from 'src/shared/components/EntityPage.vue';

const NAMESPACE = 'personPerson';

export default defineComponent({
  name: 'PersonPage',
  components: {EntityPage, PersonCategorySelector},
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

    const entityPage = useEntityPage<Person>(
      NAMESPACE,
      () => {
        return {
          id: '',
          lastname: '',
          firstname: '',
          middlename: '',
          categoryId: '',
          phone: '',
          email: '',
        }
      },
      formHasError,
      props
    )

    return {
      idRef,
      lastnameRef,
      firstnameRef,
      ...entityPage
    };
  }
});
</script>
