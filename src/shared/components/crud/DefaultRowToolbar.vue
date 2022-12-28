<template>
  <q-btn v-if="view"
         flat round color="green" size="sm" icon="far fa-eye"
         :to="{ name: routeName, params: { action: 'view', id} }">
    <q-tooltip>
      {{ $t('annette.shared.crud.view') }}
    </q-tooltip>
  </q-btn>
  <q-btn v-if="copy"
         flat round color="blue" size="sm" icon="far fa-copy"
         :to="{ name: routeName, params: { action: 'create', id } }">
    <q-tooltip>
      {{ $t('annette.shared.crud.copy') }}
    </q-tooltip>
  </q-btn>
  <q-btn v-if="edit"
         flat round color="blue" size="sm" icon="far fa-edit"
         :to="{ name: routeName, params: { action: 'edit', id } }">
    <q-tooltip>
      {{ $t('annette.shared.crud.edit') }}
    </q-tooltip>
  </q-btn>

  <q-btn v-if="activate"
         flat round color="green" size="sm" icon="fa-regular fa-circle-check" @click="activateEntity(id)">
    <q-tooltip>
      {{ $t('annette.shared.crud.activate') }}
    </q-tooltip>
  </q-btn>
  <q-btn v-if="deactivate"
         flat round color="grey" size="sm" icon="fa-regular fa-circle-xmark" @click="deactivateEntity(id)">
    <q-tooltip>
      {{ $t('annette.shared.crud.deactivate') }}
    </q-tooltip>
  </q-btn>

  <q-btn v-if="del"
         flat round color="red" size="sm" icon="fas fa-trash" @click="deleteEntity(id)">
    <q-tooltip>
      {{ $t('annette.shared.crud.del') }}
    </q-tooltip>
  </q-btn>
</template>
<script setup lang="ts">
defineProps({

  id: {
    type: String,
    required: true
  },
  routeName: {
    type: String,
    required: true
  },
  copy: {
    type: Boolean,
    default: false
  },
  edit: {
    type: Boolean,
    default: false
  },
  view: {
    type: Boolean,
    default: false
  },
  del: {
    type: Boolean,
    default: false
  },
  activate: {
    type: Boolean,
    default: false
  },
  deactivate: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete', 'activate', 'deactivate'])
const deleteEntity = (id: string) => {
  emit('delete', id)
}
const activateEntity = (id: string) => {
  emit('activate', id)
}
const deactivateEntity = (id: string) => {
  emit('deactivate', id)
}

defineExpose({
  deleteEntity,
  activateEntity,
  deactivateEntity
})

</script>
