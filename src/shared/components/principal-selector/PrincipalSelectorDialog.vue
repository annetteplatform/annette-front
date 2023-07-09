<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Select principal</div>
      </q-card-section>

      <q-card-section>

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="person" label="Person"/>
          <q-tab name="org-structure" label="Org. structure"/>
          <q-tab name="special" label="Special principals"/>
          <q-tab name="custom" label="Custom"/>
        </q-tabs>

        <q-tab-panels v-model="tab" animated>


          <q-tab-panel name="person">
            <person-selector label="Person"
                            v-model="personId"/>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" @click="cancel"/>
              <q-btn label="Select" color="primary" @click="selectPerson"/>
            </q-card-actions>
          </q-tab-panel>

          <q-tab-panel name="org-structure">
            Not implemented
          </q-tab-panel>

          <q-tab-panel name="special">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Authenticated user</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-btn label="Select" color="primary" size="sm" @click="selectAuthenticated"/>
                </q-item-section>
              </q-item>
              <q-separator spaced inset/>
              <q-item>
                <q-item-section>
                  <q-item-label>Anonymous user</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-btn label="Select" color="primary" size="sm" @click="selectAnonymous"/>
                </q-item-section>
              </q-item>
            </q-list>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" @click="cancel"/>
            </q-card-actions>
          </q-tab-panel>


          <q-tab-panel name="custom">
            <custom-principal-selector v-model="customPrincipal"/>
            <div class="row q-mt-md">
              <q-list class="full-width" bordered>
                <q-item>
                  <principal-view-item :principal="customPrincipal"/>
                </q-item>
              </q-list>
            </div>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" @click="cancel"/>
              <q-btn label="Select" color="primary" @click="selectCustom"/>
            </q-card-actions>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {Ref} from '@vue/reactivity';
import CustomPrincipalSelector from './CustomPrincipalSelector.vue';
import PrincipalViewItem from '../principal-view/PrincipalViewItem.vue';
import {AnnettePrincipal, ANONYMOUS_PRINCIPAL, AUTHENTICATED_PRINCIPAL, newPrincipal} from 'src/shared/model';
import PersonSelector from 'src/modules/person/ui/person/components/PersonSelector.vue';

function emptyPrincipal(): AnnettePrincipal {
  return 'person~'
}

export default defineComponent({
  name: 'PrincipalSelectorDialog',
  components: {PersonSelector, PrincipalViewItem, CustomPrincipalSelector},
  setup() {

    const show = ref(false)
    const tab = ref('person')

    const resolve: Ref<((value: AnnettePrincipal) => void) | null> = ref(null)
    const reject: Ref<(() => void) | null> = ref(null)

    const customPrincipal: Ref<AnnettePrincipal> = ref(emptyPrincipal())

    const personId = ref('')

    const showDialog = () => {
      show.value = true
      const promise = new Promise<AnnettePrincipal>((resolveFn, rejectFn) => {
        resolve.value = resolveFn
        reject.value = rejectFn
      })
      return promise
    }

    const selectCustom = () => {
      if (tab.value === 'custom' && resolve.value) {
        show.value = false
        resolve.value(customPrincipal.value)
        customPrincipal.value = emptyPrincipal()
      }
    }

    const selectPerson = () => {
      if (tab.value === 'person' && resolve.value) {
        show.value = false
        const person = newPrincipal('person', personId.value)
        resolve.value(person)
      }
    }

    const selectAuthenticated = () => {
      if (tab.value === 'special' && resolve.value) {
        show.value = false
        const person = AUTHENTICATED_PRINCIPAL
        resolve.value(person)
      }
    }

    const selectAnonymous = () => {
      if (tab.value === 'special' && resolve.value) {
        show.value = false
        const person = ANONYMOUS_PRINCIPAL
        resolve.value(person)
      }
    }

    const cancel = () => {
      show.value = false
      if (reject.value) {
        reject.value()
      }
    }

    return {
      show,
      tab,
      showDialog,
      selectCustom,
      cancel,
      customPrincipal,
      personId,
      selectPerson,
      selectAuthenticated,
      selectAnonymous,
    }
  }
})
</script>
