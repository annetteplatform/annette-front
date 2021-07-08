<template>
  <q-dialog v-model="show" persistent>
    <q-card v-if="entity && entity.id" style="width: 900px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Create Space</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md full-width ">

          <div class="q-gutter-md" v-if="entity">

            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.id"
                label="Id"
              />
            </div>
            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.name"
                label="Title"
              />
            </div>

            <div class="row">
              <q-select
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.spaceType"
                :options="spaceTypes"
                label="Space Type"
              />
            </div>

            <div class="row">
              <space-category-selector
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.categoryId" label="Category"/>
            </div>

            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.description"
                type="textarea" label="Description"/>
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
import {Component, Vue} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {uid} from 'quasar'
import PrincipalField from 'src/lib/components/PrincipalField.vue'
import {CreateSpacePayloadDto} from 'src/store/cms/space/state'
import SpaceCategorySelector from 'src/lib/components/cms/SpaceCategorySelector.vue'

const namespace = 'cmsSpace'
const appNamespace = 'app'

@Component({
  components: {SpaceCategorySelector, PrincipalField}
})
export default class CreateSpaceDialog extends Vue {
  show = false

  entity: CreateSpacePayloadDto | null = {}

  spaceTypes = ['blog', 'wiki']

  @Getter('profile', {namespace: appNamespace}) profile
  @Action('CreateSpace', {namespace}) createSpace;

  showDialog() {
    this.entity = {
      id: uid(),
      name: '',
      description: '',
      spaceType: 'blog',
      categoryId: '',
      targets: []
    }
    this.show = true
  }

  async onOkClick() {
    const createdEntity = await this.createSpace(this.entity)
    this.$emit('created', createdEntity)
    this.show = false
  }

  onCancelClick() {
    console.log('onCancelClick')
    this.$emit('cancel')
    this.show = false
  }
}

</script>
