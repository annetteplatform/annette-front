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
          <q-tab name="custom" label="Custom"/>
          <q-tab name="person" label="Person"/>
          <q-tab name="org-structure" label="Org. structure"/>
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="custom">
            <custom-principal-selector v-model="customPrincipal"/>
            <div class="row q-mt-md">
              <q-list class="full-width" bordered>
                <q-item>
                  <principal-view-item :principal="customPrincipal"/>
                </q-item>
              </q-list>
            </div>
          </q-tab-panel>

          <q-tab-panel name="person">
            Not implemented
          </q-tab-panel>

          <q-tab-panel name="org-structure">
            Not implemented
          </q-tab-panel>
        </q-tab-panels>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="cancel"/>
        <q-btn label="Select" color="primary" @click="select"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {Ref} from '@vue/reactivity';
import {AnnettePrincipal} from 'src/shared';
import CustomPrincipalSelector from './CustomPrincipalSelector.vue';
import PrincipalViewItem from '../principal-view/PrincipalViewItem.vue';

function emptyPrincipal(): AnnettePrincipal {
  return {
    principalType: 'person',
    principalId: ''
  }
}

export default defineComponent({
  name: 'PrincipalSelectorDialog',
  components: {PrincipalViewItem, CustomPrincipalSelector},
  setup() {

    const show = ref(false)
    const tab = ref('custom')

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

    const select = () => {
      if (tab.value === 'custom' && resolve.value) {
        show.value = false
        resolve.value({...customPrincipal.value})
        customPrincipal.value = emptyPrincipal()
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
      select,
      cancel,
      customPrincipal,
      personId
    }
  }
})
</script>
