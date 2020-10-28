<template>
  <div class="narrow-layout">
    <org-role-form :id="id" :action="action"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import OrgRoleForm from 'components/org-role/OrgRoleForm.vue'

@Component({
  components: {
    OrgRoleForm
  }
})
export default class OrgRolePage extends Vue {
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
