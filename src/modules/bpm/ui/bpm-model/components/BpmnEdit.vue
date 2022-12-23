<template>
  <q-card class="full-width" bordered flat>
    <div class="bpmn-content modeler">
      <div id="canvas"></div>
      <div id="properties"></div>
    </div>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, onMounted, Ref, ref, toRef, watch} from 'vue'

// @ts-ignore
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';
import 'camunda-bpmn-js/dist/assets/camunda-platform-modeler.css';

import 'bpmn-js-color-picker/colors/color-picker.css'
// @ts-ignore
import BpmnColorPickerModule from 'bpmn-js-color-picker';
// @ts-ignore
import _ from 'lodash'


export default defineComponent({
  name: 'BpmnEdit',
  components: {},
  props: {
    modelValue: {
      type: String,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const xml = toRef(props, 'modelValue')
    const modeler: Ref<BpmnModeler | null> = ref(null);

    const lastExportedXml: Ref<string | null> = ref(null);

    const importXml = async (xml: string) => {
      if (modeler.value) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          await modeler.value.importXML(xml)
          console.log('bpmn import ok');
        } catch (err) {
          console.error('BPMN import error');
        }
      }
    }

    const exportXml = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        const result = await modeler.value.saveXML();
        const {xml} = result;
        lastExportedXml.value = xml;
        emit('update:modelValue', xml)
      } catch (err) {
        console.error('BPMN export error');
        console.error(err);
      }
    }

    const debounceExportXml = _.debounce(exportXml, 500);

    onMounted(async () => {
        console.log('mounted')
        const selector = document.querySelector('#canvas');
        const properties = document.querySelector('#properties');
        modeler.value = new BpmnModeler({
          container: selector,
          keyboard: {
                bindTo: selector,
              },
          propertiesPanel: {
            parent: properties
          },
          additionalModules: [BpmnColorPickerModule]
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // modeler.value = new Modeler({
        //   container: selector,
        //   width: '100%',
        //   height: 'calc(100vh - 50px - 32px - 64px - 70px - 36px)',
        //   keyboard: {
        //     bindTo: selector,
        //   },
        //   propertiesPanel: {
        //     parent: properties,
        //   },
        //   additionalModules: [
        //     // CamundaExtensionModule,
        //     CamundaPlatformBehaviors,
        //     // PropertiesPanelModule,
        //     // PropertiesProviderModule,
        //     BpmnPropertiesPanelModule,
        //     BpmnPropertiesProviderModule,
        //     BpmnColorPickerModule
        //   ],
        //   moddleExtensions: {
        //     camunda: CamundaModdle,
        //   },
        // });
        if (xml.value && xml.value !== '') {
          await importXml(xml.value);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        modeler.value.on('commandStack.changed', debounceExportXml);
      }
    )

    watch(xml, async (newXml) => {
      if (lastExportedXml.value !== newXml) {
        await importXml(newXml);
      }
    })


    return {};
  }
});
</script>

<style>
.bpmn-content {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px - 32px - 64px - 70px );
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

