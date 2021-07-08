<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <post-edit-card :id="id" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import PostFilter from './components/PostFilter.vue'
import PostList from './components/PostList.vue'
import PostEditCard from 'src/modules/cms/post/components/PostEditCard.vue'

const namespace = 'cmsSpace'

@Component({
  components: {
    PostEditCard
  }
})
export default class SpacePage extends Vue {
  @Getter('entities', {namespace}) entities;
  @Action('GetSpaceForEdit', {namespace}) getSpaceForEdit;

  id = ''

  @Watch('$route', {immediate: true})
  onRouteChange(to) {
    this.id = to.params.id
  }
}
</script>

<style>

</style>
