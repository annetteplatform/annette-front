<template>
  <entity-page narrow
               caption="Principal Group"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Groups"
             :to="{name: 'principalGroup.groups'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'principalGroup.group', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'principalGroup.group', params: { action: 'edit', id}}"/>
      <q-btn color="primary"
             v-if="entityModel && action === 'create'"
             label="Save"
             @click="save"/>
    </template>
    <template v-slot:status>
      <q-chip outline square color="red" text-color="white" label="Changed"
              v-if="changed()"/>
      <q-chip outline square color="green" text-color="white" label="Saved"
              v-if="saved && ! changed()"/>
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
import {defineComponent, ref} from 'vue';

import {AnnettePrincipal, useEntityPage} from 'src/shared';
import EntityPage from 'src/shared/components/EntityPage.vue';
import {
  PrincipalGroup, principalGroupService, UpdatePrincipalGroupCategoryDto,
  UpdatePrincipalGroupDescriptionDto,
  UpdatePrincipalGroupNameDto
} from 'src/modules/principal-group';
import PrincipalGroupCategorySelector
  from 'src/modules/principal-group/category/components/PrincipalGroupCategorySelector.vue';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import {Ref} from '@vue/reactivity';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';

function emptyEntity(): PrincipalGroup {
  return {
    id: '',
    name: '',
    description: '',
    categoryId: '',
  }
}

const NAMESPACE = 'principalGroup';

export default defineComponent({
  name: 'PrincipalGroupPage',
  components: {PrincipalSelectorDialog, PrincipalViewItem, EntityPage, PrincipalGroupCategorySelector},
  props: {
    id: String,
    action: String
  },
  setup(props) {

    const store = useStore()
    const quasar = useQuasar()

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

    const principals: Ref<AnnettePrincipal[]> = ref([])
    const principalSelectorDialog = ref()

    const loadAssignments = async (action: string, id: string) => {
      principals.value = await principalGroupService.getAssignments(id)
    }

    const entityPage = useEntityPage<PrincipalGroup>({
      namespace: NAMESPACE,
      emptyEntity,
      formHasError,
      props,
      onBeforeLoad: loadAssignments
    })

    const showErrorNotification = (message: string) => {
      quasar.notify({
        type: 'negative',
        message,
        actions: [
          {label: 'Close', color: 'white'},
        ]
      })
    }

    const updateName = (data: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entityPage.action.value === 'edit') {
        const payload: UpdatePrincipalGroupNameDto = {
          // @ts-ignore
          id: entityPage.entityModel.value?.id,
          name: data
        }
        store.dispatch('principalGroup/updateEntityName', payload)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
          .then(entity => {
            entityPage.entityModel.value = {...entity}
            entityPage.originEntity.value = {...entity}
            entityPage.saved.value = true
          })
          .catch(failure => {
            console.error(failure)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            showErrorNotification(failure.code)
          })
      }
    }

    const updateDescription = (data: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entityPage.action.value === 'edit') {
        const payload: UpdatePrincipalGroupDescriptionDto = {
          // @ts-ignore
          id: entityPage.entityModel.value?.id,
          description: data
        }
        store.dispatch('principalGroup/updateEntityDescription', payload)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
          .then(entity => {
            entityPage.entityModel.value = {...entity}
            entityPage.originEntity.value = {...entity}
            entityPage.saved.value = true
          })
          .catch(failure => {
            console.error(failure)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            showErrorNotification(failure.code)
          })
      }
    }

    const updateCategory = (data: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entityPage.action.value === 'edit') {
        const payload: UpdatePrincipalGroupCategoryDto = {
          // @ts-ignore
          id: entityPage.entityModel.value.id,
          categoryId: data
        }
        store.dispatch('principalGroup/updateEntityCategory', payload)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
          .then(entity => {
            entityPage.entityModel.value = {...entity}
            entityPage.originEntity.value = {...entity}
            entityPage.saved.value = true
          })
          .catch(failure => {
            console.error(failure)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            showErrorNotification(failure.code)
          })
      }
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
              principals.value = principals.value.filter( p => p !== principal)
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

    };
  }
});
</script>
