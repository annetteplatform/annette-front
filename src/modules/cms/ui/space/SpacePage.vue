<template>
  <entity-page narrow
               :caption="$t('annette.cms.space.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               :hide-status-bar="action != 'create' "
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="cms.space"
                                   :back-label="$t('annette.cms.space.titlePl')"
                                   back-route-name="cms.spaces"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'cms.space', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
    </template>

    <template v-slot:default>
      <div class="row q-pb-md ">
        <q-input class="col-md-4 col-sm-12 col-xs-12 " stack-label dense
                 v-model="entityModel.id"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action!=='create'"
                 ref="idRef"
                 :label="$t('annette.cms.space.field.id')"/>
      </div>
      <div class="row q-pb-sm ">
        <q-input class="col-md-12 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                 v-model="entityModel.name"
                 @update:model-value="updateName"
                 debounce="700"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 :label="$t('annette.cms.space.field.name')"/>
      </div>
      <div class="row q-pb-sm">
        <q-input autogrow
                 class="col-md-12 col-sm-12 col-xs-12"
                 v-model="entityModel.description"
                 @update:model-value="updateDescription"
                 debounce="700"
                 :label="$t('annette.cms.space.field.description')"
                 type="textarea"
                 :readonly="action === 'view'"
        />
      </div>

      <div class="row q-pb-sm">
        <space-category-selector v-model="entityModel.categoryId"
                                @update:model-value="updateCategory"
                                :readonly="action ==='view'"
                                :label="$t('annette.cms.space.field.categoryId')"/>
      </div>
      <div class="row q-pb-md">
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.active"
          disable
          :label="$t('annette.serviceCatalog.scope.field.active')"/>
      </div>



      <div class="row q-mt-md" >
        <principal-list-input :principals="entityModel.authors"
                              @add-principal="addAuthor"
                              @delete-principal="deleteAuthor"
                              :readonly="action === 'view'"
                              :label="$t('annette.cms.space.field.authors')"
        />
      </div>

      <div class="row q-mt-md" >
        <principal-list-input :principals="entityModel.targets"
                              @add-principal="addTarget"
                              @delete-principal="deleteTarget"
                              :readonly="action === 'view'"
                              :label="$t('annette.cms.space.field.targets')"
        />
      </div>

    </template>
  </entity-page>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';

import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {AnnettePrincipal} from 'src/shared/model';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import PrincipalListInput from 'src/shared/components/crud/PrincipalListInput.vue';
import {
  Space,
  UpdateSpaceCategoryPayloadDto,
  UpdateSpaceDescriptionPayloadDto,
  UpdateSpaceNamePayloadDto,
  useSpaceStore
} from 'src/modules/cms';
import SpaceCategorySelector from 'src/modules/cms/ui/space-category/components/SpaceCategorySelector.vue';

function emptyEntity(): Space {
  return {
    id: '',
    name: '',
    description: '',
    categoryId: '',
    active: true,
    authors: [],
    targets: [],
  }
}

export default defineComponent({
  name: 'SpacePage',
  components: {
    PrincipalListInput,
    SpaceCategorySelector, DefaultEntityPageToolbar, EntityPage
  },
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const idRef = ref()
    const nameRef = ref()

    const formHasError = (entity?: Space | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError ||
        !!(entity && (entity.categoryId === '' || entity.categoryId === null || entity.categoryId === undefined))
    }

    const store = useSpaceStore()

    const principals: Ref<AnnettePrincipal[]> = ref([])

    const entityPage = useSyncEntityPage<Space>({
      store,
      emptyEntity,
      formHasError,
      props,
    })


    const updateName = (data: string) => {
      const payload: UpdateSpaceNamePayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        name: data
      }
      void entityPage.update(() => {
        return store.updateEntityName(payload)
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateSpaceDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.updateEntityDescription(payload)
      })
    }

    const updateCategory = (data: string) => {
      const payload: UpdateSpaceCategoryPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value.id,
        categoryId: data
      }
      void entityPage.update(() => {
        return store.updateEntityCategoryId(payload)
      })
    }


    const addAuthor = async (principal: AnnettePrincipal) => {
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.assignEntityAuthorPrincipal({
            id: entityPage.id.value,
            principal
          }) as Promise<Space>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.authors = [...entityPage.entityModel.value.authors, principal]
      }
    }


    const deleteAuthor = async (principal: AnnettePrincipal) => {
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.unassignEntityAuthorPrincipal({
            id: entityPage.id.value,
            principal
          }) as Promise<Space>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.authors = entityPage.entityModel.value.authors.filter(p => p !== principal)
      }
    }

    const addTarget = async (principal: AnnettePrincipal) => {
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.assignEntityTargetPrincipal({
            id: entityPage.id.value,
            principal
          }) as Promise<Space>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.targets = [...entityPage.entityModel.value.targets, principal]
      }
    }


    const deleteTarget = async (principal: AnnettePrincipal) => {
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.unassignEntityTargetPrincipal({
            id: entityPage.id.value,
            principal
          }) as Promise<Space>
        })
      } else if (entityPage.action.value === 'create' && entityPage.entityModel.value) {
        entityPage.entityModel.value.targets = entityPage.entityModel.value.targets.filter(p => p !== principal)
      }
    }

    return {
      idRef,
      nameRef,
      ...entityPage,
      updateName,
      updateDescription,
      updateCategory,
      principals,
      addAuthor,
      deleteAuthor,
      addTarget,
      deleteTarget,
    }
  }
})
</script>
