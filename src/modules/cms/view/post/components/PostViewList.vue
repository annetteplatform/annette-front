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
const spaceNamespace = 'cmsSpaceView'

@Component({
  components: {PostViewCard}
})
export default class PostViewList extends Vue {
  @Prop() items

  @Action('LoadEntitiesIfNotExist', {namespace: personNamespace}) loadPersonsIfNotExist;
  @Action('LoadEntitiesIfNotExist', {namespace: spaceNamespace}) loadSpacesIfNotExist;

  @Watch('items', {immediate: true})
  onItemsChange(newItems) {
    // @ts-ignore
    const persons: string[] = newItems
      .filter(p => p.authorId.principalType === 'person')
      .map(p => p.authorId.principalId as string)
      .filter((elem, index, self) => index === self.indexOf(elem))
    this.loadPersonsIfNotExist(persons)
    const spaces: string[] = newItems
      .map(p => p.spaceId as string)
      .filter((elem, index, self) => index === self.indexOf(elem))
    this.loadSpacesIfNotExist(spaces)
    console.log(spaces)
  }
}
</script>

<style>

</style>
