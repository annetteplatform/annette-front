<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6" v-if="type == 'org'">Create organization</div>
        <div class="text-h6" v-if="type == 'unit'">Create organizational unit</div>
        <div class="text-h6" v-if="type == 'position'">Create organizational position</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md full-width ">

          <div class="q-gutter-md" v-if="entityModel">

            <div class="row" v-if="orgId">
              <q-input stack-label
                       class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
                       v-model="orgId"
                       label="Org. Id"
                       readonly/>
              <q-input stack-label
                       class="col-md-6 col-sm-12 col-xs-12 "
                       v-model="entityModel.id"
                       label="Item Id"
                       :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"/>
            </div>
            <div class="row" v-else>
              <q-input stack-label
                       class="col-md-6 col-sm-12 col-xs-12 "
                       v-model="entityModel.id"
                       label="Org. Id"/>
            </div>
            <div class="row">
              <q-input stack-label
                       class="col-md-12 col-sm-12 col-xs-12 "
                       v-model="entityModel.name"
                       label="Name"
              />
            </div>


            <div class="row" v-if="type === 'position'">
              <q-input stack-label
                       class="col-md-12 col-sm-12 col-xs-12"
                       v-model="entityModel.limit"
                       type="number"
                       label="Person assignment limit"
              />
            </div>

            <div class="row">
              <org-category-selector
                :type="type"
                label="Organizational category"
                v-model="entityModel.categoryId"
                :readonly="false"
              />
            </div>

            <div class="row">
              <q-input stack-label
                       class="col-md-12 col-sm-12 col-xs-12"
                       v-model="entityModel.source"
                       label="Source"
              />
            </div>
            <div class="row">
              <q-input stack-label
                       class="col-md-12 col-sm-12 col-xs-12 "
                       v-model="entityModel.externalId"
                       label="External Id"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section align="right">
        <q-btn flat label="Cancel" color="primary" @click="onCancelClick"/>
        <q-btn class="q-ml-md" label="Create" color="primary" @click="onOkClick"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {
  CreateOrganizationPayloadDto,
  CreatePositionPayloadDto,
  CreateUnitPayloadDto,
  extractOrg,
  OrgItem, useOrgItemStore
} from 'src/modules/org-structure';
import {Ref} from '@vue/reactivity';
import {useQuasar} from 'quasar';
import OrgCategorySelector from 'src/modules/org-structure/ui/category/components/OrgCategorySelector.vue';
import {OnCreatedEvent} from 'src/modules/org-structure/ui/organization/components/on-created-event';


export default defineComponent({
  name: 'CreateOrgItemDialog',
  components: {OrgCategorySelector},
  props: {},
  setup(props, {emit}) {

    const quasar = useQuasar()
    const store = useOrgItemStore()

    const show = ref(false)
    const type = ref('')
    const parentId = ref('')
    const orgId = ref()
    const entityModel: Ref<OrgItem> = ref({
      itemType: '',
      parentId: '',
      id: '',
      name: '',
      // @ts-ignore
      limit: '1',
      categoryId: '',
      source: '',
      externalId: ''
    })

    const showDialog = (typeVal: string, parentIdVal?: string) => {
      show.value = true
      type.value = typeVal
      parentId.value = parentIdVal || ''
      orgId.value = parentIdVal ? extractOrg(parentIdVal) : ''
      entityModel.value = {
        itemType: '',
        parentId: '',
        id: '',
        name: '',
        // @ts-ignore
        limit: '1',
        categoryId: '',
        source: '',
        externalId: ''
      }
    }

    const showErrorNotification = (message: string) => {
      quasar.notify({
        type: 'negative',
        message,
        actions: [
          {label: 'Close', color: 'white'},
        ]
      })
    }

    const onOkClick = async () => {
      console.log('onOkClick')
      if (entityModel.value.id.trim() != '' &&  entityModel.value.categoryId != '') {
        if (type.value === 'org') {
          const entity: CreateOrganizationPayloadDto = {
            orgId: entityModel.value.id,
            name: entityModel.value.name,
            categoryId: entityModel.value.categoryId,
            source: entityModel.value.source || undefined,
            externalId: entityModel.value.externalId || undefined
          }
          try {
            const createdEntity = await store.createOrganization(entity)
            emit('created', createdEntity)
            show.value = false
          } catch (ex: any) {
            console.error(ex)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            showErrorNotification(ex.code)
          }
        } else if (type.value === 'unit') {
          const orgId = extractOrg(parentId.value)
          const entity: CreateUnitPayloadDto = {
            parentId: parentId.value,
            unitId: `${orgId}:${entityModel.value.id}`,
            name: entityModel.value.name,
            categoryId: entityModel.value.categoryId,
            source: entityModel.value.source || undefined,
            externalId: entityModel.value.externalId || undefined
          }
          let entities: OrgItem[]
          try {
            entities = await store.createUnit(entity)
          } catch (ex: any) {
            console.error(ex)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            showErrorNotification(ex.code)
            return
          }
          const event: OnCreatedEvent = {
            // @ts-ignore
            parent: {...entities.find(e => e.id === entity.parentId)},
            // @ts-ignore
            child: {...entities.find(e => e.id === entity.unitId)}
          }
          emit('created', event)
          show.value = false
        } else {
          const orgId = extractOrg(parentId.value)
          const entity: CreatePositionPayloadDto = {
            parentId: parentId.value,
            positionId: `${orgId}:${entityModel.value.id}`,
            name: entityModel.value.name,
            // @ts-ignore
            limit: parseInt(entityModel.value.limit),
            categoryId: entityModel.value.categoryId,
            source: entityModel.value.source || undefined,
            externalId: entityModel.value.externalId || undefined
          }
          let entities: OrgItem[]
          try {
            entities = await store.createPosition(entity)
          } catch (ex: any) {
            console.error(ex)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            showErrorNotification(ex.code)
            return
          }
          const event: OnCreatedEvent = {
            // @ts-ignore
            parent: {...entities.find(e => e.id === entity.parentId)},
            // @ts-ignore
            child: {...entities.find(e => e.id === entity.positionId)}
          }
          emit('created', event)
          show.value = false
        }
      }
    }


    const onCancelClick = () => {
      show.value = false
    }

    return {
      show,
      type,
      parentId,
      orgId,
      entityModel,
      showDialog,
      onOkClick,
      onCancelClick,
    };
  }
});
</script>
