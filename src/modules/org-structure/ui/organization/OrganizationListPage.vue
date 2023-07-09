<template>
  <entity-list-page narrow
                    :caption="$t('annette.orgStructure.organization.titlePl')"
                    :message="instance.message"
                    @closeMessage="closeMessage">
    <template v-slot:toolbar>
      <default-list-page-toolbar @refresh="refreshList"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form
        :filter="instance.filter"
        @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <organization-list
        :instance-key="instanceKey">
        <template v-slot:toolbar>
          <q-space/>
          <q-btn color="primary" outline flat
                 :label="$t('annette.shared.crud.create')"
                 @click="createOrg()"/>
          <create-org-item-dialog ref="createOrgItemDialog"/>
        </template>
      </organization-list>
    </template>
  </entity-list-page>
</template>


<script lang="ts">
import {useEntityListPage} from 'src/shared/composables/entity-list-page';
import EntityListPage from 'src/shared/components/crud/EntityListPage.vue';
import SimpleFilterForm from 'src/shared/components/crud/SimpleFilterForm.vue';
import OrganizationList from './components/OrganizationList.vue';
import {defineComponent, ref} from 'vue';
import DefaultListPageToolbar from 'src/shared/components/crud/DefaultListPageToolbar.vue';
import {emptyOrganizationFilter, OrgItemFilter, useOrgItemStore} from 'src/modules/org-structure';
import CreateOrgItemDialog from 'src/modules/org-structure/ui/organization/components/CreateOrgItemDialog.vue';

export default defineComponent({
  name: 'OrganizationListPage',
  components: {
    CreateOrgItemDialog,
    DefaultListPageToolbar,
    OrganizationList, SimpleFilterForm, EntityListPage},
  setup() {

    const instanceKey = 'orgItems'
    const store = useOrgItemStore()

    const emptyFilter = emptyOrganizationFilter
    const entityListPage = useEntityListPage<OrgItemFilter>({
      store,
      instanceKey,
      filter: emptyFilter()
    })

    const createOrgItemDialog = ref()

    const createOrg = () =>  {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      createOrgItemDialog.value.showDialog('org')
    }

    return {
      ...entityListPage,
      emptyFilter,
      createOrgItemDialog,
      createOrg
    };
  }
});
</script>
