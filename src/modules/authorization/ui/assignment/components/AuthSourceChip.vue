<template>
  <q-chip v-if="source.sourceType === 'role'"
    outline clickable color="primary" text-color="white" icon="security"
          @click="openRole">
    {{ source.sourceId }}
  </q-chip>
  <q-chip v-else
          outline color="secondary" text-color="white">
    {{ source.sourceType }}: {{ source.sourceId }}
  </q-chip>
</template>

<script lang="ts">
import {defineComponent, PropType, toRef} from 'vue';
import {useRouter} from 'vue-router';
import {AuthSource} from 'src/modules/authorization';
import {Ref} from '@vue/reactivity';

export default defineComponent({
  name: 'AuthSourceChip',
  components: {},
  props: {
    source: {
      type: Object as PropType<AuthSource>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const source: Ref<AuthSource> = toRef(props, 'source')

    const openRole = () => {
      void router.push({name: 'authorization.role', params: {action: 'view', id: source.value.sourceId}})
    }

    return {
      openRole
    }
  }
})

</script>
