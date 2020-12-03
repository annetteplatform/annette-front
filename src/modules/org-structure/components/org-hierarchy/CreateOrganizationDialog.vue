<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Create organization</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md full-width ">

          <div class="q-gutter-md" v-if="entity">

            <div class="row">
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.orgId"
                label="Organization ID"
              />
            </div>
            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.name"
                label="Name"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.shortName"
                label="Short name"
              />
            </div>

            <div class="row">
              <org-category-selector
                type="org"
                label="Organization category"
                v-model="entity.categoryId"
                readonly="false"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section align="right">
        <q-btn flat label="Cancel" color="primary" @click="onCancelClick" />
        <q-btn  label="Create" color="primary" @click="onOkClick" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { CreateOrganizationPayloadDto } from 'src/store/org-structure/org-hierarchy/state'
import OrgCategorySelector from 'src/modules/org-structure/components/org-category/OrgCategorySelector.vue'

@Component({
  components: { OrgCategorySelector }
})
export default class CreateOrganizationDialog extends Vue {
  @Prop() show

  entity: CreateOrganizationPayloadDto = {
    orgId: '',
    name: '',
    shortName: '',
    categoryId: ''
  }

  @Watch('show', { immediate: true })
  onShowChange () {
    console.log('onShowChange')
    this.entity = {
      orgId: '',
      name: '',
      shortName: '',
      categoryId: ''
    }
  }

  onOkClick () {
    console.log('onOkClick')
    this.$emit('ok', this.entity)
  }

  onCancelClick () {
    console.log('onCancelClick')
    this.$emit('cancel')
  }
}

</script>
