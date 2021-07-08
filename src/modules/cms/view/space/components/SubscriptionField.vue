<template>
  <q-btn v-if="subscribed" flat round :color="color" icon="check_circle_outline" @click="unsubscribe"/>
  <q-btn v-else flat round :color="color" icon="radio_button_unchecked" @click="subscribe"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Action} from 'vuex-class'

const namespace = 'cmsSpaceView'

@Component({
  components: {}
})
export default class SubscriptionField extends Vue {
  @Prop() subscriptions
  @Prop({type: String}) spaceId

  @Action('SubscribeToSpace', {namespace}) subscribeToSpace;
  @Action('UnsubscribeFromSpace', {namespace}) unsubscribeFromSpace;

  get subscribed() {
    return this.subscriptions.length > 0
  }

  get hasPersonPrincipal(): boolean {
    return !!this.subscriptions.find(p => p.principalType === 'person')
  }

  get color() {
    return this.hasPersonPrincipal ? 'primary' : 'grey'
  }

  unsubscribe() {
    if (this.hasPersonPrincipal) {
      this.unsubscribeFromSpace(this.spaceId)
    }
  }

  subscribe() {
    this.subscribeToSpace(this.spaceId)
  }
}
</script>

<style>

</style>
