<template>
  <q-item-section>
    <q-item-label caption lines="1">
      Special principal
    </q-item-label>
    <q-item-label>
      <span class="text-weight-bold">Anonymous User</span>
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType} from 'vue';
import {AnnettePrincipal} from 'src/shared/model';


export default defineComponent({
  name: 'AnonymousPrincipalView',
  components: {},
  props: {
    principal: {
      type: Object as PropType<AnnettePrincipal>,
      required: true,
    }
  },
  setup() {
    return {}
  }
});
</script>


<style>
.person-navigate:hover {
  color: #1976D2;
}
</style>
