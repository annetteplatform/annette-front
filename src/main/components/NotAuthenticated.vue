<template>
  <div class="row">
    <div class="col-md-8 col-sm-12 q-pa-sm">
      <q-card flat class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Annette Admin Console</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          In Annette Admin Console you can perform the following tasks:
          <ul>
            <li>Maintain person catalog</li>
            <li>Maintain organizational structures and roles</li>
            <li>Maintain roles and assign permissions</li>
            <li>Maintain languages, translations and applications</li>
          </ul>
        </q-card-section>
        <q-card-actions vertical>

        </q-card-actions>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-12 q-pa-sm">
      <q-card flat class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Login to console</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Please login to get access to Annette Admin Console's services
        </q-card-section>
        <q-card-actions vertical>
          <q-btn class="q-mb-md" color="primary" size="lg" @click="login()" label="Login"></q-btn>
        </q-card-actions>
      </q-card>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'src/store';

export default defineComponent({
  name: 'NotAuthenticated',
  components: {},
  setup() {
    const store = useStore()
    const login = () => store.dispatch('main/Login')

    return {
      login
    };
  }
});
</script>
