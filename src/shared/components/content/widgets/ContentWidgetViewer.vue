<template>
  <WidgetLayoutView :layout="widget.data.layout" :anchor="widget.data.anchor">
    <div :class="'q-pa-md row q-gutter-md ' + containerClasses">
      <q-card v-for="(item, index) in widget.data.items" :key="index"
        :style="{width: '100%', maxWidth: item.maxWidth}" flat square>
        <img v-if="item.media" :src="mediaSource(item.media)"/>
        <q-card-section v-if="item.header || item.subheader"
                        class="q-pt-none">
          <div  v-if="item.header" :class="textClasses(item.header)">
            {{item.header.text}}
          </div>
          <div  v-if="item.subheader" :class="textClasses(item.subheader)">
            {{item.subheader.text}}
          </div>
        </q-card-section>
        <q-card-section v-if="item.text "
                        class="q-pt-none" >
          <div :class="textClasses(item.text)"
                v-html="item.text.text">
          </div>
        </q-card-section>
        <q-card-section v-if="item.action "
                        :class="'q-pt-none row ' + actionClasses(item.action) " >
          <q-btn color="primary"
                 :flat="item.action.type === 'flat'"
                 :outline="item.action.type === 'outline'"
                 :label="item.action.caption"
                 @click="executeAction(item.action)"/>
        </q-card-section>
      </q-card>
    </div>
  </WidgetLayoutView>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {Widget} from 'src/modules/cms';
import WidgetLayoutView from 'src/shared/components/content/widgets/components/WidgetLayoutView.vue';
import {Ref} from '@vue/reactivity';
import {
  ContentAction,
  contentAlignToClass,
  ContentData,
  contentJustifyToClass,
  ContentTextElement,
  contentTextJustifyToClass,
  contentTextStyleToClass,
  contentTextWeightToClass,
  contentWrapToClass,
  MediaData,
  mediaToSource, UrlHeaderAction
} from "src/shared/components/content";
import {useStore} from "src/store";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'ContentWidgetViewer',
  components: {WidgetLayoutView},
  props: {
    widget: {
      // Replace any with your type
      type: Object as PropType<Widget<ContentData>>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const widget: Ref<Widget<ContentData>> = toRef(props, 'widget')

    const containerClasses = computed( () => {
      const container = widget.value.data.container
      return [
        contentWrapToClass(container.wrap),
        contentJustifyToClass(container.justify),
        contentAlignToClass(container.align)
      ].join(' ')
    })

    const mediaSource = (media: MediaData) => {
      return mediaToSource(media)
    }

    const textClasses = (contentTextElement: ContentTextElement) => {
      if (contentTextElement) {
        return [
          contentTextStyleToClass(contentTextElement.style),
          contentTextWeightToClass(contentTextElement.weight),
          contentTextJustifyToClass(contentTextElement.justify),
        ].join(' ')
      } else return ''
    }

    const actionClasses = (action: ContentAction) => {
      if (action) {
        return contentJustifyToClass(action.justify)
      } else {
        return ''
      }
    }

    const executeAction = (action: ContentAction) => {
      switch (action.action) {
        case 'login': {
          void store.dispatch('main/Login')
          break
        }
        case 'logout': {
          void store.dispatch('main/Logout')
          break
        }
        case 'url': {
          if (action.newWindow) {
            window.open(action.url, '_blank')
          } else {
            void router.push(action.url as string)
          }
        }
      }
    }

    return {
      containerClasses,
      mediaSource,
      textClasses,
      actionClasses,
      executeAction
    }
  }
})
</script>

