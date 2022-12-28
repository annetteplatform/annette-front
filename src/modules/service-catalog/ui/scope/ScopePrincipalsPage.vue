<template>
  <entity-page narrow
               caption="Scope Principals"
               :show-form="!!entityModel"
               :action="action"
               :error="error"
               @clearError="clearError"
               hide-status-bar>
    <template v-slot:toolbar>
      <q-btn class="q-mr-md" outline color="primary"
             label="Scopes"
             :to="{name: 'serviceCatalog.scopes'}"/>
      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="View"
             :to="{ name: 'serviceCatalog.scopePrincipals', params: { action: 'view', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Edit"
             :to="{ name: 'serviceCatalog.scopePrincipals', params: { action: 'edit', id } }"/>

      <q-btn v-if="action === 'edit'"
             class="q-mr-md" outline color="primary"
             label="Scope"
             :to="{ name: 'serviceCatalog.scope', params: { action: 'edit', id } }"/>
      <q-btn v-if="action === 'view'"
             class="q-mr-md" outline color="primary"
             label="Scope"
             :to="{ name: 'serviceCatalog.scope', params: { action: 'view', id } }"/>


    </template>
    <template v-slot:status>

    </template>
    <template v-slot:default>
      <div class="row">
        <div class="col-md-3 col-sm-12 col-xs-12 q-pr-md">
          <q-input v-model="entityModel.id" label="Role Id" readonly/>
        </div>
        <div class="col-md-9 col-sm-12 col-xs-12 q-pr-md">
          <q-input v-model="entityModel.name" label="Name" readonly/>
        </div>
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
                     v-if="action =='edit'"
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

import {AnnettePrincipal} from 'src/shared/model';
import {useQuasar} from 'quasar';
import {Ref} from '@vue/reactivity';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrinciplaSelectorDialog.vue';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import EntityPage from 'src/shared/components/crud/EntityPage.vue';
import {useEntityPage} from 'src/shared/composables';
import {Scope, serviceCatalogService, useScopeStore} from 'src/modules/service-catalog';


export default defineComponent({
  name: 'ScopePrincipalsPage',
  components: {PrincipalViewItem, PrincipalSelectorDialog, EntityPage},
  props: {
    id: String,
    action: String
  },
  setup(props) {
    const quasar = useQuasar()

    const principals: Ref<AnnettePrincipal[]> = ref([])
    const principalSelectorDialog = ref()


    const loadAssignments = async (action: string, id: string) => {
      principals.value = await serviceCatalogService.getScopePrincipals(id)
    }

    const store = useScopeStore()

    const entityPage = useEntityPage<Scope>({
      store,
      props,
      onBeforeLoad: loadAssignments
    })


    const addPrincipal = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const principal = await principalSelectorDialog.value.showDialog()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      await serviceCatalogService.assignScopePrincipal(entityPage.id.value, principal)
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
              await serviceCatalogService.unassignScopePrincipal(entityPage.id.value, principal)
              principals.value = principals.value.filter(p => p !== principal)
            }
          }
        ]
      })
    }

    return {
      ...entityPage,
      principals,
      principalSelectorDialog,
      addPrincipal,
      deletePrincipal
    };
  }
});
</script>
