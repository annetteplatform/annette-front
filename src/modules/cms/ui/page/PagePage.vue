<template>
  <entity-page narrow
               :caption="$t('annette.cms.page.title')"
               :show-form="!!page"
               :error="error"
               :action="action"
               :hide-status-bar="action != 'create' "
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="cms.page"
                                   :back-label="$t('annette.cms.page.titlePl')"
                                   back-route-name="cms.pages"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'cms.page', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
    </template>

    <template v-slot:default>
      <div class="row">
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                 :model-value="page.id"
                 @update:model-value="updateId"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="Id"/>
        <q-input class="col-md-4 col-sm-12 col-xs-12"
                 :model-value="state.spaceName"
                 readonly
                 label="Space"/>
      </div>

      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 :model-value="page.title"
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

            <div class="row q-mt-md" v-if="action !== 'create'">
              <q-field
                class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
                label="Publication Status"
                stack-label
                borderless>

                <q-checkbox
                  :model-value="page.publicationStatus === 'published'"
                  @update:model-value="updatePublicationStatus"
                  :disable="action === 'view'"
                  label="Published"/>
              </q-field>

              <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
                   style="max-width: 300px">
                <q-input
                  :model-value="formatDate(page.publicationTimestamp)"
                  @update:model-value="updatePublicationTimestamp"
                  :readonly="action === 'view'"
                  debounce="1000"
                  label="Publication date"
                  stack-label
                >
                  <template v-slot:prepend
                            v-if="action !== 'view'">
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date
                          :model-value="formatDate(page.publicationTimestamp)"
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
                          :model-value="formatDate(page.publicationTimestamp)"
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
                  <principal-view-item :principal="page.authorId"/>
                  <principal-selector-dialog ref="principalSelectorDialog"/>
                  <q-item-section side v-if="action !=='view'">
                    <q-btn flat round color="primary" size="sm" icon="edit"
                           @click="updateAuthor"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="row q-mt-md q-col-gutter-sm"
                 v-if="action !== 'create'">

              <div class="col-12 ">
                <q-btn class="full-width" color="primary" label="Page Content"
                       :to="{name: 'cms.page-content', params: { action, id }}"/>
              </div>
            </div>

          </q-tab-panel>

          <q-tab-panel name="media" v-if="action !== 'create'">
            <q-uploader style="width: 450px"
                        flat bordered
                        :url="`/api/annette/v1/cms/uploadPageFile/${page.id}/media`"
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
                        :url="`/api/annette/v1/cms/uploadPageFile/${page.id}/doc`"
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
              <principal-list-input :principals="page.targets"
                                    @add-principal="addTarget"
                                    @delete-principal="deleteTarget"
                                    :readonly="action === 'view'"
                                    :label="$t('annette.cms.page.field.targets')"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>


    </template>
  </entity-page>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, ref, toRef, watch} from 'vue';

import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {AnnetteError, AnnettePrincipal} from 'src/shared/model';
import PrincipalListInput from 'src/shared/components/crud/PrincipalListInput.vue';
import {
  FileDescriptor,
  InitPageEditorPayload,
  Page, PageEditor, RemoveFilePayload, toAction,
  usePageStore
} from 'src/modules/cms';
import {date, openURL, useQuasar} from 'quasar';
import {useRoute, useRouter} from 'vue-router';
import {useAuthStore} from 'src/main';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrincipalSelectorDialog.vue';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';


export default defineComponent({
  name: 'PagePage',
  components: {
    PrincipalViewItem,
    PrincipalSelectorDialog,
    PrincipalListInput,
    DefaultEntityPageToolbar, EntityPage
  },
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const store = usePageStore()
    const authStore = useAuthStore()
    const quasar = useQuasar()
    const route = useRoute()
    const router = useRouter()

    const idRef = ref()
    const titleRef = ref()

    const tab = ref('general')
    const principalSelectorDialog = ref()

    const formHasError = (): boolean => {
      idRef.value.validate()
      titleRef.value.validate()
      return !!titleRef.value.hasError || !!idRef.value.hasError
    }

    const id = toRef(props, 'id')
    const action = toRef(props, 'action')
    const prevProps = ref('')

    const state: Ref<PageEditor> = computed(() => store.editor)
    const page: Ref<Page> = computed(() => store.editor.page)
    const error: Ref<AnnetteError | null> = ref(null)

    // *********************************************

    const loadEntity = () => {
      const payload: InitPageEditorPayload = {
        action: toAction(action.value as string),
        id: id.value as string,
        spaceId: action.value === 'create' ? id.value : undefined,
        personId: action.value === 'create' ? authStore.profile.id : undefined,
      }
      console.log('loadEntity')
      console.log(payload)
      void store.initPageEditor(payload)
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
          const entity = await store.createEditorPage()
          void router.push({
            // @ts-ignore
            name: route.name,
            params: {...route.params, action: 'edit', id: entity.id},
            query: route.query
          })
          void store.refreshAll()
        } catch (ex) {
          // @ts-ignore
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
      const payload: RemoveFilePayload = {
        id: id.value as string,
        file,
      }
      await store.removePageFile(payload)
    }

    const fileUploaded = (info: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const file = JSON.parse(info.xhr.response) as FileDescriptor
      store.editorFileUploaded(file)
      if (file.fileType === 'doc') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        docUploaderRef.value.removeUploadedFiles()
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        mediaUploaderRef.value.removeUploadedFiles()
      }
    }

    const downloadFile = (file: FileDescriptor) => {
      openURL(`/api/annette/v1/cms/file/${file.objectId}/${file.fileType}/${file.fileId}`)
    }

    const updateId = (data: string) => {
      void store.updateEditorId(data)
    }

    const updateTitle = async (data: string) => {
      void await store.updateEditorTitle(data)
    }

    const updateAuthor = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const author = await principalSelectorDialog.value.showDialog()
      void await store.updateEditorAuthor(author)
    }

    const updatePublicationStatus = async (data: boolean) => {
      void await store.updateEditorPublicationStatus(data)
    }

    const formatDate = (timestamp: Date) => {
      return date.formatDate(timestamp, 'YYYY-MM-DD HH:mm')
    }

    const updatePublicationTimestamp = async (newTimestamp: string) => {
      const publicationTimestamp = date.extractDate(newTimestamp, 'YYYY-MM-DD HH:mm')
      if (publicationTimestamp.getFullYear() !== 1899) {
        void await store.updateEditorPublicationTimestamp(publicationTimestamp)
      } else {
        console.log('error')
      }
    }

    const clearPublicationTimestamp = async () => {
      void await store.updateEditorPublicationTimestamp(undefined)
    }

    const addTarget = async (principal: AnnettePrincipal) => {
      await store.assignEditorTargetPrincipal(principal)
    }


    const deleteTarget = async (principal: AnnettePrincipal) => {
      await store.unassignEditorTargetPrincipal(principal)
    }

    return {
      idRef,
      titleRef,
      tab,

      page,
      state,

      save,
      error,
      clearError,

      principalSelectorDialog,
      updateId,
      updateTitle,
      updateAuthor,
      updatePublicationStatus,
      updatePublicationTimestamp,
      clearPublicationTimestamp,
      formatDate,
      addTarget,
      deleteTarget,

      mediaUploaderRef,
      docUploaderRef,
      fileUploaded,
      deleteFile,
      downloadFile,

    }
  }
})
</script>


<style>

.image-card {
  width: 100%;
  max-width: 235px;
}
</style>
