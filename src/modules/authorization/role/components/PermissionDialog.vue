<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Permission</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-gutter-md full-width" v-if="entityModel">
          <div class="row">
            <permission-selector v-model="entityModel.id"
                                 label="Permission Id"/>
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
import { defineComponent, ref} from 'vue';
import { Permission} from 'src/modules/authorization';
import {Ref} from '@vue/reactivity';
import PermissionSelector from 'src/modules/authorization/assignment/components/PermissionSelector.vue';


export default defineComponent({
  name: 'PermissionDialog',
  components: {PermissionSelector},
  setup() {

    const show = ref(false)
    const entityModel: Ref<Permission | null> = ref(null)
    const resolve: Ref<((value: Permission) => void) | null> = ref(null)
    const reject: Ref<(() => void) | null> = ref(null)

    const showDialog = (permission: Permission) => {
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

    return {
      show,
      entityModel,
      showDialog,
      update,
      cancel,
    }
  }
})
</script>
