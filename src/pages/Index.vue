<template>
    <div class="narrow-layout">

    <h5 class="text-center" v-if="isAuthenticated">Wecome, {{ fullname }}</h5>
    <h5 class="text-center" v-else>Annette Platform</h5>

    <not-authenticated v-if="!isAuthenticated"></not-authenticated>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import NotAuthenticated from 'components/main/NotAuthenticated.vue'
import Services from 'components/main/Services.vue'

const appNamespace = 'app'

@Component({
  components: {
    NotAuthenticated,
    Services
  }
})
export default class PageIndex extends Vue {
  @Getter('profile', { namespace: appNamespace }) profile;
  @Getter('isAuthenticated', { namespace: appNamespace }) isAuthenticated;
  @Getter('fullname', { namespace: appNamespace }) fullname;
}
</script>
