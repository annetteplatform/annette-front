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

const namespace = 'cmsPost'

@Component({
  components: {
    PostEditCard,
    PostList,
    PostFilter
  }
})
export default class PostPage extends Vue {
  @Getter('entities', {namespace}) entities;
  @Action('GetPostForEdit', {namespace}) getPostForEdit;

  id = ''

  @Watch('$route', {immediate: true})
  onRouteChange(to) {
    this.id = ''
    const id = to.params.id
    this.getPostForEdit(id).then(() => {
      this.id = id
    })
  }
}
</script>

<style>

</style>
