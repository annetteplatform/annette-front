<template>
  <div class="narrow-layout">
    <person-category-form :id="id" :action="action"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import PersonCategoryForm from '../../components/category/PersonCategoryForm.vue'

@Component({
  components: {
    PersonCategoryForm
  }
})
export default class PersonCategoryPage extends Vue {
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
