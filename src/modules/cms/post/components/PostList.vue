<template>
  <q-table
    flat bordered
    :data="items"
    :columns="columns"
    row-key="id"
    :pagination.sync="pagination"
    :loading="this.instance.loading"
    @request="onRequest"
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
          <q-btn size="sm" round flat dense @click="props.expand = !props.expand"
                 :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"/>
        </q-td>
        <q-td> {{ props.row.title }}</q-td>
        <q-td>
          {{ props.row.spaceId }}
        </q-td>
        <q-td>
          <q-btn v-if="props.row.featured" flat round color="green" icon="check_circle_outline"
                 @click="updatePostFeatured({id: props.row.id, featured: false})"/>
          <q-btn v-else flat round color="black" icon="radio_button_unchecked"
                 @click="updatePostFeatured({id: props.row.id, featured: true})"/>
        </q-td>
        <q-td>
          <principal-field :principal="props.row.authorId"/>
        </q-td>
        <q-td>
          <q-btn v-if="props.row.publicationStatus == 'published'" flat round color="green" icon="check_circle_outline"
                 @click="unpublishPost(props.row.id)"/>
          <q-btn v-else flat round color="black" icon="radio_button_unchecked"
                 @click="publishPost(props.row.id)"/>
        </q-td>
        <q-td>
          {{ publicationDate(props.row.publicationTimestamp) }}
        </q-td>
        <q-td auto-width>
          <q-btn flat round color="blue" size="sm" icon="edit"
                 :to="{name: 'cms.post', params: { id: props.row.id } }"/>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div v-if="props.row.introContent.type == 'html'" class="text-left"> {{ props.row.introContent.html }}</div>
          <div v-else class="">
            {{ props.row.introContent.markdown }}
          </div>
        </q-td>
      </q-tr>
    </template>

  </q-table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import PrincipalField from 'src/lib/components/PrincipalField.vue'
import {date} from 'quasar'

const namespace = 'cmsPost'

const COLUMNS = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: 'title',
    sortable: true
  },
  {
    name: 'space',
    required: true,
    label: 'Space',
    align: 'left',
    field: 'spaceId',
    sortable: true
  },
  {
    name: 'featured',
    required: true,
    label: 'Featured',
    align: 'left',
    field: 'featured',
    sortable: true
  },
  {
    name: 'author',
    required: true,
    label: 'Author',
    align: 'center',
    field: 'authorId',
    sortable: true
  },
  {
    name: 'publicationStatus',
    required: true,
    label: 'Published',
    align: 'left',
    field: 'publicationStatus',
    sortable: true
  },
  {
    name: 'publicationTimestamp',
    required: true,
    label: 'Publication Date',
    align: 'left',
    field: 'publicationTimestamp',
    sortable: true
  }
]

@Component({
  components: {PrincipalField}
})
export default class PostList extends Vue {
  @Prop() instanceKey

  @Getter('items', {namespace}) itemsFn;
  @Getter('instance', {namespace}) instanceFn;
  @Action('SetPage', {namespace: namespace}) setPage;
  @Action('SetPageSize', {namespace: namespace}) setPageSize;
  @Action('SetFilter', {namespace: namespace}) setFilter;
  @Action('PublishPost', {namespace: namespace}) publishPost;
  @Action('UnpublishPost', {namespace: namespace}) unpublishPost;
  @Action('UpdatePostFeatured', {namespace: namespace}) updatePostFeatured;

  columns = COLUMNS

  get items() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.itemsFn(this.instanceKey)
  }

  get instance() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.instanceFn(this.instanceKey)
  }

  get pagination() {
    let sortBy = ''
    let descending = false
    if (this.instance && this.instance.filter && this.instance.filter.sortBy) {
      sortBy = this.instance.filter.sortBy.field
      descending = !this.instance.filter.sortBy.ascending
    }
    const pg = {
      sortBy,
      descending,
      page: this.instance.page,
      rowsPerPage: this.instance.pageSize,
      rowsNumber: this.instance.total
    }
    return pg
  }

  onRequest(props) {
    const {page, rowsPerPage, sortBy, descending} = props.pagination
    const filter = {...this.instance.filter}
    if (sortBy) {
      filter.sortBy = {
        field: sortBy,
        ascending: !descending
      }
    } else {
      filter.sortBy = null
    }
    this.setFilter({
      instanceKey: this.instanceKey,
      filter
    })
    if (page !== this.instance.page) {
      this.setPage({instanceKey: this.instanceKey, page: page})
    }

    if (rowsPerPage !== this.instance.pageSize && rowsPerPage !== 0) {
      this.setPageSize({instanceKey: this.instanceKey, pageSize: rowsPerPage})
    }
  }

  publicationDate(publicationTimestamp) {
    if (publicationTimestamp) {
      return date.formatDate(publicationTimestamp, 'D MMM YYYY,  H:mm:ss')
    } else {
      return ' '
    }
  }

  clearFeatured() {
  }

  setFeatured() {
  }
}
</script>

<style>

</style>
