<template>
  <q-chip outline square color="primary" text-color="white" >{{ categoryId }}</q-chip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  components: {}
})
export default class CategoryField extends Vue {
  // @ts-ignore
  @Prop({ type: String }) categoryId
}
</script>

<style>

</style>
