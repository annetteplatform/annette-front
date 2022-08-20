<template>
  <h5 class="text-center">Annette Platform</h5>
  <div class="row">
    <div class="col-md-8 col-sm-12 q-pa-sm">
      <q-card flat class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Annette Console</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          In Annette Console you can manage the following entities:
          <ul>
            <li>Languages, translations and applications</li>
            <li>Person catalog</li>
            <li>Organizational structures and roles</li>
            <li>Authorization roles and assign permissions</li>
            <li>Content management system (CMS)</li>
            <li>Business process management system (BPMS)</li>
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
          Please login to get access to Annette Console
        </q-card-section>
        <q-card-actions vertical>
          <q-btn class="q-mb-md" color="primary" size="lg" @click="authStore.login()" label="Login"></q-btn>
        </q-card-actions>
      </q-card>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from 'src/main';

const authStore = useAuthStore()
</script>
