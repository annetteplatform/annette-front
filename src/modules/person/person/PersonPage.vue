<template>
  <q-form
    @submit="save"
    class="narrow-layout">
    <div class="row">
      <div class="col-md-12 q-pa-md q-gutter-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">Person</h5>
          <q-space/>
          <q-btn class="q-mr-md" outline color="primary"
                 label="Persons"
                 :to="{name: 'person.persons'}"/>
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

    <div class="q-gutter-md" v-if="entityModel">

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
                 label="Person Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                 v-model="entityModel.lastname"
                 :rules="[val => !!val || 'Field is required']"
                 ref="lastnameRef"
                 label="Lastname"/>
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                 v-model="entityModel.firstname"
                 :rules="[val => !!val || 'Field is required']"
                 ref="firstnameRef"
                 label="Firstname"/>
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.middlename"
                 label="Middlename"/>
      </div>

      <div class="row">
        <person-category-selector v-model="entityModel.categoryId" />
      </div>

      <div class="row">
        <q-input
          class="col-md-5 col-sm-12 col-xs-12 q-pr-md "
          type="email"
          v-model="entityModel.email"
          label="Email"
        />

        <q-input
          class="col-md-4 col-sm-12 col-xs-12 q-pr-md "
          v-model="entityModel.phone"
          label="Phone number "
        />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

import MessageBox from 'src/common/components/MessageBox.vue';
import {useEntityPage} from 'src/common';
import {Person} from 'src/modules/person';
import PersonCategorySelector from "src/modules/person/category/components/PersonCategorySelector.vue";

export default defineComponent({
  name: 'PersonPage',
  components: {PersonCategorySelector, MessageBox},
  setup() {
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
      'personPerson',
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
