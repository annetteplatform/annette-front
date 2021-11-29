<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <q-toolbar class="shadow-2 rounded-borders"
               :style="{color: widget.data.textColor, 'background-color': widget.data.backgroundColor }">
      <q-toolbar-title v-if="widget.data.title">{{ widget.data.title}}</q-toolbar-title>
      <q-space />
      <q-tabs v-model="tab" shrink>
        <q-tab v-for="(action, index) in widget.data.actions"
               :name="index"
               :label="action.caption"
               :key="action.caption"
               no-caps
               @click="executeAction(action)" />
      </q-tabs>
    </q-toolbar>
  </WidgetLayoutView>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, } from 'vue';
import {Widget} from 'src/modules/cms';
import {

  HeaderAction,
  HeaderData,
  UrlHeaderAction
} from 'src/shared/components/content';
import WidgetLayoutView from 'src/shared/components/content/widgets/components/WidgetLayoutView.vue';
import {useStore} from 'src/store';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'HeaderWidgetViewer',
  components: {WidgetLayoutView},
  props: {
    widget: {
      type: Object as PropType<Widget<HeaderData>>,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const tab = ref('')

    const executeAction = (action: HeaderAction) => {
      switch (action.type) {
        case 'login': {
          void store.dispatch('main/Login')
          break
        }
        case 'logout': {
          void store.dispatch('main/Logout')
          break
        }
        case 'url': {
          const urlAction = action as UrlHeaderAction
          if (urlAction.newWindow) {
            window.open(urlAction.url, '_blank')
          } else {
            void router.push(urlAction.url)
          }
        }
      }
    }

    return {
     tab,
      executeAction
    }
  }
})
</script>

