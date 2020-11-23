<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md">
      <q-card>
        <auth-role-list :page="page" :instanceKey="instanceKey" @pageChanged="onPageChanged"></auth-role-list>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import AuthRoleList from '../../components/auth-role/AuthRoleList.vue'

const namespace = 'authRole'
const INSTANCE_KEY = 'AuthRoles'

@Component({
  components: {
    AuthRoleList
  }
})
export default class AuthRoles extends Vue {
  @Getter('page', { namespace: namespace }) pageStateFn;
  @Action('deleteEntity', { namespace: namespace }) deleteEntity;

  page = 1
  instanceKey = INSTANCE_KEY

  get pageState () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pageStateFn(this.instanceKey)
  }

  created () {
    if (this.$route.query.page) {
      this.page = +this.$route.query.page
    } else if (this.pageState) {
      // eslint-disable-next-line no-void
      void this.$router.push({ name: 'auth-roles', query: { page: this.pageState } })
    } else {
      // eslint-disable-next-line no-void
      void this.$router.push({ name: 'auth-roles', query: { page: '1' } })
    }
  }

  onPageChanged (page) {
    // eslint-disable-next-line no-void
    void this.$router.push({ name: 'auth-roles', query: { page } })
  }

  @Watch('$route')
  onRouteChange (to) {
    this.page = to.query.page ? +to.query.page : 1
  }
}
</script>

<style>

</style>
