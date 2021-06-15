<template>
    <q-table
      flat bordered
      :data="items"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width/>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width/>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm"  round flat dense @click="props.expand = !props.expand"
                   :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"/>
          </q-td>
          <q-td> {{ props.row.name }} </q-td>
          <q-td> <space-type-field :space-type="props.row.spaceType"/> </q-td>
          <q-td> <category-field :category-id="props.row.categoryId"/> </q-td>
          <q-td> <subscription-field :space-id="props.row.id" :subscriptions="props.row.subscriptions"/> </q-td>
          <q-td auto-width>
            <q-btn flat round color="blue" size="sm" icon="login" :to="{name: 'cms.postViews', query: { spaces: props.row.id } }"/>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left"> {{ props.row.description }}.</div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Getter} from 'vuex-class'
import SpaceTypeField from 'src/modules/cms/view/space/components/SpaceTypeField.vue'
import CategoryField from 'src/modules/cms/view/space/components/CategoryField.vue'
import SubscriptionField from 'src/modules/cms/view/space/components/SubscriptionField.vue'

const namespace = 'cmsSpaceView'

const COLUMNS = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true
  },
  {name: 'spaceType', align: 'left', label: 'SpaceType', field: 'spaceType', sortable: true},
  {name: 'categoryId', align: 'left', label: 'Category', field: 'categoryId', sortable: true},
  {name: 'subscription', align: 'left', label: 'Subscribed', field: row => row.subscriptions.length > 0, sortable: true}
]

@Component({
  components: {SubscriptionField, CategoryField, SpaceTypeField}
})
export default class SpaceViewList extends Vue {
  @Prop() instanceKey

  @Getter('items', {namespace}) itemsFn;
  @Getter('loading', {namespace}) loadingFn;

  columns = COLUMNS

  get items() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.itemsFn(this.instanceKey)
  }

  get loading() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.loadingFn(this.instanceKey)
  }
}
</script>

<style>

</style>
