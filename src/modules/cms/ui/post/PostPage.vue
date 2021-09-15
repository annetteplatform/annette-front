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
                 v-if="space"
                 v-model="space.name"
                 readonly
                 label="Space"/>
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
          <q-tab name="content" label="Content"/>
          <q-tab name="targets" label="Targets" v-if="action !== 'create'"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="general">

            <div class="row q-mt-md">
              <q-checkbox
                class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                v-model="entityModel.featured"
                @update:model-value="updateFeatured"
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
                  label="Published"/>
              </q-field>

              <div class="col-md-6 col-sm-6 col-xs-12 q-pr-md"
                   style="max-width: 300px">
                <q-input
                  :model-value="formatDate(entityModel.publicationTimestamp)"
                  @update:model-value="updatePublicationTimestamp"
                  debounce="1000"
                  label="Publication date"
                >
                  <template v-slot:prepend>
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

                  <template v-slot:append>
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
                            @click="clearPublicationTimestamp"
                    />
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

          <q-tab-panel name="content">

            <div class="row">
              <q-select
                class="col-md-12 col-sm-12 col-xs-12"
                v-model="entityModel.introContent.type"
                :options="contentTypes"
                label="Intro Content Type"
                @update:model-value="introContentTypeChange"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12"
                v-if="entityModel.introContent.type == 'markdown'"
                :model-value="entityModel.introContent.markdown"
                @update:model-value="updateIntroContent"
                debounce="1000"
                type="textarea" label="Intro content"/>
              <q-editor
                class="col-md-12 col-sm-12 col-xs-12 q-mt-md"
                v-else
                :model-value="entityModel.introContent.html"
                @update:model-value="updateIntroContent"
                debounce="1000"
                min-height="10rem"/>
            </div>

            <div class="row q-mt-md">
              <q-select
                class="col-md-12 col-sm-12 col-xs-12"
                v-model="entityModel.content.type"
                :options="contentTypes"
                label="Content Type"
                @update:model-value="contentTypeChange"
              />
            </div>

            <div class="row">
              <q-input
                class="col-md-12 col-sm-12 col-xs-12"
                v-if="entityModel.content.type == 'markdown'"
                :model-value="entityModel.content.markdown"
                @update:model-value="updateContent"
                debounce="1000"
                type="textarea" label="Content"/>
              <q-editor
                class="col-md-12 col-sm-12 col-xs-12 q-mt-md"
                v-else
                :model-value="entityModel.content.html"
                @update:model-value="updateContent"
                debounce="1000"
                min-height="10rem" height="50vh"/>
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
  HtmlContent,
  MarkdownContent,
  Post,
  PostContent,
  Space,
  UpdatePostContentPayloadDto,
  UpdatePostFeaturedPayloadDto,
  UpdatePostIntroPayloadDto,
  UpdatePostPublicationTimestampPayloadDto,
  UpdatePostTitlePayloadDto
} from 'src/modules/cms';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {AnnettePrincipal} from 'src/shared';
import {Ref} from '@vue/reactivity';

const NAMESPACE = 'cmsPost';

export default defineComponent({
  name: 'PostPage',
  components: {PrincipalSelectorDialog, PrincipalViewItem, EntityPage},
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
        spaceId: id.value || '',
        featured: false,
        authorId: {
          principalType: 'person',
          principalId: personId.value || ''
        },
        title: '',
        introContent: {
          type: 'markdown',
          markdown: ''
        } as MarkdownContent,
        content: {
          type: 'markdown',
          markdown: ''
        } as MarkdownContent,
        publicationStatus: 'draft',
      } as Post
    }

    const space: Ref<Space | undefined> = ref()

    const onAfterLoad = async (action: string, entity: Post) => {
      const spaces: Space[] = await store.dispatch('cmsSpace/loadEntitiesIfNotExist', [entity.spaceId])
      if (spaces && spaces[0]) {
        space.value = spaces[0]
      } else {
        space.value = undefined
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

    const contentTypes = ['markdown', 'html']

    const introContentTypeChange = (data: string) => {
      let introContent: PostContent
      if (data === 'markdown') {
        introContent = {
          type: data,
          // @ts-ignore
          markdown: (entityPage.entityModel.value.introContent as HtmlContent).html
        } as MarkdownContent
      } else {
        introContent = {
          type: data,
          // @ts-ignore
          html: (entityPage.entityModel.value.introContent as MarkdownContent).markdown
        } as HtmlContent
      }
      if (entityPage.action.value === 'edit') {
        const payload: UpdatePostIntroPayloadDto = {
          // @ts-ignore
          id: entityPage.entityModel.value.id,
          introContent
        }
        void entityPage.update(() => {
          return store.dispatch('cmsPost/updateEntityIntro', payload) as Promise<Post>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.introContent = introContent
      }
    }

    const updateIntroContent = (contentData: string) => {
      // @ts-ignore
      const type = entityPage.entityModel.value.introContent.type
      let introContent: PostContent
      if (type === 'markdown') {
        introContent = {
          type,
          markdown: contentData
        } as MarkdownContent
      } else {
        introContent = {
          type,
          html: contentData
        } as HtmlContent
      }
      if (entityPage.action.value === 'edit') {
        const payload: UpdatePostIntroPayloadDto = {
          // @ts-ignore
          id: entityPage.entityModel.value.id,
          introContent
        }
        void entityPage.update(() => {
          return store.dispatch('cmsPost/updateEntityIntro', payload) as Promise<Post>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.introContent = introContent
      }
    }

    const contentTypeChange = (data: string) => {
      let content: PostContent
      if (data === 'markdown') {
        content = {
          type: data,
          // @ts-ignore
          markdown: (entityPage.entityModel.value.content as HtmlContent).html
        } as MarkdownContent
      } else {
        content = {
          type: data,
          // @ts-ignore
          html: (entityPage.entityModel.value.content as MarkdownContent).markdown
        } as HtmlContent
      }
      if (entityPage.action.value === 'edit') {
        const payload: UpdatePostContentPayloadDto = {
          // @ts-ignore
          id: entityPage.entityModel.value.id,
          content
        }
        void entityPage.update(() => {
          return store.dispatch('cmsPost/updateEntityContent', payload) as Promise<Post>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.content = content
      }
    }

    const updateContent = (contentData: string) => {
      // @ts-ignore
      const type = entityPage.entityModel.value.content.type
      let content: PostContent
      if (type === 'markdown') {
        content = {
          type,
          markdown: contentData
        } as MarkdownContent
      } else {
        content = {
          type,
          html: contentData
        } as HtmlContent
      }
      if (entityPage.action.value === 'edit') {
        const payload: UpdatePostContentPayloadDto = {
          // @ts-ignore
          id: entityPage.entityModel.value.id,
          content
        }
        void entityPage.update(() => {
          return store.dispatch('cmsPost/updateEntityContent', payload) as Promise<Post>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.content = content
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

    return {
      idRef,
      titleRef,
      tab,
      space,
      ...entityPage,
      principalSelectorDialog,
      updateTitle,
      updateAuthor,
      updateFeatured,
      updatePublicationStatus,
      updatePublicationTimestamp,
      clearPublicationTimestamp,
      contentTypes,
      introContentTypeChange,
      updateIntroContent,
      contentTypeChange,
      updateContent,
      formatDate,
      addPrincipal,
      deletePrincipal
    };
  }
});
</script>
