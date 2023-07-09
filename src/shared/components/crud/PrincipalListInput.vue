<template>
  <principal-selector-dialog ref="principalSelectorDialog"/>
  <q-list bordered class="full-width" separator>
    <q-item>
      <q-item-section>
        {{label}}
      </q-item-section>
      <q-item-section avatar>
        <q-btn class="float-left" round dense flat color="primary"
               icon="add"
               v-if="!readonly"
               @click="addPrincipal"/>
      </q-item-section>
    </q-item>
    <q-item v-if="principals.length === 0">
      <q-item-section>
        <q-item-label caption>
         {{ $t('annette.shared.principalListInput.notAssigned')}}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      v-for="principal in principals"
      :key="principal">
      <principal-view-item :principal="principal"/>
      <q-item-section side v-if="!readonly">
        <q-btn flat round color="red" size="sm" icon="fas fa-trash"
               @click="deletePrincipal(principal)"/>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>

import {ref} from 'vue';
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n';
import {AnnettePrincipal} from 'src/shared/model';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PrincipalSelectorDialog from 'src/shared/components/principal-selector/PrincipalSelectorDialog.vue';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  principals: {
    type: Array,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  label: {
    type: String
  },
})

const emit = defineEmits(['addPrincipal', 'deletePrincipal'])

const quasar = useQuasar()
const i18n = useI18n()
const principalSelectorDialog = ref()

const addPrincipal = async () => {
  const principal = await principalSelectorDialog.value.showDialog()
  emit('addPrincipal', principal)
}

const deletePrincipal = (principal: AnnettePrincipal) => {
  quasar.notify({
    type: 'negative',
    message: i18n.t('annette.shared.principalListInput.deleteQuestion'),
    actions: [
      {label: i18n.t('annette.shared.crud.cancel'), color: 'white'},
      {
        label: i18n.t('annette.shared.crud.del'),
        color: 'white',
        handler: async () => {
          emit('deletePrincipal', principal)
        }
      }
    ]
  })
}

defineExpose({
  addPrincipal,
  deletePrincipal,
  principalSelectorDialog
})

</script>
