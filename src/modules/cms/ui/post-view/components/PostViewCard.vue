<template>
  <q-card flat bordered class="q-mb-md" :key="post.id">

    <q-card-section>
      <div v-if="spaces[post.spaceId]" class="text-overline q-mb-xs">{{ spaces[post.spaceId].name }}</div>
      <router-link v-if="annotationMode" class="text-h6" style="text-decoration: none; color: black;"
                   :to="{ name: 'cms.postView', params: {id: post.id }}">{{ post.title }}</router-link>
      <div v-if="!annotationMode" class="text-h4">{{ post.title }}</div>
      <principal-view-item class="q-mt-md" :principal="post.authorId"/>
      <post-view-status-line v-if="!annotationMode" :post="post"/>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <post-content-view v-if="annotationMode && post.introContent" :content="post.introContent"/>
      <post-content-view v-if="!annotationMode && post.content" :content="post.content"/>
    </q-card-section>

    <q-card-section v-if="annotationMode" class="q-pt-none">
      <q-btn flat color="primary" :to="{ name: 'cms.postView', params: {id: post.id }}">READ MORE</q-btn>
    </q-card-section>

    <post-view-status-line v-if="annotationMode" :post="post"/>

<!--    <q-separator v-if="!annotationMode"  />-->
<!--    <q-card-section v-if="!annotationMode && post.updatedAt && post.updatedBy">-->
<!--      <updated-fields-->
<!--        :updated-at="post.updatedAt"-->
<!--        :updated-by="post.updatedBy"/>-->
<!--    </q-card-section>-->
  </q-card>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef, watch} from 'vue';
import {PostView} from 'src/modules/cms';
import {useStore} from 'src/store';
import {Ref} from '@vue/reactivity';
import PrincipalViewItem from 'src/shared/components/principal-view/PrincipalViewItem.vue';
import PostViewStatusLine from 'src/modules/cms/ui/post-view/components/PostViewStatusLine.vue';
import PostContentView from 'src/modules/cms/ui/post-view/components/PostContentView.vue';

export default defineComponent({
  name: 'PostViewCard',
  components: {PostContentView, PostViewStatusLine, PrincipalViewItem},
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
    const store = useStore()

    const post = toRef(props, 'post') as Ref<PostView>

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const spaces = computed( () => store.getters['cmsSpaceView/entities'])
    const postSpace = computed( () => post.value.spaceId)
    watch(postSpace, (spaceId: string) => {
      void store.dispatch('cmsSpaceView/loadSpacesIfNotExist', [spaceId])
    })

    return {
      spaces
    };
  }
});
</script>
