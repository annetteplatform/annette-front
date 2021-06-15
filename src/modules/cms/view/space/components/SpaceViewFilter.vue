<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      bordered
      icon="search"
      label="Filter"
      :value="expanded"
    >
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-form
            @submit="setFilter"
            @reset="clear"
            class="full-width q-pa-md q-gutter-md">
            <q-input
              v-model="filterModel.filter"
              label="Filter"/>
          </q-form>
          <q-card-actions vertical class="justify-start">
            <q-btn flat color="primary" label="Filter" @click="setFilter"/>
            <q-btn flat color="negative" label="Clear" @click="clear"/>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {DEFAULT_SPACE_VIEW_FIND_QUERY, SpaceViewFindQuery} from 'src/store/cms/space-view/state'

@Component({
  components: {}
})
export default class SpaceViewFilter extends Vue {
  // @ts-ignore
  @Prop({ type: SpaceViewFindQuery, default: DEFAULT_SPACE_VIEW_FIND_QUERY() }) filter

  expanded = true
  filterModel: SpaceViewFindQuery = DEFAULT_SPACE_VIEW_FIND_QUERY()

  setFilter() {
    this.$emit('filterChanged', this.filterModel)
  }

  clear() {
    this.filterModel = DEFAULT_SPACE_VIEW_FIND_QUERY()
  }

  @Watch('filter', { immediate: true })
  onFilterChange (newFilter) {
    this.filterModel = {...newFilter}
  }
}
</script>

<style>

</style>
