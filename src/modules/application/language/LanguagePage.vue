<template>
  <div class="narrow-layout">
    <div class="row">
      <div class="col-md-12 q-pa-md q-gutter-md">
        <q-item class="q-mr-none">
          <h5 class="q-ma-none">Language</h5>
          <q-space/>
          <q-btn class="q-mr-md" outline color="primary"
                 label="Languages"
                 :to="{name: 'application.languages'}"/>
          <q-btn color="primary"
                 label="Save"
                 @click="save"/>
        </q-item>

      </div>
    </div>

    <q-form
      v-if="languageModel"
      @submit="save"
      class="full-width">
      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="languageModel.id"
                 label="Language Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="languageModel.name"
                 label="Name"/>
      </div>
    </q-form>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch,} from 'vue';
import {useStore} from 'src/store';
import {RouteLocationNormalizedLoaded, useRoute} from 'vue-router'

export default defineComponent({
  name: 'LanguagePage',
  components: {},
  setup() {
    const store = useStore()

    const route = useRoute()
    const action = ref(route.params.action)
    const id = ref(route.params.id)
    const languageModel = ref()

    const loadEntity = async (newRoute: RouteLocationNormalizedLoaded) => {
      action.value = newRoute.params.action
      id.value = newRoute.params.id
      if (action.value === 'edit') {
        languageModel.value = { ...await store.dispatch('appLanguage/getEntityForEdit', id.value) }
      } else if (action.value === 'create') {
        languageModel.value = {
          id: '',
          name: ''
        }
      }
    }

    void loadEntity(route)

    watch(route, loadEntity)

    const save = async () => {
      console.log('save')
      if (action.value === 'edit') {
        languageModel.value = { ...await store.dispatch('appLanguage/updateEntity', languageModel.value) }
      } else if (action.value === 'create') {
        languageModel.value = { ...await store.dispatch('appLanguage/createEntity', languageModel.value) }
      }
    }

    return {
      action,
      id,
      save,
      languageModel
    };
  }
});
</script>
