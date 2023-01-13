<template>

  <q-header reveal bordered class="bg-grey-1 text-primary">
    <q-toolbar class="text-black">
      <q-btn v-if="authStore.isAuthenticated"
             dense flat round
             icon="menu"
             @click="mainStore.toggleLeftDrawer"/>
      <q-btn dense stretch flat to='/'>
        <q-avatar square>
          <img class="annette-avatar" src="/annette_logo.svg">
        </q-avatar>&nbsp;
        {{ $t('annetteConsole.toolbar.title') }}
      </q-btn>
      <q-space/>
      <q-btn flat round dense class="q-mr-xs"
             v-if='authStore.isAuthenticated'
             icon="search">
        <q-tooltip>
          {{ $t('annetteConsole.toolbar.searchTooltip') }}
        </q-tooltip>
      </q-btn>
      <q-btn flat round dense class="q-mr-xs"
             v-if='authStore.isAuthenticated'
             icon="apps">
        <q-tooltip>
          {{ $t('annetteConsole.toolbar.servicesTooltip') }}
        </q-tooltip>
      </q-btn>
      <q-btn flat round dense class="q-mr-xs"
             v-if='authStore.isAuthenticated'
             icon="notifications">
        <q-badge floating color="red" label="1"/>
        <q-tooltip>
          {{ $t('annetteConsole.toolbar.notificationsTooltip') }}
        </q-tooltip>
      </q-btn>

      <q-btn flat round dense>
        <q-avatar icon='language' size="md"/>
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup
                    v-for="lang in mainStore.languages" :key="lang.id"
                    :active="lang.id === i18n.locale"
                    @click="setLanguage(lang.id)">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" size="md">
                  {{ lang.id.toUpperCase() }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ lang.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn flat round dense
             v-if='authStore.isAuthenticated'>
        <q-avatar icon='account_circle'/>
        <q-menu>
          <q-list>
            <q-item clickable to='/person/profile'>
              <q-item-section avatar>
                <q-icon name='person'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('annetteConsole.toolbar.profileMenu.profile') }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable to='/person/profile'>
              <q-item-section avatar>
                <q-icon name='settings'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('annetteConsole.toolbar.profileMenu.settings') }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable @click='authStore.logout()'>
              <q-item-section avatar>
                <q-icon name='logout'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t('annetteConsole.toolbar.profileMenu.signOut') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn dense flat stretch no-caps v-else @click='authStore.login()' icon='login'>
        &nbsp;&nbsp;{{ $t('annetteConsole.toolbar.profileMenu.signIn') }}
      </q-btn>
    </q-toolbar>
  </q-header>

</template>

<script setup lang="ts">

import {mainService, useAuthStore, useMainStore} from 'src/main';
import {useI18n} from 'vue-i18n';

const authStore = useAuthStore()
const mainStore = useMainStore()
const i18n = useI18n()

const setLanguage = (lang: string) =>  {
  i18n.locale.value = lang
  mainStore.setLanguage(lang)
}

</script>

<style scoped>

.q-btn .q-avatar .annette-avatar {
  height: 32px;
  width: 32px;
}

</style>
