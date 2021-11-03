<template>
  <q-dialog persistent
            :model-value="show"
            :maximized="show">

    <q-layout view="hHh lpR fFf">

      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="arrow_back" @click="close"/>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

          <q-toolbar-title>
            Content editor
          </q-toolbar-title>

          <q-btn dense flat round icon="menu" @click="toggleRightDrawer"/>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
        <!-- drawer content -->
      </q-drawer>

      <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered
                width="600">
        <q-card class="full-width">
          <q-card-actions align="around">
            <q-btn flat>Save</q-btn>
            <q-btn flat>Cancel</q-btn>
          </q-card-actions>

          <q-card-section class="bg-purple text-white">
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>


        </q-card>
      </q-drawer>

      <q-page-container>
        <q-page style="background-color: white">
          <div class="narrow-layout q-pa-md q-pt-lg">
            <SeparatorLine @add="addWidgetContent(0)"/>

            <div class="full-width"
                 v-for="(widgetContent, index) in content"
                 :key="widgetContent.id"
            >

              <div class="row q-mt-xs q-mb-xs"
                   v-if="selectedWidget === widgetContent.id">
                <q-btn-group>
                  <q-btn color="primary" size="xs" icon="edit"
                         @click.stop=""/>
                  <q-btn color="primary" size="xs" icon="content_copy"
                         @click.stop="duplicate(widgetContent, index + 1)"/>

                </q-btn-group>
                <q-btn-group class="q-ml-md">
                  <q-btn color="primary" size="xs" label="" icon="arrow_upward"
                         :disable="index === 0"
                         @click.stop="changeOrder(widgetContent, index - 1)"/>
                  <q-btn color="primary" size="xs" icon="arrow_downward"
                         :disable="index === content.length-1"
                         @click.stop="changeOrder(widgetContent, index + 1)"/>
                </q-btn-group>
                <q-btn class="q-ml-lg" color="negative" size="xs" icon="delete"
                       @click.stop="deleteWidgetContent(widgetContent)"/>
              </div>

              <div @click="toggleIntroWidget(widgetContent.id)">
                <WidgetContentView :content="widgetContent"/>
              </div>

              <SeparatorLine @add="addWidgetContent(index + 1)"/>
            </div>
          </div>
        </q-page>
      </q-page-container>

    </q-layout>


  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {AnnettePrincipal} from 'src/shared';
import SeparatorLine from 'src/shared/components/widget-content/editor/SeparatorLine.vue';
import {WidgetContent} from 'src/modules/cms';
import {uid} from 'quasar';
import WidgetContentView from 'src/shared/components/widget-content/WidgetContentView.vue';


export default defineComponent({
  name: 'ContentEditor',
  components: {SeparatorLine, WidgetContentView},
  props: {
    show: {
      type: Boolean,
      required: true
    },
    content: {
      type: Array as PropType<AnnettePrincipal[]>,
      required: true
    }
  },
  emits: ['close', 'changeOrder', 'update', 'delete'],
  setup(props, {emit}) {

    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    const close = () => {
      emit('close')
    }

    const widgetTypes = ['markdown', 'html']

    const selectedWidget = ref('')

    const toggleIntroWidget = (id: string) => {
      if (selectedWidget.value == id) {
        selectedWidget.value = ''
      } else {
        selectedWidget.value = id
      }
    }

    const addWidgetContent = (order: number) => {
      const data = {
        widgetContent: {
          id: uid(),
          widgetType: 'markdown',
          data: 'New markdown widget content\n* Item A\n* Item B\n* Item C',
          indexData: 'New markdown widget content\n* Item A\n* Item B\n* Item C',
        },
        order: order
      }
      console.log(data)
      emit('update', data)
    }

    const changeOrder = (widgetContent: WidgetContent, order: number) => {
      const data = {
        widgetContentId: widgetContent.id,
        order: order
      }
      console.log(widgetContent)
      console.log(data)
      emit('changeOrder', data)
    }

    const duplicate = (widgetContent: WidgetContent, order: number) => {
      const data = {
        widgetContent: {...widgetContent},
        order: order
      }
      data.widgetContent.id = uid()
      emit('update', data)
    }

    const deleteWidgetContent = (widgetContent: WidgetContent) => {
      emit('delete', widgetContent.id)
    }

    return {
      close,
      leftDrawerOpen,
      toggleLeftDrawer,
      rightDrawerOpen,
      toggleRightDrawer,
      selectedWidget,
      toggleIntroWidget,
      changeOrder,
      duplicate,
      addWidgetContent,
      deleteWidgetContent,
    }
  }
})
</script>
