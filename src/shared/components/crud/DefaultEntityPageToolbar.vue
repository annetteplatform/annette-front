<template>
  <q-btn class="q-mr-md" outline color="primary"
         :label="backLabel"
         :to="{name: backRouteName}"/>
  <q-btn v-if="action === 'edit'"
         class="q-mr-md" outline color="primary"
         :label="$t('annette.shared.crud.view')"
         :to="{ name: routeName, params: { action: 'view', id } }"/>
  <q-btn v-if="action === 'view'"
         class="q-mr-md" outline color="primary"
         :label="$t('annette.shared.crud.edit')"
         :to="{ name: routeName, params: { action: 'edit', id } }"/>

</template>
<script setup lang="ts">
defineProps({

  id: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  routeName: {
    type: String,
    required: true
  },
  backLabel: {
    type: String,
    required: false
  },
  backRouteName: {
    type: String,
    required: false
  },

})

const emit = defineEmits(['save'])
const save = (id: string) => {
  emit('save', id)
}

defineExpose({
  save
})

</script>
