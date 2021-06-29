<template>
  <q-card flat bordered class="q-mb-md" :key="post.id">

    <q-card-section>
      <div v-if="spaces[post.spaceId]" class="text-overline q-mb-xs">{{ spaces[post.spaceId].name }}</div>
      <router-link v-if="annotationMode" class="text-h6" style="text-decoration: none; color: black;"
           :to="{ name: 'cms.postView', params: {id: post.id }}">{{ post.title }}</router-link>
      <div v-if="!annotationMode" class="text-h4">{{ post.title }}</div>
      <principal-field :principal="post.authorId"/>
      <post-view-status-line v-if="!annotationMode" :post="post"/>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <post-content-view v-if="annotationMode" :post-content="post.introContent"/>
      <post-content-view v-else :post-content="post.content"/>
    </q-card-section>

    <q-card-section v-if="annotationMode" class="q-pt-none">
      <q-btn flat color="primary" :to="{ name: 'cms.postView', params: {id: post.id }}">READ MORE</q-btn>
    </q-card-section>

    <post-view-status-line v-if="annotationMode" :post="post"/>

    <q-separator v-if="!annotationMode"  />
    <q-card-section v-if="!annotationMode && post.updatedAt && post.updatedBy">
      <updated-fields
        :updated-at="post.updatedAt"
        :updated-by="post.updatedBy"/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {date} from 'quasar'
import PostContentView from 'src/modules/cms/view/post/components/PostContentView.vue'
import PrincipalField from 'src/lib/components/PrincipalField.vue'
import {Action, Getter} from 'vuex-class'
import PostViewStatusLine from 'src/modules/cms/view/post/components/PostViewStatusLine.vue'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'

const namespace = 'cmsPostView'
const spaceNamespace = 'cmsSpaceView'

@Component({
  components: {UpdatedFields, PostViewStatusLine, PrincipalField, PostContentView}
})
export default class PostViewCard extends Vue {
  // @ts-ignore
  @Prop() post
  @Prop({default: true}) annotationMode

  @Getter('entities', {namespace: spaceNamespace}) spaces;
  @Action('LoadEntitiesIfNotExist', {namespace: spaceNamespace}) loadSpacesIfNotExist;
  @Action('ChangeLikeStatus', {namespace}) changeLikeStatus;

  get publicationDate() {
    if (this.post.publicationTimestamp) {
      return date.formatDate(this.post.publicationTimestamp, 'D MMM YYYY,  H:mm:ss')
    } else {
      return ' '
    }
  }

  @Watch('post', {immediate: true})
  onPostChanged(post) {
    this.loadSpacesIfNotExist([post.spaceId])
  }
}
</script>

<style>

</style>
