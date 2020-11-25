<template>
  <q-chip v-if="source.sourceType === 'role'"
    outline clickable color="primary" text-color="white" icon="security"
          @click="openRole">
    {{ source.sourceId }}
  </q-chip>
  <q-chip v-else
          outline color="secondary" text-color="white">
    {{ source.sourceType }}: {{ source.sourceId }}
  </q-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AuthSource } from 'src/store/authorization/auth-assignment/state'

@Component({
  components: {}
})
export default class AuthSourceChip extends Vue {
  @Prop() source: AuthSource

  openRole () {
    this.$router.push({ name: 'auth-role', params: { action: 'view', id: this.source.sourceId } })
      .catch(err => console.error(err))
  }
}

</script>
