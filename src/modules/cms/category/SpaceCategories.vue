<template>
  <div class="narrow-layout row">
    <div class="col-md-12 q-pa-md">
      <q-card>
        <space-category-list :page="page" :instanceKey="instanceKey" @pageChanged="onPageChanged"></space-category-list>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import SpaceCategoryList from './components/SpaceCategoryList.vue'

const namespace = 'cmsSpaceCategory'
const INSTANCE_KEY = 'SpaceCategories'

@Component({
  components: {
    SpaceCategoryList
  }
})
export default class SpaceCategories extends Vue {
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
      void this.$router.push({ name: 'cms.categories', query: { page: this.pageState } })
    } else {
      // eslint-disable-next-line no-void
      void this.$router.push({ name: 'cms.categories', query: { page: '1' } })
    }
  }

  onPageChanged (page) {
    // eslint-disable-next-line no-void
    void this.$router.push({ name: 'cms.categories', query: { page } })
  }

  @Watch('$route')
  onRouteChange (to) {
    this.page = to.query.page ? +to.query.page : 1
  }
}
</script>

<style>

</style>
