<template>
  <entity-page narrow
               :caption="$t('annette.principalGroup.group.title')"
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               :hide-status-bar="action != 'create' "
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="principalGroup.group"
                                   :back-label="$t('annette.principalGroup.group.titlePl')"
                                   back-route-name="principalGroup.groups"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'principalGroup.group', params: { action: 'view', id } }"/>
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
                 :label="$t('annette.principalGroup.group.field.id')"/>
      </div>
      <div class="row q-pb-sm ">
        <q-input class="col-md-12 col-sm-12 col-xs-12 q-pr-md" stack-label dense
                 v-model="entityModel.name"
                 @update:model-value="updateName"
                 debounce="700"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 :label="$t('annette.principalGroup.group.field.name')"/>
      </div>

      <div class="row q-pb-sm">
        <principal-group-category-selector v-model="entityModel.categoryId"
                                           @update:model-value="updateCategory"
                                           :readonly="action ==='view'"
                                           :label="$t('annette.principalGroup.group.field.categoryId')"/>
      </div>

      <div class="row">
        <q-input autogrow
                 class="col-md-12 col-sm-12 col-xs-12"
                 v-model="entityModel.description"
                 @update:model-value="updateDescription"
                 debounce="700"
                 :label="$t('annette.principalGroup.group.field.description')"
                 type="textarea"
                 :readonly="action === 'view'"
        />
      </div>

      <div class="row q-mt-md" v-if="action !=='create'">
        <principal-list-input :principals="principals"
                              @add-principal="addPrincipal"
                              @delete-principal="deletePrincipal"
                              :readonly="action === 'view'"
                              :label="$t('annette.principalGroup.group.field.principals')"
        />
      </div>

    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {defineComponent, Ref, ref} from 'vue';

import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {
  PrincipalGroup,
  principalGroupService,
  UpdatePrincipalGroupCategoryDto,
  UpdatePrincipalGroupDescriptionDto, UpdatePrincipalGroupNameDto
} from 'src/modules/principal-group';
import {usePrincipalGroupStore} from 'src/modules/principal-group/data/principal-group.store';
import {AnnettePrincipal} from 'src/shared/model';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import PrincipalGroupCategorySelector
  from 'src/modules/principal-group/ui/category/components/PrincipalGroupCategorySelector.vue';
import PrincipalListInput from 'src/shared/components/crud/PrincipalListInput.vue';

function emptyEntity(): PrincipalGroup {
  return {
    id: '',
    name: '',
    description: '',
    categoryId: '',
  }
}

export default defineComponent({
  name: 'PrincipalGroupPage',
  components: {
    PrincipalListInput,
    PrincipalGroupCategorySelector, DefaultEntityPageToolbar, EntityPage
  },
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const idRef = ref()
    const nameRef = ref()

    const formHasError = (entity?: PrincipalGroup | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError ||
        !!(entity && (entity.categoryId === '' || entity.categoryId === null || entity.categoryId === undefined))
    }

    const store = usePrincipalGroupStore()

    const principals: Ref<AnnettePrincipal[]> = ref([])

    const loadAssignments = async (action: string, id: string) => {
      principals.value = await principalGroupService.getAssignments(id)
    }

    const entityPage = useSyncEntityPage<PrincipalGroup>({
      store,
      emptyEntity,
      formHasError,
      props,
      onBeforeLoad: loadAssignments
    })


    const updateName = (data: string) => {
      const payload: UpdatePrincipalGroupNameDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        name: data
      }
      void entityPage.update(() => {
        return store.updateEntityName(payload)
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdatePrincipalGroupDescriptionDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.updateEntityDescription(payload)
      })
    }

    const updateCategory = (data: string) => {
      const payload: UpdatePrincipalGroupCategoryDto = {
        // @ts-ignore
        id: entityPage.entityModel.value.id,
        categoryId: data
      }
      void entityPage.update(() => {
        return store.updateEntityCategoryId(payload)
      })
    }


    const addPrincipal = async (principal: AnnettePrincipal) => {
      await principalGroupService.assignPrincipal({id: entityPage.id.value, principal})
      principals.value = [...principals.value, principal]
    }


    const deletePrincipal = async (principal: AnnettePrincipal) => {
      await principalGroupService.unassignPrincipal({id: entityPage.id.value, principal})
      principals.value = principals.value.filter(p => p !== principal)
    }

    return {
      idRef,
      nameRef,
      ...entityPage,
      updateName,
      updateDescription,
      updateCategory,
      principals,
      addPrincipal,
      deletePrincipal
    }
  }
})
</script>
