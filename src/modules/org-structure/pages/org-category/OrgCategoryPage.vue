<template>
  <div class="narrow-layout">
    <org-category-form :id="id" :action="action"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import OrgCategoryForm from '../../components/org-category/OrgCategoryForm.vue'

@Component({
  components: {
    OrgCategoryForm
  }
})
export default class OrgCategoryPage extends Vue {
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
