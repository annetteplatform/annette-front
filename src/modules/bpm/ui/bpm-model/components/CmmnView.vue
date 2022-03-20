<template>
  <q-card class="full-width" bordered flat>
    <div class="bpmn-content full-width" id="bpmn-viewer">
    </div>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, onMounted, Ref, ref, toRef, watch} from 'vue';

import 'cmmn-js/dist/assets/cmmn-font/css/cmmn.css';
// @ts-ignore
import CmmnJS from 'cmmn-js/lib/Viewer'


export default defineComponent({
  name: 'CmmnView',
  components: {},
  props: {
    xml: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const xml = toRef(props, 'xml')
    const viewer: Ref<CmmnJS | null> = ref(null);


    const importXml = (xml: string) => {
      if (viewer.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        viewer.value.importXML(xml).catch(  (err: any) => {
          if (err) {
            console.error('BPMN import error');
          } else {
            console.log('bpmn import ok');
          }
        })
      }
    }

    onMounted(() => {
        const selector = document.querySelector('#bpmn-viewer')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        viewer.value = new CmmnJS({
          container: selector,
          keyboard: {
            bindTo: selector,
          },
        });
        if (xml.value && xml.value !== '') {
          importXml(xml.value);
        }
      }
    )

    watch(xml, (newXml) => {
      importXml(newXml);
    })


    return {};
  }
});
</script>

<style>
.bpmn-content {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px - 32px - 64px - 70px - 36px);
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}

#properties {
  font-size: 12px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 100%;
  z-index: 110;
  /* border-left: 1px solid #ccc;*/
  overflow: auto;
  background-color: rgb(248, 248, 248);
}


</style>

