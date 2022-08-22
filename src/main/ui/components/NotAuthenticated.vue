<template>
  <h5 class="text-center">Annette Platform</h5>
  <div class="row">
    <div class="col-md-8 col-sm-12 q-pa-sm">
      <q-card flat class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">{{ $t('annetteConsole.notAuthenticatedHome.title') }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div v-html="$t('annetteConsole.notAuthenticatedHome.descriptionHtml')"></div>
        </q-card-section>
        <q-card-actions vertical>
        </q-card-actions>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-12 q-pa-sm">
      <q-card flat class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">&nbsp;</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ $t('annetteConsole.notAuthenticatedHome.signInDescription') }}
        </q-card-section>
        <q-card-actions vertical>
          <q-btn class="q-mb-md" color="primary" size="lg" @click="authStore.login()" :label="$t('annetteConsole.notAuthenticatedHome.signIn')"></q-btn>
        </q-card-actions>
      </q-card>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from 'src/main';

const authStore = useAuthStore()
</script>
