<template>
  <q-select class="col-md-12 col-sm-12 col-xs-12"
            use-input
            hide-selected
            fill-input
            new-value-mode="add"
            :model-value="permission"
            @update:model-value="select"
            input-debounce="0"
            :options="filteredPermissions"
            @filter="permissionFilterFn"
            :readonly="readonly"
            :clearable="clearable"
            :label="label">
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';


export default defineComponent({
  name: 'PermissionSelector',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: 'Permission Id'
    },
    modelValue: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    clearable: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const store = useStore()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const permissions: ComputedRef<string[]> = computed(() => store.getters['authAssignment/permissionIds'])
    const filteredPermissions: Ref<string[]> = ref([])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const permissionProp = toRef(props, 'modelValue')
    const permission: Ref<string> = ref(props.modelValue)

    watch(permissionProp, (newPrincipal: string) => permission.value = newPrincipal)


    const select = (selectedPermission: string) => {
      permission.value = selectedPermission
      emit('update:modelValue', permission.value)
    }

    const permissionFilterFn = (filter: string, update: (fn: () => void) => void) => {
      update(() => {
        const lowercaseFilter = filter.toLocaleLowerCase()
        filteredPermissions.value = permissions.value.filter(v => v.toLocaleLowerCase().indexOf(lowercaseFilter) > -1)
      })
    }


    return {
      permission,
      filteredPermissions,
      select,
      permissionFilterFn
    }
  }
})
</script>
