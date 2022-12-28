<template>
  <q-card-actions align="between">
    <q-chip outline square color="primary" text-color="white" icon="event">
      {{ publicationDate }}
    </q-chip>
    <q-btn v-if="post.metric.likedByMe" flat icon="thumb_up" color="primary" @click="changeLikeStatus(post.id)">&nbsp;&nbsp;
      {{ post.metric.likes }}
    </q-btn>
    <q-btn v-else flat icon="thumb_up" color="grey-4" @click="changeLikeStatus(post.id)">
      &nbsp;&nbsp;{{ post.metric.likes }}
    </q-btn>
    <q-chip outline square color="primary" text-color="white" icon="visibility">
      {{ post.metric.views }}
    </q-chip>
  </q-card-actions>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {PostView, usePostViewStore} from 'src/modules/cms';
import {date} from 'quasar';

export default defineComponent({
  name: 'PostViewStatusLine',
  components: {},
  props: {
    post: {
      type: Object as PropType<PostView>,
      required: true
    }
  },
  setup(props) {
    const store = usePostViewStore()

    const post = toRef(props, 'post')

    const publicationDate = computed(() => {
      if (post.value.publicationTimestamp) {
        return date.formatDate(post.value.publicationTimestamp, 'D MMM YYYY,  H:mm:ss')
      } else {
        return ' '
      }
    })

    const changeLikeStatus = (postId: string) => {
      void store.changeLikeStatus(postId)
    }

    return {
      publicationDate,
      changeLikeStatus
    };
  }
});
</script>
