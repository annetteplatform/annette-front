<template>
  <q-card v-if="entity && entity.id" flat bordered class="q-mb-md">

    <q-card-section>
      <div v-if="spaces[entity.spaceId]" class="text-overline q-mb-xs">{{ spaces[entity.spaceId].name }}</div>
      <div class="text-h4">{{ entity.title }}</div>
    </q-card-section>

    <q-card-section>
      <div class="q-pa-md full-width ">

        <div class="q-gutter-md">

          <div class="row">
            <q-input
              class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
              v-model="entity.id"
              label="Id"
              readonly
            />
          </div>
          <div class="row">
            <q-input
              class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
              :value="entity.title"
              @input="updateTitle"
              debounce="1000"
              label="Title"
            />
          </div>

          <div v- class="row">
            <person-selector v-if="entity.authorId.principalType === 'person'"
                             :value="entity.authorId.principalId"
                             @input="updateAuthor"
            />
            <q-field v-else borderless
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
              :value="entity.featured"
              @input="updateFeatured"
              label="Featured"/>
          </div>

          <div class="row">
            <q-field
              class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
              label="Publication Status"
              stack-label
              borderless>

              <q-checkbox
                :value="entity.publicationStatus === 'published'"
                @input="updatePublicationStatus"
                label="Published"/>
            </q-field>

            <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
                 style="max-width: 300px">
              <q-input
                :value="formatDate(entity.publicationTimestamp)"
                @input="updatePublicationTimestamp"
                debounce="1000"
                label="Publication date"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-date
                        :value="formatDate(entity.publicationTimestamp)"
                        @input="updatePublicationTimestamp"
                        debounce="1000"
                        mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time
                        :value="formatDate(entity.publicationTimestamp)"
                        @input="updatePublicationTimestamp"
                        debounce="1000"
                        mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat/>
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                  <q-icon name="clear" class="cursor-pointer"
                          @click="clearPublicationTimestamp"
                  />
                </template>
              </q-input>
            </div>
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
              :value="entity.introContent.markdown"
              @input="updateIntroContent"
              debounce="1000"
              type="textarea" label="Intro content"/>
            <q-editor
              class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
              v-else
              :value="entity.introContent.html"
              @input="updateIntroContent"
              debounce="1000"
              min-height="10rem"/>
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
              :value="entity.content.markdown"
              @input="updateContent"
              debounce="1000"
              type="textarea" label="Content"/>
            <q-editor
              v-else
              class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
              :value="entity.content.html"
              @input="updateContent"
              debounce="1000"
              min-height="5rem" height="50vh"/>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <updated-fields
        :updated-at="entity.updatedAt"
        :updated-by="entity.updatedBy"/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import PrincipalField from 'src/lib/components/PrincipalField.vue'
import {Action, Getter} from 'vuex-class'
import PostStatusLine from './PostStatusLine.vue'
import UpdatedFields from 'src/lib/components/UpdatedFields.vue'
import PostContentView from 'src/modules/cms/view/post/components/PostContentView.vue'
import {Post, PostContent} from 'src/store/cms/post/state'
import SpaceSelector from 'src/lib/components/cms/SpaceSelector.vue'
import {date} from 'quasar'
import PersonField from 'src/lib/components/persons/PersonField.vue'
import PersonSelector from 'src/lib/components/persons/PersonSelector.vue'

const namespace = 'cmsSpace'

@Component({
  components: {
    PersonSelector,
    PersonField,
    SpaceSelector,
    UpdatedFields,
    PostStatusLine,
    PrincipalField,
    PostContentView
  }
})
export default class PostEditCard extends Vue {
  // @ts-ignore
  @Prop() id
  entity: Post | null = {}

  options = ['markdown', 'html']

  @Getter('entities', {namespace}) entities;
  @Action('GetSpaceForEdit', {namespace}) getSpaceForEdit;

  @Watch('id', {immediate: true})
  onIdChanged(id) {
    console.log(id)
    if (id) {
      this.getSpaceForEdit(id).then(entity => {
        this.entity = {...entity}
      })
    }
  }

  async updateTitle(newTitle) {
    const entity = await this.updatePostTitle({
      id: this.entity.id,
      title: newTitle
    })
    this.entity = {...entity}
  }

  async updateAuthor(personId) {
    const entity = await this.updatePostAuthor({
      id: this.entity.id,
      authorId: {
        principalType: 'person',
        principalId: personId
      }
    })
    this.entity = {...entity}
  }

  async introContentTypeChange(data) {
    let introContent: PostContent = null
    if (data === 'markdown') {
      introContent = {
        type: data,
        markdown: this.entity?.introContent.html
      }
    } else {
      introContent = {
        type: data,
        html: this.entity?.introContent.markdown
      }
    }
    const entity = await this.updatePostIntro({
      id: this.entity.id,
      introContent
    })
    this.entity = {...entity}
  }

  async contentTypeChange(data) {
    let content: PostContent = null
    if (data === 'markdown') {
      content = {
        type: data,
        markdown: this.entity?.content.html
      }
    } else {
      content = {
        type: data,
        html: this.entity?.content.markdown
      }
    }
    const entity = await this.updatePostContent({
      id: this.entity.id,
      content
    })
    this.entity = {...entity}
  }

  async updateIntroContent(contentData) {
    let introContent: PostContent = null
    if (this.entity.introContent.type === 'markdown') {
      introContent = {
        type: this.entity.introContent.type,
        markdown: contentData
      }
    } else {
      introContent = {
        type: this.entity.introContent.type,
        html: contentData
      }
    }
    const entity = await this.updatePostIntro({
      id: this.entity.id,
      introContent
    })
    this.entity = {...entity}
  }

  async updateContent(contentData) {
    let content: PostContent = null
    if (this.entity.content.type === 'markdown') {
      content = {
        type: this.entity.content.type,
        markdown: contentData
      }
    } else {
      content = {
        type: this.entity.content.type,
        html: contentData
      }
    }
    const entity = await this.updatePostContent({
      id: this.entity.id,
      content
    })
    this.entity = {...entity}
  }

  async updateFeatured() {
    const entity = await this.updatePostFeatured({
      id: this.entity.id,
      featured: !this.entity?.featured
    })
    this.entity = {...entity}
  }

  async updatePublicationStatus(publish) {
    if (publish) {
      const entity = await this.publishPost(this.entity.id)
      this.entity = {...entity}
    } else {
      const entity = await this.unpublishPost(this.entity.id)
      this.entity = {...entity}
    }
  }

  formatDate(timestamp) {
    return date.formatDate(timestamp, 'YYYY-MM-DD HH:mm')
  }

  async updatePublicationTimestamp(newTimestamp) {
    const publicationTimestamp = date.extractDate(newTimestamp, 'YYYY-MM-DD HH:mm')
    if (publicationTimestamp.getFullYear() !== 1899) {
      console.log(publicationTimestamp)
      const entity = await this.updatePostPublicationTimestamp({
        id: this.entity.id,
        publicationTimestamp: publicationTimestamp
      })
      this.entity = {...entity}
    } else {
      console.log('error')
    }
  }

  async clearPublicationTimestamp() {
    const entity = await this.updatePostPublicationTimestamp({
      id: this.entity.id
    })
    this.entity = {...entity}
  }
}
</script>

<style>

</style>
