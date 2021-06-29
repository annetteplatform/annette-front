<template>
    <q-card-actions align="between">
      <q-chip outline square color="primary" text-color="white" icon="event">
        {{ publicationDate }}
      </q-chip>
    </q-card-actions>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {date} from 'quasar'

@Component({
  components: {}
})
export default class PostStatusLine extends Vue {
  // @ts-ignore
  @Prop() post

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
