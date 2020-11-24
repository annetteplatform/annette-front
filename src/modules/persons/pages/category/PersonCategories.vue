<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md">
      <q-card>
        <person-category-list :page="page" :instanceKey="instanceKey" @pageChanged="onPageChanged"></person-category-list>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import PersonCategoryList from '../../components/category/PersonCategoryList.vue'

const namespace = 'personCategory'
const INSTANCE_KEY = 'PersonCategories'

@Component({
  components: {
    PersonCategoryList
  }
})
export default class PersonCategories extends Vue {
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
      void this.$router.push({ name: 'person-categories', query: { page: this.pageState } })
    } else {
      // eslint-disable-next-line no-void
      void this.$router.push({ name: 'person-categories', query: { page: '1' } })
    }
  }

  onPageChanged (page) {
    // eslint-disable-next-line no-void
    void this.$router.push({ name: 'person-categories', query: { page } })
  }

  @Watch('$route')
  onRouteChange (to) {
    this.page = to.query.page ? +to.query.page : 1
  }
}
</script>

<style>

</style>
