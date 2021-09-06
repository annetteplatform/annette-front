<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Permission</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-gutter-md full-width" v-if="entityModel">

          <div class="row">
            <q-select class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
                      use-input
                      hide-selected
                      fill-input
                      :model-value="entityModel.id"
                      @update:model-value="setPermissionId"
                      :input-debounce="0"
                      :options="filteredPermissionIds"
                      @filter="permissionFilterFn"
                      label="Permission Id" >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="row">
            <q-input
              class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
              v-model="entityModel.arg1"
              label="Arg 1"
            />
          </div>
          <div class="row">
            <q-input
              class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
              v-model="entityModel.arg2"
              label="Arg 2"
            />
          </div>
          <div class="row">
            <q-input
              class="col-md-12 col-sm-12 col-xs-12 q-pr-md"
              v-model="entityModel.arg3"
              label="Arg 3"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="cancel"/>
        <q-btn label="OK" color="primary" @click="update"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref} from 'vue';
import { Permission} from 'src/modules/authorization';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';


export default defineComponent({
  name: 'PermissionDialog',
  components: {},
  setup() {
    const store = useStore()

    const show = ref(false)
    const entityModel: Ref<Permission | null> = ref(null)
    const resolve: Ref<((value: Permission) => void) | null> = ref(null)
    const reject: Ref<(() => void) | null> = ref(null)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    const permissionIds: ComputedRef<string[]> = computed(() => store.getters['authRole/permissionIds'])
    const filteredPermissionIds: Ref<string[]>= ref([])

    const showDialog = (permission: Permission) => {
      filteredPermissionIds.value = permissionIds.value
      entityModel.value = {...permission}
      show.value = true
      const promise = new Promise<Permission>((resolveFn, rejectFn) => {
        resolve.value = resolveFn
        reject.value = rejectFn
      })
      return promise
    }

    const update = () => {
      show.value = false
      if (resolve.value && entityModel.value) {
        resolve.value(entityModel.value)
      }
    }

    const cancel = () => {
      show.value = false
      if (reject.value) {
        reject.value()
      }
    }

   const setPermissionId =  (pid: string) => {
      if (entityModel.value) {
        entityModel.value.id = pid
      }
    }

    const permissionFilterFn = (filter: string, update: (fn: () => void) => void) => {
      update(() => {
        const lowercaseFilter = filter.toLocaleLowerCase()
        filteredPermissionIds.value = permissionIds.value.filter(v => v.toLocaleLowerCase().indexOf(lowercaseFilter) > -1)
      })
    }




    return {
      show,
      entityModel,
      showDialog,
      update,
      cancel,
      filteredPermissionIds,
      setPermissionId,
      permissionFilterFn,
    }
  }
})
</script>
