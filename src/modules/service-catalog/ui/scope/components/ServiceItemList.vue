<template>
  <div class="full-width">


  </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import {computed, defineComponent, ref, toRefs, watch} from 'vue';
import {Ref} from 'vue';
import {useQuasar} from 'quasar';
import {useI18n} from 'vue-i18n';
import {useScopeStore} from 'src/modules/service-catalog';

export default defineComponent({
  name: 'ServiceItemList',
  components: {},
  props: {
    scopeId: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
    },
  },
  setup(props) {
    const store = useScopeStore()
    const quasar = useQuasar()
    const i18n = useI18n()

    const {scopeId} = toRefs(props)


    const showErrorNotification = (message: string) => {
      quasar.notify({
        type: 'negative',
        message,
        actions: [
          {
            label: i18n.t('annette.shared.crud.close'),
            color: 'white'
          },
        ]
      })
    }


    return {

    };
  }
});
</script>


<style>
.scope-json .q-field__control {
  height: 100% !important;
}
</style>
