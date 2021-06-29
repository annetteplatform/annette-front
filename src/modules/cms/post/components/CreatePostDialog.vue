<template>
  <q-dialog v-model="show" persistent>
    <q-card v-if="entity && entity.id" style="width: 900px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Create Post</div>
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
                v-model="entity.title"
                label="Title"
              />
            </div>

            <div class="row">
              <space-selector
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.spaceId" label="Space"/>
            </div>

            <div class="row">
              <q-field borderless
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                label="Author" stack-label>
                <principal-field
                  class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                  :principal="entity.authorId"/>
              </q-field>
            </div>

            <div class="row">
              <q-checkbox
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.featured" label="Featured"/>
            </div>

            <div class="row">
              <q-select
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.introContent.type"
                :options="options"
                label="Intro Content Type"
                @input="introContentTypeChange"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-if="entity.introContent.type == 'markdown'"
                v-model="entity.introContent.markdown"
                type="textarea" label="Intro content"/>
              <q-editor
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-else v-model="entity.introContent.html" min-height="5rem"/>
            </div>

            <div class="row">
              <q-select
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entity.content.type"
                :options="options"
                label="Content Type"
                @input="contentTypeChange"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-if="entity.content.type == 'markdown'"
                v-model="entity.content.markdown"
                type="textarea" label="Content"/>
              <q-editor
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-else v-model="entity.content.html" min-height="5rem"/>
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
import {CreatePostPayloadDto} from 'src/store/cms/post/state'
import {uid} from 'quasar'
import PrincipalField from 'src/lib/components/PrincipalField.vue'
import SpaceSelector from 'src/lib/components/cms/SpaceSelector.vue'

const namespace = 'cmsPost'
const appNamespace = 'app'

@Component({
  components: {SpaceSelector, PrincipalField}
})
export default class CreatePostDialog extends Vue {
  show = false
  disableSpaceIdSelection = false

  entity: CreatePostPayloadDto | null = {}

  options = ['markdown', 'html']

  @Getter('profile', {namespace: appNamespace}) profile
  @Action('CreatePost', {namespace}) createPost;

  showDialog(spaceId) {
    if (spaceId) this.disableSpaceIdSelection = true
    this.entity = {
      id: uid(),
      spaceId: spaceId || '',
      featured: false,
      authorId: {
        principalType: 'person',
        principalId: this.profile.id
      },
      title: '',
      introContent: {
        type: 'markdown',
        markdown: ''
      },
      content: {
        type: 'markdown',
        markdown: ''
      }
    }
    this.show = true
  }

  async onOkClick() {
    const createdEntity = await this.createPost(this.entity)
    this.$emit('created', createdEntity)
    this.show = false
  }

  onCancelClick() {
    console.log('onCancelClick')
    this.$emit('cancel')
    this.show = false
  }

  introContentTypeChange(data) {
    if (data === 'markdown') {
      this.entity?.introContent = {
        type: data,
        markdown: this.entity?.introContent.html
      }
    } else {
      this.entity.introContent = {
        type: data,
        html: this.entity?.introContent.markdown
      }
    }
  }

  contentTypeChange(data) {
    if (data === 'markdown') {
      this.entity.content = {
        type: data,
        markdown: this.entity?.content.html
      }
    } else {
      this.entity.content = {
        type: data,
        html: this.entity?.content.markdown
      }
    }
  }
}

</script>
