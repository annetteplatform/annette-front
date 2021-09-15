<template>
  <entity-list-page narrow caption="Organizations" :namespace="namespace" :instance-key="instanceKey" >
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Refresh"
             @click="refreshList"/>
      <q-btn color="primary"
             label="Create"
             @click="createOrg()"/>
      <create-org-item-dialog ref="createOrgItemDialog"/>
    </template>
    <template v-slot:filter>
      <simple-filter-form class="q-mb-md"
                          :filter="instance.filter"
                          :empty-filter="emptyFilter"
                          @filterChanged="onFilterChanged"/>
    </template>
    <template v-slot:default>
      <organization-list class="q-mb-md"
                     :instance-key="instanceKey"/>
    </template>
  </entity-list-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useEntityListPage} from 'src/shared';
import OrganizationList from './components/OrganizationList.vue';
import SimpleFilterForm from 'src/shared/components/SimpleFilterForm.vue';
import EntityListPage from 'src/shared/components/EntityListPage.vue';
import {emptyOrganizationFilter, OrgItemFilter} from 'src/modules/org-structure';
import CreateOrgItemDialog from 'src/modules/org-structure/organization/components/CreateOrgItemDialog.vue';

const NAMESPACE = 'orgItem'
const INSTANCE_KEY = 'organizations'

export default defineComponent({
  name: 'OrganizationListPage',
  components: {CreateOrgItemDialog, EntityListPage, OrganizationList, SimpleFilterForm },
  setup() {

    const emptyFilter = emptyOrganizationFilter
    const entityListPage = useEntityListPage<OrgItemFilter>({
        namespace: NAMESPACE,
        instanceKey: INSTANCE_KEY,
        filter: emptyFilter()
      }
    )

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
