<template>
  <WidgetContentView v-for="widgetContent in page.content" :content="widgetContent" :key="widgetContent.id"/>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef, watch} from 'vue';
import {PageView} from 'src/modules/cms';
import {useStore} from 'src/store';
import {Ref} from '@vue/reactivity';
import WidgetContentView from 'src/shared/components/widget-content/WidgetContentView.vue';

export default defineComponent({
  name: 'PageViewCard',
  components: {WidgetContentView},
  props: {
    page: {
      type: Object as PropType<PageView>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const page = toRef(props, 'page') as Ref<PageView>

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const spaces = computed(() => store.getters['cmsSpaceView/entities'])
    const pageSpace = computed(() => page.value.spaceId)
    watch(pageSpace, (spaceId: string) => {
      void store.dispatch('cmsSpaceView/loadSpacesIfNotExist', [spaceId])
    })

    return {
      spaces
    };
  }
});
</script>
