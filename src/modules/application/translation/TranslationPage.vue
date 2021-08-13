<template>
  <q-form
    @submit="save"
    class="narrow-layout">
    <div class="row">
      <div class="col-md-12 q-pa-md q-gutter-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">Translation</h5>
          <q-space/>
          <q-btn class="q-mr-md" outline color="primary"
                 label="Translations"
                 :to="{name: 'application.translations'}"/>
          <q-btn color="primary"
                 v-if="entityModel"
                 label="Save"
                 @click="save"/>
        </q-item>

      </div>
    </div>

    <div v-if="entityModel">


      <div class="row q-pb-md" v-if="error">
        <message-box :message="error" @closeMessage="clearError"/>
      </div>


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
                 label="Translation Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || 'Field is required']"
                 ref="nameRef"
                 label="Name"/>
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

import MessageBox from 'src/common/components/MessageBox.vue';
import {Translation} from 'src/modules/application';
import {useEntityPage} from 'src/common';

export default defineComponent({
  name: 'TranslationPage',
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

    const entityPage = useEntityPage<Translation>(
      'appTranslation',
      () => { return { id: '', name: ''} },
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
