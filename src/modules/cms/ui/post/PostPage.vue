<template>
  <entity-page narrow
               caption="Post"
               :show-form="!!entityModel"
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
             v-if="entityModel && action === 'create'"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
    </template>
    <template v-slot:default>
      <div class="row">
        <q-input class="col-md-4 col-sm-12 col-xs-12 q-pr-md"
                 v-model="entityModel.id"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="Id"/>
        <q-input class="col-md-8 col-sm-12 col-xs-12 "
                 v-if="blog"
                 v-model="blog.name"
                 readonly
                 label="Blog"/>
      </div>

      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.title"
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
                v-model="entityModel.featured"
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
                  :model-value="entityModel.publicationStatus === 'published'"
                  @update:model-value="updatePublicationStatus"
                  :disable="action === 'view'"
                  label="Published"/>
              </q-field>

              <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
                   style="max-width: 300px">
                <q-input
                  :model-value="formatDate(entityModel.publicationTimestamp)"
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
                          :model-value="formatDate(entityModel.publicationTimestamp)"
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
                          :model-value="formatDate(entityModel.publicationTimestamp)"
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
                  <principal-view-item :principal="entityModel.authorId"/>
                  <q-item-section side v-if="action !=='view'">
                    <q-btn flat round color="primary" size="sm" icon="edit"
                           @click="updateAuthor"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

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
                <q-item v-if="entityModel.targets.length === 0">
                  <q-item-section>
                    <q-item-label caption>
                      Principals not assigned
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-for="principal in entityModel.targets"
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
                     :content="entityModel.introContent"
                     :readonly="action ==='view'"
                     @changeOrder="changeWidgetContentOrder($event, 'intro')"
                     @update="updateWidgetContent($event, 'intro')"
                     @delete="deleteWidgetContent($event, 'intro')"
                     @close="closeIntroContentEditor"/>
      <ContentEditor :show="showPostContentEditor"
                     :content="entityModel.content"
                     :readonly="action ==='view'"
                     @changeOrder="changeWidgetContentOrder($event, 'post')"
                     @update="updateWidgetContent($event, 'post')"
                     @delete="deleteWidgetContent($event, 'post')"
                     @close="closePostContentEditor"/>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref, toRef} from 'vue';
import EntityPage from 'src/shared/components/EntityPage.vue';
import {useStore} from 'src/store';
import {date, uid, useQuasar} from 'quasar';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';
import {
  Blog,
  ChangePostWidgetContentOrderPayloadDto,
  DeletePostWidgetContentPayloadDto,
  Post,
  UpdatePostFeaturedPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto,
  UpdatePostWidgetContentPayloadDto
} from 'src/modules/cms';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {AnnettePrincipal} from 'src/shared';
import {Ref} from '@vue/reactivity';
import ContentEditor from 'src/shared/components/widget-content/editor/ContentEditor.vue';

const NAMESPACE = 'cmsPost';

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

    const idRef = ref()
    const titleRef = ref()

    const tab = ref('general')

    const principalSelectorDialog = ref()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formHasError = (entity?: Post | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      titleRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!titleRef.value.hasError || !!idRef.value.hasError
    }

    const id = toRef(props, 'id')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const personId: Ref<string> = computed(() => store.getters['main/personId'])

    const emptyEntity = () => {
      return {
        id: uid(),
        blogId: id.value || '',
        featured: false,
        authorId: {
          principalType: 'person',
          principalId: personId.value || ''
        },
        title: '',
        introContent: [],
        content: [],
        publicationStatus: 'draft',
      } as Post
    }

    const blog: Ref<Blog | undefined> = ref()

    const onAfterLoad = async (action: string, entity: Post) => {
      const blogs: Blog[] = await store.dispatch('cmsBlog/loadEntitiesIfNotExist', [entity.blogId])
      if (blogs && blogs[0]) {
        blog.value = blogs[0]
      } else {
        blog.value = undefined
      }
    }

    const entityPage = useSyncEntityPage<Post>({
      namespace: NAMESPACE,
      emptyEntity,
      formHasError,
      props,
      onAfterLoad
    })

    const updateTitle = (data: string) => {
      const payload: UpdatePostTitlePayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        title: data
      }
      void entityPage.update(() => {
        return store.dispatch('cmsPost/updateEntityTitle', payload) as Promise<Post>
      })
    }

    const updateAuthor = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const author = await principalSelectorDialog.value.showDialog()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.dispatch('cmsPost/updateEntityAuthor', {
            id: entityPage.id.value,
            authorId: author
          }) as Promise<Post>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value && entityPage.entityModel.value?.authorId) {
        entityPage.entityModel.value.authorId = author
      }
    }

    const updateFeatured = (data: boolean) => {
      const payload: UpdatePostFeaturedPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        featured: data
      }
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.dispatch('cmsPost/updateEntityFeatured', payload) as Promise<Post>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.featured = data
      }
    }

    const updatePublicationStatus = (publish: boolean) => {
      void entityPage.update(() => {
        if (publish) {
          return store.dispatch('cmsPost/publishEntity', entityPage.entityModel.value?.id) as Promise<Post>
        } else {
          return store.dispatch('cmsPost/unpublishEntity', entityPage.entityModel.value?.id) as Promise<Post>
        }
      })
    }

    const formatDate = (timestamp: Date) => {
      return date.formatDate(timestamp, 'YYYY-MM-DD HH:mm')
    }


    const updatePublicationTimestamp = (newTimestamp: string) => {
      const publicationTimestamp = date.extractDate(newTimestamp, 'YYYY-MM-DD HH:mm')
      if (publicationTimestamp.getFullYear() !== 1899) {
        console.log(publicationTimestamp)
        const payload: UpdatePostPublicationTimestampPayloadDto = {
          // @ts-ignore
          id: entityPage.entityModel.value.id,
          // @ts-ignore
          publicationTimestamp: publicationTimestamp
        }
        void entityPage.update(() => {
          return store.dispatch('cmsPost/updateEntityPublicationTimestamp', payload) as Promise<Post>
        })
      } else {
        console.log('error')
      }
    }

    const clearPublicationTimestamp = () => {
      const payload: UpdatePostPublicationTimestampPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value.id,
      }
      void entityPage.update(() => {
        return store.dispatch('cmsPost/updateEntityPublicationTimestamp', payload) as Promise<Post>
      })
    }

    const addPrincipal = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const principal = await principalSelectorDialog.value.showDialog()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.dispatch('cmsPost/assignEntityTargetPrincipal', {
            id: entityPage.id.value,
            principal
          }) as Promise<Post>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value && entityPage.entityModel.value.targets) {
        entityPage.entityModel.value.targets = [...entityPage.entityModel.value.targets, principal]
      }
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
              if (entityPage.action.value === 'edit') {
                await entityPage.update(() => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  return store.dispatch('cmsPost/unassignEntityTargetPrincipal', {
                    id: entityPage.id.value,
                    principal
                  }) as Promise<Post>
                })
              } else if (entityPage.action.value === 'create' && entityPage.entityModel.value && entityPage.entityModel.value.targets) {
                entityPage.entityModel.value.targets = entityPage.entityModel.value.targets.filter(p => p !== principal)
              }
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
    const changeWidgetContentOrder = (data, contentType: string) => {
      const payload: ChangePostWidgetContentOrderPayloadDto = {
        id: entityPage.id.value,
        contentType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContentId: data.widgetContentId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }

      void entityPage.update(() => {
        return store.dispatch('cmsPost/changePostWidgetContentOrder', payload) as Promise<Post>
      })

    }

    // @ts-ignore
    const updateWidgetContent = (data, contentType: string) => {
      const payload: UpdatePostWidgetContentPayloadDto = {
        id: entityPage.id.value,
        contentType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        widgetContent: data.widgetContent,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        order: data.order
      }

      void entityPage.update(() => {
        return store.dispatch('cmsPost/updatePostWidgetContent', payload) as Promise<Post>
      })

    }

// @ts-ignore
    const deleteWidgetContent = (widgetContentId: string, contentType: string) => {
      const payload: DeletePostWidgetContentPayloadDto = {
        id: entityPage.id.value,
        contentType,
        widgetContentId: widgetContentId,
      }
      void entityPage.update(() => {
        return store.dispatch('cmsPost/deletePostWidgetContent', payload) as Promise<Post>
      })

    }

    return {
      idRef,
      titleRef,
      tab,
      blog,
      ...entityPage,
      principalSelectorDialog,
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
      deleteWidgetContent

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
</style>
