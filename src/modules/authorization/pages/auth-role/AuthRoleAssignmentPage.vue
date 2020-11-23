<template>
  <div class="narrow-layout">
    <auth-role-assignments :id="id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AuthRoleAssignments from '../../components/auth-role/AuthRoleAssignments.vue'

@Component({
  components: {
    AuthRoleAssignments
  }
})
export default class AuthRoleAssigmentPage extends Vue {
  id = ''

  @Watch('$route', { immediate: true })
  onRouteChange (to) {
    console.log(to)
    this.id = to.params.id
  }
}

</script>
