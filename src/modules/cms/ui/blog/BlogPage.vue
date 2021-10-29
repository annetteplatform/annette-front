<template>
  <entity-page narrow
               caption="Blog"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Blogs"
             :to="{name: 'cms.blogs'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'cms.blog', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'cms.blog', params: { action: 'edit', id}}"/>
      <q-btn color="primary"
             v-if="entityModel && action === 'create'"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
    </template>
    <template v-slot:default>
      <div class="row">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.id"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action!=='create'"
                 ref="idRef"
                 label="Id"/>
      </div>
      <div class="row">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 @update:model-value="updateName"
                 debounce="700"
                 :rules="[val => !!val || 'Field is required']"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 label="Name"/>
      </div>

      <div class="row">
        <blog-category-selector v-model="entityModel.categoryId"
                                @update:model-value="updateCategoryId"
                                :readonly="action ==='view'"/>
      </div>
      <div class="row">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12"
          v-model="entityModel.description"
          @update:model-value="updateDescription"
          debounce="700"
          label="Description"
          type="textarea"
          :readonly="action === 'view'"
        />
      </div>

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
              <principal-selector-dialog ref="principalSelectorDialog"/>
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
              <q-btn flat round color="red" size="sm" icon="fas fa-trash"
                     @click="deletePrincipal(principal)"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import EntityPage from 'src/shared/components/EntityPage.vue';
import BlogCategorySelector from 'src/modules/cms/ui/blog-category/components/BlogCategorySelector.vue';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';
import {
  Blog,
  UpdateBlogCategoryPayloadDto,
  UpdateBlogDescriptionPayloadDto,
  UpdateBlogNamePayloadDto
} from 'src/modules/cms';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {AnnettePrincipal} from 'src/shared';

function emptyEntity(): Blog {
  return {
    id: '',
    name: '',
    description: '',
    active: true,
    categoryId: '',
    targets: [],
  }
}

const NAMESPACE = 'cmsBlog';

export default defineComponent({
  name: 'BlogPage',
  components: {PrincipalSelectorDialog, PrincipalViewItem, EntityPage, BlogCategorySelector},
  props: {
    id: String,
    action: String
  },
  setup(props) {

    const store = useStore()
    const quasar = useQuasar()

    const idRef = ref()
    const nameRef = ref()

    const principalSelectorDialog = ref()

    const formHasError = (entity?: Blog | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError ||
        !!(entity && (entity.categoryId === '' || entity.categoryId === null || entity.categoryId === undefined))
    }

    const entityPage = useSyncEntityPage<Blog>({
      namespace: NAMESPACE,
      emptyEntity,
      formHasError,
      props,
    })

    const updateName = (data: string) => {
      const payload: UpdateBlogNamePayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        name: data
      }
      void entityPage.update(() => {
        return store.dispatch('cmsBlog/updateEntityName', payload) as Promise<Blog>
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateBlogDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.dispatch('cmsBlog/updateEntityDescription', payload) as Promise<Blog>
      })
    }

    const updateCategoryId = (data: string) => {
      const payload: UpdateBlogCategoryPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value.id,
        categoryId: data
      }
      void entityPage.update(() => {
        return store.dispatch('cmsBlog/updateEntityCategoryId', payload) as Promise<Blog>
      })
    }


    const addPrincipal = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const principal = await principalSelectorDialog.value.showDialog()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.dispatch('cmsBlog/assignEntityTargetPrincipal', {
            id: entityPage.id.value,
            principal
          }) as Promise<Blog>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
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
                  return store.dispatch('cmsBlog/unassignEntityTargetPrincipal', {
                    id: entityPage.id.value,
                    principal
                  }) as Promise<Blog>
                })
              } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
                entityPage.entityModel.value.targets = entityPage.entityModel.value.targets.filter(p => p !== principal)
              }
            }
          }
        ]
      })
    }

    return {
      idRef,
      nameRef,
      ...entityPage,
      updateName,
      updateDescription,
      updateCategoryId,
      principalSelectorDialog,
      addPrincipal,
      deletePrincipal

    };
  }
});
</script>
