<template>
  <entity-page narrow
               :caption=" entityModel && entityModel.type === 'group' ? $t('annette.serviceCatalog.serviceItem.groupTitle') : entityModel && entityModel.type === 'service' ? $t('annette.serviceCatalog.serviceItem.serviceTitle') : $t('annette.serviceCatalog.serviceItem.title') "
               :show-form="!!entityModel"
               :error="error"
               :action="action"
               @clearError="clearError">
    <template v-slot:toolbar>
      <default-entity-page-toolbar :action="action" :id="id"
                                   route-name="serviceCatalog.serviceItem"
                                   :back-label="$t('annette.serviceCatalog.serviceItem.titlePl')"
                                   back-route-name="serviceCatalog.serviceItems"/>
      <q-btn v-if="action === 'edit' && entityModel && entityModel.type === 'service'"
             class="q-mr-md" outline color="primary"
             label="Principals"
             :to="{ name: 'serviceCatalog.servicePrincipals', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view' && entityModel && entityModel.type === 'service'"
             class="q-mr-md" outline color="primary"
             label="Principals"
             :to="{ name: 'serviceCatalog.servicePrincipals', params: { action: 'edit', id } }"/>
    </template>
    <template v-slot:status>
      <q-chip outline square color="red" text-color="white"
              :label="$t('annette.shared.crud.changed')"
              v-if="changed()"/>
      <q-chip outline square color="green" text-color="white"
              :label="$t('annette.shared.crud.saved')"
              v-if="saved && ! changed()"/>
    </template>
    <template v-slot:save-toolbar>
      <div class="row">
        <q-btn v-if="action == 'edit'" outline dense
               class="q-mr-md"
               color="primary"
               :label="$t('annette.shared.crud.cancel')"
               :to="{ name: 'serviceCatalog.serviceItem', params: { action: 'view', id } }"/>
        <q-btn dense
               color="primary"
               :label="$t('annette.shared.crud.save')"
               @click="save"/>
      </div>
    </template>
    <template v-slot:default>
      <div class="row q-pb-md">
        <q-input class="col-md-4 col-sm-12 col-xs-12 "
                 v-model="entityModel.id"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action!=='create'"
                 ref="idRef"
                 :label="$t('annette.serviceCatalog.serviceItem.field.id')"/>
      </div>
      <div class="row q-pb-md">
        <q-input class="col-md-12 col-sm-12 col-xs-12 "
                 v-model="entityModel.name"
                 :rules="[val => !!val || $t('annette.shared.crud.fieldRequired')]"
                 :readonly="action ==='view'"
                 ref="nameRef"
                 :label="$t('annette.serviceCatalog.serviceItem.field.name')"/>
      </div>
      <div class="row q-pb-md">
        <q-input
          class="col-md-12 col-sm-12 col-xs-12 "
          v-model="entityModel.description"
          type="textarea"
          :label="$t('annette.serviceCatalog.serviceItem.field.description')"/>
      </div>
      <div class="row q-pb-md">
        <q-checkbox
          class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
          v-model="entityModel.active"
          disable
          :label="$t('annette.serviceCatalog.serviceItem.field.active')"/>
      </div>
      <div class="row q-pb-md">
        <multi-language-text
          :label="$t('annette.serviceCatalog.serviceItem.field.label')"
          v-model="entityModel.label"
          :readonly="action ==='view'"/>
      </div>

      <div class="row q-pb-md">
        <multi-language-text
          multiline
          :label="$t('annette.serviceCatalog.serviceItem.field.labelDescription')"
          v-model="entityModel.labelDescription"
          :readonly="action ==='view'"/>
      </div>
      <div class="row q-pb-md" v-if="entityModel.type === 'service' ">
        <icon-input v-model="entityModel.icon"
                    :label="$t('annette.serviceCatalog.serviceItem.field.icon')"
                    :readonly="action ==='view'"/>

      </div>
      <div class="row q-pb-md" v-if="entityModel.type === 'service' ">
        <service-link-input v-model="entityModel.link"
                    :label="$t('annette.serviceCatalog.serviceItem.field.link')"
                    :readonly="action ==='view'"/>

      </div>
      <div class="row q-pb-md" v-if="entityModel.type === 'group' ">
        <service-item-list-form v-model="entityModel.children"
                                :label="$t('annette.serviceCatalog.serviceItem.titlePl')"
                                :readonly="action ==='view'"/>
      </div>
    </template>
  </entity-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {defineComponent, ref, toRef} from 'vue';

import {Group,  Service, ServiceItem, useServiceItemStore} from 'src/modules/service-catalog';
import {useEntityPage} from 'src/shared/composables';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import DefaultEntityPageToolbar from 'src/shared/components/crud/DefaultEntityPageToolbar.vue';
import ServiceItemListForm from 'src/modules/service-catalog/ui/scope/components/ServiceItemListForm.vue';
import MultiLanguageText from 'src/shared/components/crud/MultiLanguageText.vue';
import IconInput from 'src/shared/components/crud/IconInput.vue';
import ServiceLinkInput from 'src/modules/service-catalog/ui/item/components/ServiceLinkInput.vue';



export default defineComponent({
  name: 'ServiceItemPage',
  components: {ServiceLinkInput, IconInput, MultiLanguageText, ServiceItemListForm, DefaultEntityPageToolbar, EntityPage},
  props: {
    id: String,
    action: String,
    type: String
  },
  setup(props) {
    const idRef = ref()
    const nameRef = ref()

    const formHasError = (): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      idRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      nameRef.value.validate()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !!nameRef.value.hasError || !!idRef.value.hasError
    }

    const store = useServiceItemStore()
    const type = toRef(props, 'type')

    function emptyEntity(): ServiceItem {
      if (type.value === 'service') {
        return {
          id: '',
          name: '',
          description: '',
          active: true,
          icon: {
            type: 'framework',
            icon: 'fa-solid fa-play'
          },
          label: {},
          labelDescription: {},
          link: {
            url: '',
            openInNew: false,
            type: 'internal',
            applicationId: ''
          },
          type: 'service',
        } as Service
      } else  {
        return {
          id: '',
          name: '',
          description: '',
          active: true,
          icon: {
            type: 'framework',
            icon: 'fa-solid fa-play'
          },
          label: {},
          labelDescription: {},
          type: 'group',
          children: []
        } as Group
      }
    }

    const entityPage = useEntityPage<ServiceItem>({
        store,
        emptyEntity,
        formHasError,
        props
      }
    )

    return {
      idRef,
      nameRef,
      ...entityPage,
    };
  }
});
</script>
