<template>
  <q-list>
    <post-view-card v-for="post in items" :key="post.id" :post="post"/>
  </q-list>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import PostViewCard from 'src/modules/cms/view/post/components/PostViewCard.vue'
import {Action} from 'vuex-class'

const personNamespace = 'person'

@Component({
  components: {PostViewCard}
})
export default class PostViewList extends Vue {
  @Prop() items

  @Action('LoadEntitiesIfNotExist', {namespace: personNamespace}) loadEntitiesIfNotExist;

  @Watch('items', {immediate: true})
  onItemsChange(newItems) {
    // @ts-ignore
    const persons: string[] = newItems
      .filter(p => p.authorId.principalType === 'person')
      .map(p => p.authorId.principalId as string)
    this.loadEntitiesIfNotExist(persons)
    const spaces: string[] = newItems.map(p => p.spaceId as string)
    console.log(spaces)
  }
}
</script>

<style>

</style>
