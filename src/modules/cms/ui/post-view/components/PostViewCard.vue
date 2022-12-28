<template>
  <q-card flat :bordered="annotationMode" class="q-mb-md" :key="post.id">
    <q-card-section>
      <div class="float-right" v-if="post.featured">
        <q-icon name="bolt" color="red" size="sm"/>
      </div>
      <div v-if="blogs[post.blogId]" class="text-overline q-mb-xs">
        {{ blogs[post.blogId].name }}
      </div>
      <router-link v-if="annotationMode" class="text-h6" style="text-decoration: none; color: black;"
                   :to="{ name: 'cms.postView', params: {id: post.id }}">{{ post.title }}
      </router-link>
      <div v-if="!annotationMode" class="text-h4">{{ post.title }}</div>
      <principal-view-item class="q-mt-md" :principal="post.authorId"/>
      <post-view-status-line v-if="!annotationMode" :post="post"/>
    </q-card-section>

    <q-card-section class="q-pt-none" v-if="annotationMode">
      <WidgetView v-for="widget in introContentWidgets"
                  :widget="widget"
                  :key="widget.id"/>
    </q-card-section>
    <q-card-section class="q-pt-none" v-else>
      <WidgetView v-for="widget in postContentWidgets"
                  :widget="widget"
                  :key="widget.id"/>
    </q-card-section>

    <q-card-section v-if="annotationMode" class="q-pt-none">
      <q-btn flat color="primary" :to="{ name: 'cms.postView', params: {id: post.id }}">READ MORE</q-btn>
    </q-card-section>

    <post-view-status-line v-if="annotationMode" :post="post"/>
  </q-card>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef, watch} from 'vue';
import {PostView, useBlogViewStore} from 'src/modules/cms';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PostViewStatusLine from './PostViewStatusLine.vue';
import WidgetView from 'src/modules/cms/ui/content/WidgetView.vue';

export default defineComponent({
  name: 'PostViewCard',
  components: { WidgetView, PostViewStatusLine, PrincipalViewItem},
  props: {
    post: {
      type: Object as PropType<PostView>,
      required: true
    },
    annotationMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const blogViewStore = useBlogViewStore()

    const post = toRef(props, 'post')

    const introContentWidgets = computed(() => {
      if (post.value.introContent) {
        return post.value.introContent.widgetOrder
          .map(id => post.value.introContent.widgets[id])
          .filter(c => c)
      } else {
        return []
      }
    })

    const postContentWidgets = computed(() => {
      if (post.value.content) {
        return post.value.content.widgetOrder
          // @ts-ignore
          .map(id => post.value.content.widgets[id])
          .filter(c => c)
      } else {
        return []
      }
    })

    const blogs = computed(() => blogViewStore.entities)
    const postBlog = computed(() => post.value.blogId)
    watch(postBlog, (blogId: string) => {
      void blogViewStore.loadEntitiesIfNotExist([blogId])
    })
    void blogViewStore.loadEntitiesIfNotExist([post.value.blogId])

    return {
      blogs,
      introContentWidgets,
      postContentWidgets
    };
  }
});
</script>
