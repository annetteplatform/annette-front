<template>
  <q-card-actions align="between">
    <q-chip outline square color="primary" text-color="white" icon="event">
      {{ publicationDate }}
    </q-chip>
    <q-btn v-if="page.metric.likedByMe" flat icon="thumb_up" color="primary" @click="changeLikeStatus(page.id)">&nbsp;&nbsp;
      {{ page.metric.likes }}
    </q-btn>
    <q-btn v-else flat icon="thumb_up" color="grey-4" @click="changeLikeStatus(page.id)">
      &nbsp;&nbsp;{{ page.metric.likes }}
    </q-btn>
    <q-chip outline square color="primary" text-color="white" icon="visibility">
      {{ page.metric.views }}
    </q-chip>
  </q-card-actions>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRef} from 'vue';
import {PageView} from 'src/modules/cms';
import {useStore} from 'src/store';
import {date} from 'quasar';

export default defineComponent({
  name: 'PageViewStatusLine',
  components: {},
  props: {
    page: {
      type: Object as PropType<PageView>,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const page = toRef(props, 'page')

    const publicationDate = computed(() => {
      if (page.value.publicationTimestamp) {
        return date.formatDate(page.value.publicationTimestamp, 'D MMM YYYY,  H:mm:ss')
      } else {
        return ' '
      }
    })

    const changeLikeStatus = (pageId: string) => {
      void store.dispatch('cmsPageView/changeLikeStatus', pageId)
    }

    return {
      publicationDate,
      changeLikeStatus
    };
  }
});
</script>
