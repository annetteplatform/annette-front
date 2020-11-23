<template>
  <div class="narrow-layout">
    <person-form :id="id" :action="action"></person-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import PersonForm from '../components/PersonForm.vue'

@Component({
  components: {
    PersonForm
  }
})
export default class PersonPage extends Vue {
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
