<template>
  <q-dialog v-model="show">
    <q-card style="width: 1024px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Select image</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section style="max-height: 80vh" class="scroll">

        <div class="q-pt-md row items-start q-gutter-md">
          <q-card flat bordered
                  v-for="file in files" :key="file.fileId"
                  class="image-card cursor-pointer"
                  @click="select(file)"
          >
            <q-card-section>
              <q-avatar v-if="file.contentType.includes('video')"
                        class="full-width"
                        style="height:160px;"
                        text-color="grey"
                        font-size="64px"
                        icon="videocam"
              />
              <q-img v-else style="height:160px;" class="full-width"
                     fit="scale-down"
                     :src="`/api/annette/v1/cms/file/${file.objectId}/media/${file.fileId}`"/>
            </q-card-section>
            <q-card-section>
              <q-item-label caption lines="1">{{ file.filename }}</q-item-label>
              <q-tooltip>
                {{ file.filename }}
              </q-tooltip>
            </q-card-section>
          </q-card>

        </div>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref} from 'vue';
import {FileDescriptor} from 'src/modules/cms';

export default defineComponent({
  name: 'ImageSelector',
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

<style>


.image-card {
  width: 100%;
  max-width: 235px;
}
</style>
