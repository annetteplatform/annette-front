<template>
  <div class="narrow-layout">
    <space-category-form :id="id" :action="action"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SpaceCategoryForm from './components/SpaceCategoryForm.vue'

@Component({
  components: {
    SpaceCategoryForm
  }
})
export default class SpaceCategoryPage extends Vue {
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
