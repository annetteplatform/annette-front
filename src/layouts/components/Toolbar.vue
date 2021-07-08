<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn v-if="isAuthenticated" dense flat round icon="menu" @click="toggleLeftDrawer"/>
      <q-btn stretch flat to='/'>
        Annette Admin Console
      </q-btn>
      <q-space/>

      <q-btn flat stretch no-caps v-if='isAuthenticated'>
        <q-avatar text-color='white' icon='account_circle'/>
        &nbsp;{{ quasar.screen.gt.sm ? fullname : '' }}
        <q-menu>
          <q-list>
            <q-item clickable to='/person/profile'>
              <q-item-section avatar>
                <q-icon name='person'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable @click='logout()'>
              <q-item-section avatar>
                <q-icon name='exit_to_app'/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn flat stretch no-caps v-else @click='login()'>
        <q-avatar text-color='white' icon='account_circle'/>
        &nbsp;Login
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'src/store';
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'Toolbar',
  emits: ['toggleLeftDrawer'],
  setup(props, { emit }) {
    const quasar = useQuasar()
    const store = useStore()
    const fullname = computed(() => store.getters['main/fullname'])
    const isAuthenticated = computed(() => store.getters['main/isAuthenticated'])
    const login = () => store.dispatch('main/Login')
    const logout = () => store.dispatch('main/Logout')
    const toggleLeftDrawer = () => emit('toggleLeftDrawer')

    return {
      quasar,
      fullname,
      isAuthenticated,
      login,
      logout,
      toggleLeftDrawer
    };
  }
});
</script>
