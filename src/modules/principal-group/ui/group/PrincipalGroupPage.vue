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

      <div class="row q-mt-md" v-if="action !=='create'">
        <q-list bordered class="full-width" separator>
          <q-item>
            <q-item-section>
              Principals
            </q-item-section>
            <q-item-section avatar>
              <q-btn class="float-left" round dense flat color="primary"
                     icon="add"
                     v-if="action ==='edit'"
                     @click="addPrincipal"
              />
              <principal-selector-dialog ref="principalSelectorDialog"/>
            </q-item-section>
          </q-item>
          <q-item v-if="principals.length === 0">
            <q-item-section>
              <q-item-label caption>
                Principals not assigned
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="principal in principals"
            :key="principal">
            <principal-view-item :principal="principal"/>
            <q-item-section side v-if="action =='edit'">
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
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {computed, defineComponent, Ref, ref} from 'vue';

import {useQuasar} from 'quasar';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import {useI18n} from 'vue-i18n';
import AttributesForm from 'src/shared/components/attributes/AttributesForm.vue';
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
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';

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
    PrincipalViewItem,
    PrincipalSelectorDialog,
    PrincipalGroupCategorySelector, AttributesForm, DefaultEntityPageToolbar, EntityPage
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
    const quasar = useQuasar()
    const i18n = useI18n()

    const principals: Ref<AnnettePrincipal[]> = ref([])
    const principalSelectorDialog = ref()

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


    const addPrincipal = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const principal = await principalSelectorDialog.value.showDialog()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      await principalGroupService.assignPrincipal({id: entityPage.id.value, principal})
      principals.value = [...principals.value, principal]
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
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              await principalGroupService.unassignPrincipal({id: entityPage.id.value, principal})
              principals.value = principals.value.filter(p => p !== principal)
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
      updateCategory,
      principals,
      principalSelectorDialog,
      addPrincipal,
      deletePrincipal
    }
  }
})
</script>
