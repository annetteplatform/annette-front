<template>

  <q-chip v-if="spaceType === 'wiki'"  square color="green" text-color="white" >Wiki</q-chip>
  <q-chip v-else  square color="blue" text-color="white" >Blog</q-chip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  components: {}
})
export default class SpaceTypeField extends Vue {
  // @ts-ignore
  @Prop({ type: String, default: "blog" }) spaceType
}
</script>

<style>

</style>
