<template>
  <entity-page narrow
               caption="Post"
               :show-form="!!post"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Posts"
             :to="{name: 'cms.posts'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'cms.post', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'cms.post', params: { action: 'edit', id}}"/>
      <q-btn color="primary"
             v-if="post && action === 'create'"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
    </template>
    <template v-slot:default>
      <div class="row">
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                 :model-value="post.id"
                 @update:model-value="updateId"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="Id"/>
        <q-input class="col-md-8 col-sm-12 col-xs-12 "
                 v-if="state.blogName"
                 :model-value="state.blogName"
                 readonly
                 label="Blog"/>
      </div>

      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 :model-value="post.title"
                 @update:model-value="updateTitle"
                 debounce="700"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action ==='view'"
                 ref="titleRef"
                 label="Title"/>
      </div>
      <q-card flat bordered>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="general" label="General"/>
          <q-tab name="media" label="Media" v-if="action !== 'create'"/>
          <q-tab name="docs" label="Docs" v-if="action !== 'create'"/>
          <q-tab name="targets" label="Targets" v-if="action !== 'create'"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="general">

            <div class="row q-mt-md q-col-gutter-sm"
                 v-if="action !== 'create'">
              <div class="col-6 ">
                <q-btn class="full-width" color="primary" label="Intro Content" @click="openIntroContentEditor"/>
              </div>
              <div class="col-6 ">
                <q-btn class="full-width" color="primary" label="Post Content" @click="openPostContentEditor"/>
              </div>
            </div>

            <div class="row q-mt-md">
              <q-checkbox
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                :model-value="post.featured"
                @update:model-value="updateFeatured"
                :disable="action === 'view'"
                label="Featured"/>
            </div>

            <div class="row q-mt-md" v-if="action !== 'create'">
              <q-field
                class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
                label="Publication Status"
                stack-label
                borderless>

                <q-checkbox
                  :model-value="post.publicationStatus === 'published'"
                  @update:model-value="updatePublicationStatus"
                  :disable="action === 'view'"
                  label="Published"/>
              </q-field>

              <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
                   style="max-width: 300px">
                <q-input
                  :model-value="formatDate(post.publicationTimestamp)"
                  @update:model-value="updatePublicationTimestamp"
                  :readonly="action === 'view'"
                  debounce="1000"
                  label="Publication date"
                >
                  <template v-slot:prepend
                            v-if="action !== 'view'">
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date
                          :model-value="formatDate(post.publicationTimestamp)"
                          @update:model-value="updatePublicationTimestamp"
                          debounce="1000"
                          mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append
                            v-if="action !== 'view'">
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time
                          :model-value="formatDate(post.publicationTimestamp)"
                          @update:model-value="updatePublicationTimestamp"
                          debounce="1000"
                          mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                    <q-icon name="clear" class="cursor-pointer"
                            @click="clearPublicationTimestamp"/>
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row q-mt-md">
              <q-list bordered class="full-width" separator>
                <q-item>
                  <q-item-section>
                    Author
                  </q-item-section>

                </q-item>
                <q-item>
                  <principal-view-item :principal="post.authorId"/>
                  <q-item-section side v-if="action !=='view'">
                    <q-btn flat round color="primary" size="sm" icon="edit"
                           @click="updateAuthor"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

          </q-tab-panel>

          <q-tab-panel name="media" v-if="action !== 'create'">
            <q-uploader style="width: 450px"
                        flat bordered
                        :url="`/api/annette/v1/cms/uploadPostFile/${post.id}/media`"
                        label="Upload media"
                        @uploaded="fileUploaded"
                        multiple
                        ref="mediaUploaderRef"
            />

            <div class="q-pt-md row items-start q-gutter-md">
              <q-card v-for="file in state.files.media" :key="file.fileId" class="image-card" flat bordered>
                <q-card-section>
                <q-avatar v-if="file.contentType.includes('video')"
                          class="full-width"
                          style="height:160px;"
                          text-color="grey"
                          font-size="64px"
                          icon="videocam"
                />

                <q-img v-else style="height:160px;" class="full-width"
                       fit="scale-down"
                       :src="`/api/annette/v1/cms/file/${file.objectId}/media/${file.fileId}`"/>
                </q-card-section>
                <q-card-section>
                  <q-item-label caption lines="1">{{ file.filename }}</q-item-label>
                  <q-tooltip>
                    {{ file.filename }}
                  </q-tooltip>
                </q-card-section>
                <q-separator/>
                <q-card-actions align="right" v-if="action === 'edit'">
                  <q-btn flat round color="negative" size="sm" icon="fas fa-trash" @click="deleteFile(file)"/>
                </q-card-actions>
              </q-card>

            </div>

          </q-tab-panel>

          <q-tab-panel name="docs" v-if="action !== 'create'">
            <q-uploader style="width: 450px"
                        flat bordered
                        :url="`/api/annette/v1/cms/uploadPostFile/${post.id}/doc`"
                        label="Upload documents"
                        @uploaded="fileUploaded"
                        multiple
                        ref="docUploaderRef"
            />
            <q-list class="q-mt-md">
              <q-item v-for="file in state.files.docs" :key="file.fileId">
                <q-item-section>
                  <q-item-label>{{ file.filename }}</q-item-label>
                  <q-item-label caption lines="2">{{ file.contentType }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <div>

                    <q-btn flat round color="primary" size="sm" icon="fa fa-download"
                           @click="downloadFile(file)"/>
                    <q-btn flat round color="negative" size="sm" icon="fas fa-trash"
                           v-if="action === 'edit'"
                           @click="deleteFile(file)"/>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>


          <q-tab-panel name="targets" v-if="action !== 'create'">
            <div class="row q-mt-md">
              <q-list bordered class="full-width" separator>
                <q-item>
                  <q-item-section>
                    Principals
                  </q-item-section>
                  <q-item-section avatar>
                    <q-btn class="float-left" round dense flat color="primary"
                           icon="add"
                           v-if="action !=='view'"
                           @click="addPrincipal"
                    />
                  </q-item-section>
                </q-item>
                <q-item v-if="post.targets.length === 0">
                  <q-item-section>
                    <q-item-label caption>
                      Principals not assigned
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-for="principal in post.targets"
                  :key="principal">
                  <principal-view-item :principal="principal"/>
                  <q-item-section side v-if="action !=='view'">
                    <q-btn flat round color="negative" size="sm" icon="fas fa-trash"
                           @click="deletePrincipal(principal)"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <principal-selector-dialog ref="principalSelectorDialog"/>
      <ContentEditor :show="showIntroContentEditor"
                     :content="post.introContent"
                     :readonly="action ==='view'"
                     @changeOrder="changeWidgetContentOrder($event, 'intro')"
                     @update="updateWidgetContent($event, 'intro')"
                     @delete="deleteWidgetContent($event, 'intro')"
                     @close="closeIntroContentEditor"
                     :media="state.files.media"
                     :docs="state.files.docs"
      />
      <ContentEditor :show="showPostContentEditor"
                     :content="post.content"
                     :readonly="action ==='view'"
                     @changeOrder="changeWidgetContentOrder($event, 'post')"
                     @update="updateWidgetContent($event, 'post')"
                     @delete="deleteWidgetContent($event, 'post')"
                     @close="closePostContentEditor"
                     :media="state.files.media"
                     :docs="state.files.docs"
      />
    </template>
  </entity-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRef, watch} from 'vue';
import EntityPage from 'src/shared/components/EntityPage.vue';
import {useStore} from 'src/store';
import {date, openURL, useQuasar} from 'quasar';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';
import {
  ChangePostWidgetContentOrderPayloadDto,
  DeletePostWidgetContentPayloadDto,
  FileDescriptor,
  Post,
  UpdatePostWidgetContentPayloadDto
} from 'src/modules/cms';
import {AnnetteError, AnnettePrincipal} from 'src/shared';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/shared/components/widget-content/editor/ContentEditor.vue';
import {DeleteFilePayload, InitPayload, PostEditState, toAction} from 'src/modules/cms/store/post-edit';
import {useRoute, useRouter} from 'vue-router';

export default defineComponent({
  name: 'PostPage',
  components: {PrincipalSelectorDialog, PrincipalViewItem, EntityPage, ContentEditor},
  props: {
    id: String,
    action: String
  },
  setup(props) {

    const store = useStore()
    const quasar = useQuasar()
    const route = useRoute()
    const router = useRouter()

    const idRef = ref()
    const titleRef = ref()

    const tab = ref('general')

    const principalSelectorDialog = ref()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formHasError = (): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      titleRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!titleRef.value.hasError || !!idRef.value.hasError
    }

    const id = toRef(props, 'id')
    const action = toRef(props, 'action')
    const prevProps = ref('')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const personId: Ref<string> = computed(() => store.getters['main/personId'])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const state: Ref<PostEditState> = computed(() => store.getters['cmsPostEdit/state'])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const post: Ref<Post> = computed(() => store.getters['cmsPostEdit/post'])
    const error: Ref<AnnetteError | null> = ref(null)

    // *********************************************

    const loadEntity =() => {
      const payload: InitPayload = {
        action: toAction(action.value as string),
        id: id.value as string,
        blogId: action.value === 'create' ? id.value : undefined,
        personId: action.value === 'create' ? personId.value : undefined,
      }
      console.log('loadEntity')
      console.log(payload)
      void store.dispatch('cmsPostEdit/init', payload)
    }

    const save = async () => {
      if (formHasError()) {
        quasar.notify({
          color: 'negative',
          message: 'Form validation failed'
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } else if (action.value === 'create') {
        try {
          const entity = await store.dispatch('cmsPostEdit/save')

          void router.push({
            // @ts-ignore
            name: route.name,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            params: {...route.params, action: 'edit', id: entity.id},
            query: route.query
          })
        } catch (ex) {
          error.value = ex
        }
      }
    }

    const clearError = () => {
      error.value = null
    }

    const watcher = () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-member-access
      const newProps = `${action.value}/${id.value}`
      if (prevProps.value !== newProps) {
        loadEntity()
      }
      prevProps.value = newProps
    }

    void loadEntity()
    watch(id, watcher)
    watch(action, watcher)

    const mediaUploaderRef = ref()
    const docUploaderRef = ref()

    const deleteFile = async (file: FileDescriptor) => {
      const payload: DeleteFilePayload = {
        id: id.value as string,
        file,
      }
      await store.dispatch('cmsPostEdit/deleteFile', payload)
    }

    const fileUploaded = (info: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const file = JSON.parse(info.xhr.response) as FileDescriptor
      store.commit('fileUploaded', file)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      docUploaderRef.value.removeUploadedFiles()
    }

    const downloadFile = (file: FileDescriptor) => {
      openURL(`/api/annette/v1/cms/file/${file.objectId}/${file.fileType}/${file.fileId}`)
    }

    const updateId = async (data: string) => {
      void store.commit('cmsPostEdit/updateId', data)
    }

    const updateTitle = async (data: string) => {
      void await store.dispatch('cmsPostEdit/updateTitle', data)
    }

    const updateAuthor = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const author = await principalSelectorDialog.value.showDialog()
      void await store.dispatch('cmsPostEdit/updateAuthor', author)
    }

    const updateFeatured = async (data: boolean) => {
      void await store.dispatch('cmsPostEdit/updateFeatured', data)
    }

    const updatePublicationStatus = async(data: boolean) => {
      void await store.dispatch('cmsPostEdit/updatePublicationStatus', data)
    }


    const formatDate = (timestamp: Date) => {
      return date.formatDate(timestamp, 'YYYY-MM-DD HH:mm')
    }


    const updatePublicationTimestamp = async  (newTimestamp: string) => {
      const publicationTimestamp = date.extractDate(newTimestamp, 'YYYY-MM-DD HH:mm')
      if (publicationTimestamp.getFullYear() !== 1899) {
        void await store.dispatch('cmsPostEdit/updatePublicationTimestamp', publicationTimestamp)
      } else {
        console.log('error')
      }
    }

    const clearPublicationTimestamp = async () => {
      void await store.dispatch('cmsPostEdit/updatePublicationTimestamp', undefined)
    }

    const addPrincipal = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const principal = await principalSelectorDialog.value.showDialog()
      await store.dispatch('cmsPostEdit/assignTargetPrincipal', principal)
    }


    const deletePrincipal = (principal: AnnettePrincipal) => {
      quasar.notify({
        type: 'negative',
        message: 'Please confirm delete principal',
        actions: [
          {label: 'Cancel', color: 'white'},
          {
            label: 'Delete',
            color: 'white',
            handler: async () => {
              await store.dispatch('cmsPostEdit/unassignTargetPrincipal', principal)
            }
          }
        ]
      })
    }

    const showIntroContentEditor = ref(false)

    const openIntroContentEditor = () => {
      showIntroContentEditor.value = true
    }
    const closeIntroContentEditor = () => {
      showIntroContentEditor.value = false
    }

    const showPostContentEditor = ref(false)

    const openPostContentEditor = () => {
      showPostContentEditor.value = true
    }
    const closePostContentEditor = () => {
      showPostContentEditor.value = false
    }

    // @ts-ignore
    const changeWidgetContentOrder = async (data, contentType: string) => {
      const payload: ChangePostWidgetContentOrderPayloadDto = {
        id: id.value as string,
        contentType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContentId: data.widgetContentId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPostEdit/changeWidgetContentOrder', payload)
    }

    // @ts-ignore
    const updateWidgetContent = async (data, contentType: string) => {
      const payload: UpdatePostWidgetContentPayloadDto = {
        id: id.value as string,
        contentType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContent: data.widgetContent,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }
      await store.dispatch('cmsPostEdit/updateWidgetContent', payload)

    }

    const deleteWidgetContent = async(widgetContentId: string, contentType: string) => {
      const payload: DeletePostWidgetContentPayloadDto = {
        id: id.value as string,
        contentType,
        widgetContentId: widgetContentId,
      }
      await store.dispatch('cmsPostEdit/deleteWidgetContent', payload)
    }

    return {
      idRef,
      titleRef,
      tab,

      post,
      state,

      save,
      error,
      clearError,

      principalSelectorDialog,
      updateId,
      updateTitle,
      updateAuthor,
      updateFeatured,
      updatePublicationStatus,
      updatePublicationTimestamp,
      clearPublicationTimestamp,
      formatDate,
      addPrincipal,
      deletePrincipal,
      showIntroContentEditor,
      openIntroContentEditor,
      closeIntroContentEditor,
      showPostContentEditor,
      openPostContentEditor,
      closePostContentEditor,
      changeWidgetContentOrder,
      updateWidgetContent,
      deleteWidgetContent,

      mediaUploaderRef,
      docUploaderRef,
      fileUploaded,
      deleteFile,
      downloadFile,




    };
  }
});
</script>

<style>
.markdown textarea {
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.image-card {
  width: 100%;
  max-width: 235px;
}
</style>
