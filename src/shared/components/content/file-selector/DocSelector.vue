<template>
  <q-dialog v-model="show">
    <q-card style="width: 1024px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Select image</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: 80vh" class="scroll">

        <q-list class="q-mt-md">
          <q-item v-for="file in files" :key="file.fileId">
            <q-item-section>
              <q-item-label>{{ file.filename }}</q-item-label>
              <q-item-label caption lines="2">{{ file.contentType }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-btn color="primary"
                       label="Select"
                       @click="select(file)"/>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {FileDescriptor} from 'src/modules/cms';


export default defineComponent({
  name: 'DocSelector',
  components: {},
  props:{
    files: {
      type: Array as PropType<FileDescriptor[]>,
      required: true
    }
  },
  emits: [ 'select'],
  setup(props, {emit}) {

    const show = ref(false)

    const showDialog = () => { show.value = true}

    const select = (file: FileDescriptor) => {
      emit('select', file)
      show.value = false
    }

    return {
      show,
      showDialog,
      select

    }
  }
})
</script>
