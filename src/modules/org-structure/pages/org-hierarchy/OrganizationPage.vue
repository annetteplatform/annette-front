<template>
  <div class="narrow-layout">
    <organization-form :id="id" :action="action"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import OrganizationForm from '../../components/org-hierarchy/OrganizationForm.vue'

@Component({
  components: {
    OrganizationForm
  }
})
export default class OrganizationPage extends Vue {
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
