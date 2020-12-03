<template>
  <div>
    <org-hierarchy :id="id" :action="action"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import OrgHierarchy from 'src/modules/org-structure/components/org-hierarchy/OrgHierarchy.vue'

@Component({
  components: {
    OrgHierarchy
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
