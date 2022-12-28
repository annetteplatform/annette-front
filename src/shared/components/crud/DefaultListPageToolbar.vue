<template>
  <q-btn flat round color="primary" icon="refresh"
         @click="refresh">
    <q-tooltip>
      {{ $t('annette.shared.crud.refresh') }}
    </q-tooltip>
  </q-btn>
</template>
<script setup lang="ts">
const emit = defineEmits(['refresh'])
const refresh = () => {emit('refresh')}

defineExpose({
  refresh
})

</script>
