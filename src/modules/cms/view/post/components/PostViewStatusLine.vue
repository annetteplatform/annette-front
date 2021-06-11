<template>
    <q-card-actions align="between">
      <q-chip outline square color="primary" text-color="white" icon="event">
        {{ publicationDate }}
      </q-chip>
      <q-btn v-if="post.metric.likedByMe" flat icon="thumb_up" color="primary" @click="changeLikeStatus(post.id)">&nbsp;&nbsp;
        {{ post.metric.likes }}
      </q-btn>
      <q-btn v-else flat icon="thumb_up" color="grey-4" @click="changeLikeStatus(post.id)">
        &nbsp;&nbsp;{{ post.metric.likes }}
      </q-btn>
      <q-chip outline square color="primary" text-color="white" icon="visibility">
        {{ post.metric.views }}
      </q-chip>
    </q-card-actions>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {date} from 'quasar'
import {Action} from 'vuex-class'

const namespace = 'cmsPostView'

@Component({
  components: {}
})
export default class PostViewStatusLine extends Vue {
  // @ts-ignore
  @Prop() post

  @Action('ChangeLikeStatus', {namespace}) changeLikeStatus;

  get publicationDate() {
    if (this.post.publicationTimestamp) {
      return date.formatDate(this.post.publicationTimestamp, 'D MMM YYYY,  H:mm:ss')
    } else {
      return ' '
    }
  }
}
</script>

<style>

</style>
