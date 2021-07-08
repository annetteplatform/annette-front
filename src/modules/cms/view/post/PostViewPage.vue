<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md q-gutter-md">
      <post-view-card v-if="entities[id]" :post="entities[id]" :annotation-mode="false"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import PostViewFilter from 'src/modules/cms/view/post/components/PostViewFilter.vue'
import PostViewList from 'src/modules/cms/view/post/components/PostViewList.vue'
import PostViewCard from 'src/modules/cms/view/post/components/PostViewCard.vue'

const namespace = 'cmsPostView'

@Component({
  components: {
    PostViewCard,
    PostViewList,
    PostViewFilter
  }
})
export default class PostViewPage extends Vue {
  @Getter('entities', {namespace}) entities;
  @Action('GetPostView', {namespace}) getPostView;
  @Action('ViewPost', {namespace}) viewPost;

  id = ''

  @Watch('$route', {immediate: true})
  onRouteChange(to) {
    this.id = ''
    const id = to.params.id
    this.getPostView(id).then(() => {
      this.id = id
      this.viewPost(id)
    })
  }
}
</script>

<style>

</style>
