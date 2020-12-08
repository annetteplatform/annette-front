<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6" v-if="type == 'org'">Create organization</div>
        <div class="text-h6" v-if="type == 'unit'">Create organizational unit</div>
        <div class="text-h6" v-if="type == 'position'">Create organizational position</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md full-width ">

          <div class="q-gutter-md" v-if="entity">

            <div class="row">
              <q-input
                class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.id"
                label="Id"
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

            <div class="row" v-if="type === 'position'">
              <q-input
                class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.limit"
                type="number"
                label="Person assignment limit"
              />
            </div>

            <div class="row">
              <org-category-selector
                :type="type"
                label="Organization category"
                v-model="entity.categoryId"
                :readonly="false"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section align="right">
        <q-btn flat label="Cancel" color="primary" @click="onCancelClick"/>
        <q-btn label="Create" color="primary" @click="onOkClick"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import OrgCategorySelector from 'src/modules/org-structure/components/org-category/OrgCategorySelector.vue'
import {Action} from 'vuex-class'
import {
  CreateOrganizationPayloadDto,
  CreatePositionPayloadDto,
  CreateUnitPayloadDto
} from 'src/store/org-structure/org-hierarchy/state'

const namespace = 'orgItem'

@Component({
  components: {OrgCategorySelector}
})
export default class CreateOrgItemDialog extends Vue {
  @Prop() show
  @Prop() type
  @Prop() parentId
  @Prop() orgId

  @Action('CreateOrganization', {namespace: namespace}) createOrganization;
  @Action('CreateUnit', {namespace: namespace}) createUnit;
  @Action('CreatePosition', {namespace: namespace}) createPosition;

  entity = {
    id: '',
    name: '',
    shortName: '',
    limit: '1',
    categoryId: ''
  }

  @Watch('show', {immediate: true})
  onShowChange() {
    this.entity = {
      id: '',
      name: '',
      shortName: '',
      limit: '1',
      categoryId: ''
    }
  }

  async onOkClick() {
    console.log('onOkClick')
    if (this.type === 'org') {
      const entity: CreateOrganizationPayloadDto = {
        orgId: this.entity.id,
        name: this.entity.name,
        shortName: this.entity.shortName,
        categoryId: this.entity.categoryId
      }
      const createdEntity = await this.createOrganization(entity)
      this.$emit('created', createdEntity)
    } else if (this.type === 'unit') {
      const entity: CreateUnitPayloadDto = {
        orgId: this.orgId,
        parentId: this.parentId,
        unitId: this.entity.id,
        name: this.entity.name,
        shortName: this.entity.shortName,
        categoryId: this.entity.categoryId
      }
      const entities = await this.createUnit(entity)
      this.$emit('created', {
        parent: entities[entity.parentId],
        child: entities[entity.unitId]
      })
    } else {
      const entity: CreatePositionPayloadDto = {
        orgId: this.orgId,
        parentId: this.parentId,
        positionId: this.entity.id,
        name: this.entity.name,
        shortName: this.entity.shortName,
        limit: parseInt(this.entity.limit),
        categoryId: this.entity.categoryId
      }
      const entities = await this.createPosition(entity)
      this.$emit('created', {
        parent: entities[entity.parentId],
        child: entities[entity.positionId]
      })
    }
  }

  onCancelClick() {
    console.log('onCancelClick')
    this.$emit('cancel')
  }
}

</script>
