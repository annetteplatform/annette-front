<template>
  <entity-page narrow
               caption="Space"
               :show-form="!!entityModel"
               :error="error"
               @clearError="clearError">
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Groups"
             :to="{name: 'cms.spaces'}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'edit'"
             label="View"
             :to="{name: 'cms.space', params: { action: 'view', id}}"/>
      <q-btn class="q-mr-md" outline color="primary"
             v-if="action === 'view'"
             label="Edit"
             :to="{name: 'cms.space', params: { action: 'edit', id}}"/>
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
        <q-select class="col-md-12 col-sm-12 col-xs-12"
                  v-model="entityModel.spaceType"
                  :options="spaceTypes"
                  :readonly="action !== 'create'"
                  option-value="id"
                  option-label="name"
                  map-options
                  label="Space Type"/>
      </div>
      <div class="row">
        <space-category-selector v-model="entityModel.categoryId"
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
import {computed, defineComponent, ref} from 'vue';
import EntityPage from 'src/shared/components/EntityPage.vue';
import SpaceCategorySelector from 'src/modules/cms/ui/category/components/SpaceCategorySelector.vue';
import {useStore} from 'src/store';
import {useQuasar} from 'quasar';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';
import {
  Space,
  UpdateSpaceCategoryPayloadDto,
  UpdateSpaceDescriptionPayloadDto,
  UpdateSpaceNamePayloadDto
} from 'src/modules/cms';
import {useSyncEntityPage} from 'src/shared/composables/sync-entity-page';
import {AnnettePrincipal} from 'src/shared';

function emptyEntity(): Space {
  return {
    id: '',
    name: '',
    description: '',
    spaceType: 'blog',
    active: true,
    categoryId: '',
    targets: [],
  }
}

const NAMESPACE = 'cmsSpace';

export default defineComponent({
  name: 'SpacePage',
  components: {PrincipalSelectorDialog, PrincipalViewItem, EntityPage, SpaceCategorySelector},
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

    const formHasError = (entity?: Space | null): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError ||
        !!(entity && (entity.categoryId === '' || entity.categoryId === null || entity.categoryId === undefined))
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const spaceTypes = computed(() => store.getters['cmsSpace/spaceTypes'])


    const entityPage = useSyncEntityPage<Space>({
      namespace: NAMESPACE,
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
        return store.dispatch('cmsSpace/updateEntityName', payload) as Promise<Space>
      })
    }

    const updateDescription = (data: string) => {
      const payload: UpdateSpaceDescriptionPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value?.id,
        description: data
      }
      void entityPage.update(() => {
        return store.dispatch('cmsSpace/updateEntityDescription', payload) as Promise<Space>
      })
    }

    const updateCategory = (data: string) => {
      const payload: UpdateSpaceCategoryPayloadDto = {
        // @ts-ignore
        id: entityPage.entityModel.value.id,
        categoryId: data
      }
      void entityPage.update(() => {
        return store.dispatch('cmsSpace/updateEntityCategory', payload) as Promise<Space>
      })
    }


    const addPrincipal = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const principal = await principalSelectorDialog.value.showDialog()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entityPage.action.value === 'edit') {
        void entityPage.update(() => {
          return store.dispatch('cmsSpace/assignEntityTargetPrincipal', {
            id: entityPage.id.value,
            principal
          }) as Promise<Space>
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
                  return store.dispatch('cmsSpace/unassignEntityTargetPrincipal', {
                    id: entityPage.id.value,
                    principal
                  }) as Promise<Space>
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
      spaceTypes,
      updateName,
      updateDescription,
      updateCategory,
      principalSelectorDialog,
      addPrincipal,
      deletePrincipal

    };
  }
});
</script>
