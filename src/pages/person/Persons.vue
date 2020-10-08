<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md">
      <q-card>
        <person-list :page="page" :instanceKey="instanceKey" @pageChanged="onPageChanged"></person-list>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import PersonList from 'components/person/PersonList.vue'

const personNamespace = 'person'
const INSTANCE_KEY = 'Persons'

@Component({
  components: {
    PersonList
  }
})
export default class Persons extends Vue {
  @Getter('page', { namespace: personNamespace }) pageStateFn;
  @Action('deleteEntity', { namespace: personNamespace }) deleteEntity;

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
      void this.$router.push({ name: 'persons', query: { page: this.pageState } })
    } else {
      // eslint-disable-next-line no-void
      void this.$router.push({ name: 'persons', query: { page: '1' } })
    }
    console.log('Persons created: ', this.page)
  }

  onPageChanged (page) {
    console.log('onPageChanged: ', page)
    // eslint-disable-next-line no-void
    void this.$router.push({ name: 'persons', query: { page } })
  }

  @Watch('$route')
  onRouteChange (to) {
    this.page = to.query.page ? +to.query.page : 1
  }
}
</script>

<style>

</style>
