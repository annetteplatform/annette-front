<template>
  <q-item-section>
    <q-item-label caption lines="1">
      Special principal
    </q-item-label>
    <q-item-label>
      <span class="text-weight-bold">Authenticated User</span>
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'AuthenticatedPrincipalView',
  components: {},
  props: {
    principal: {
      type: String,
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
