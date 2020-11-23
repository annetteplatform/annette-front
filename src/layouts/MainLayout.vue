<template>
  <q-layout view='hHh Lpr lFf'>
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="authenticated"  dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-btn stretch flat to='/'>
          Annette Admin Console
        </q-btn>
        <q-space />

        <q-btn flat stretch no-caps v-if='authenticated'>
          <q-avatar text-color='white' icon='account_circle' />
          &nbsp;{{ $q.screen.gt.sm ? fullname : '' }}
          <q-menu>
            <q-list>
              <q-item clickable to='/person/profile'>
                <q-item-section avatar>
                  <q-icon name='person' />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable @click='logout()'>
                <q-item-section avatar>
                  <q-icon name='exit_to_app' />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat stretch no-caps v-else @click='login()'>
          <q-avatar text-color='white' icon='account_circle' />
          &nbsp;Login
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer v-if="authenticated" show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <main-menu />
    </q-drawer>
  </q-layout>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import MainMenu from 'src/modules/main/components/MainMenu.vue'

const appNamespace = 'app'

@Component({
  components: {
    MainMenu
  }
})
export default class MainLayout extends Vue {
  @Getter('fullname', { namespace: appNamespace }) fullname
  @Getter('isAuthenticated', { namespace: appNamespace }) authenticated
  @Action('Login', { namespace: appNamespace }) login
  @Action('Logout', { namespace: appNamespace }) logout

  leftDrawerOpen = true
}
</script>
