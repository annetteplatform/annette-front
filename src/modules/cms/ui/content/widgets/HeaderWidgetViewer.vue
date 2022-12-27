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
} from 'src/modules/cms/ui/content';
import WidgetLayoutView from 'src/modules/cms/ui/content/widgets/components/WidgetLayoutView.vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from 'src/main';

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
    const authStore = useAuthStore()
    const router = useRouter()
    const tab = ref('')

    const executeAction = (action: HeaderAction) => {
      switch (action.type) {
        case 'login': {
          void authStore.login()
          break
        }
        case 'logout': {
          void authStore.logout()
          break
        }
        case 'url': {
          const urlAction = action as UrlHeaderAction
          if (urlAction.newWindow) {
            window.open(urlAction.url, '_blank')
          } else if (urlAction.url.startsWith('/')) {
            void router.push(urlAction.url)
          } else {
            console.log('open')
            window.open(urlAction.url, '_self')
          }
          break
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

