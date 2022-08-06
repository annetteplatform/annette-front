<template>

  <q-header elevated>
    <q-toolbar>
      <q-btn v-if="authStore.isAuthenticated" dense flat round icon="menu" @click="mainStore.toggleLeftDrawer"/>
      <q-btn stretch flat to='/'>
        {{ $t("annetteConsole.toolbar.title") }}
      </q-btn>
      <q-space/>

      <q-btn flat stretch no-caps v-if='authStore.isAuthenticated'>
        <q-avatar text-color='white' icon='account_circle'/>
        <q-menu>
          <q-list>
            <q-item clickable to='/person/profile'>
              <q-item-section avatar>
                <q-icon name='person'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("annetteConsole.toolbar.profileMenu.profile") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to='/person/profile'>
              <q-item-section avatar>
                <q-icon name='language'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("annetteConsole.toolbar.profileMenu.language") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to='/person/profile'>
              <q-item-section avatar>
                <q-icon name='settings'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("annetteConsole.toolbar.profileMenu.settings") }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable @click='authStore.logout()'>
              <q-item-section avatar>
                <q-icon name='exit_to_app'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("annetteConsole.toolbar.profileMenu.signOut") }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn flat stretch no-caps v-else @click='authStore.login()'>
        <q-avatar text-color='white' icon='account_circle'/>
        &nbsp;{{ $t("annetteConsole.toolbar.profileMenu.signIn") }}
      </q-btn>
    </q-toolbar>
  </q-header>

</template>

<script setup lang="ts">

import {useAuthStore, useMainStore} from 'src/main';

const authStore = useAuthStore()
const mainStore = useMainStore()

</script>

<style scoped>

</style>
