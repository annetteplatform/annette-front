<template>
  <slot name="left"></slot>
  <q-space v-if="!noSpace"/>

  <q-btn color="primary" outline flat
         :label="$t('annette.shared.crud.create')"
         :to="{name: createRouteName, params: {action: 'create', id: 'new'}}"/>
  <slot name="right"></slot>
</template>

<script setup lang="ts">
defineProps({
  create: {
    type: Boolean,
    default: false
  },
  createRouteName: {
    type: String,
  },
  noSpace: {
    type: Boolean,
    default: false
  }
})

</script>
