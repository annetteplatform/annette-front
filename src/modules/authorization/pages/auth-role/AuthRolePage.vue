<template>
  <div class="narrow-layout">
    <auth-role-form :id="id" :action="action"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AuthRoleForm from '../../components/auth-role/AuthRoleForm.vue'

@Component({
  components: {
    AuthRoleForm
  }
})
export default class AuthRolePage extends Vue {
  id = ''
  action = 'view'

  @Watch('$route', { immediate: true })
  onRouteChange (to) {
    console.log(to)
    this.id = to.params.id
    this.action = to.params.action
  }
}

</script>
