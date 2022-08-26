<template>
  <q-list bordered class="full-width message-box"
          :class="{'error-message': message.messageType === 'E', 'info-message': message.messageType === 'I', 'warning-message': message.messageType === 'W'} ">
    <q-item>
      <q-item-section avatar>
        <q-icon color="negative" name="error"
                v-if="message.messageType === 'E'"/>
        <q-icon color="warning" name="warning"
                v-if="message.messageType === 'W'"/>
        <q-icon color="info" name="info"
                v-if="message.messageType === 'I'"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t(message.code, message.params) }}</q-item-label>
      </q-item-section>

      <q-item-section side top v-if="canClose">
        <q-btn flat round icon="close" @click="closeMessage"/>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { PropType} from 'vue'
import {AnnetteError} from 'src/shared/model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  message: {
    type: Object as PropType<AnnetteError>,
    required: true
  },
  canClose: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['closeMessage'])
const closeMessage = () => {
  emit('closeMessage')
}


</script>

<style>
.q-list--bordered.message-box {
  border-radius: 7px;
  border-width: 2px;
}

.q-list--bordered.error-message {
  border-color: #c10015;

}

.q-list--bordered.info-message {
  border-color: #31CCEC;
}

.q-list--bordered.warning-message {
  border-color: #F2C037;
}

</style>
