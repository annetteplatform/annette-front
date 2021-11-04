<template>
  <div class="row q-py-xs">
    <div class="full-width" style="border-top: #1D1D1D 1px dashed; padding-top: -12px"></div>
    <div style="width: 50%">
      <q-btn round
             class="float-right"
             style="margin-top: -13px; margin-right: -13px;"
             icon="add"
             color="primary"
             size="xs"
             @click="add"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'SeparatorLine',
  emits: ['add'],
  setup(props, {emit}) {
    const add = () => {
      emit('add')
    }
    return {
      add
    }
  }
})
</script>

<style>
.add-button {


}
</style>
