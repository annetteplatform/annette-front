<template>
  <q-btn v-if="featured" flat round :color="color" icon="check_circle_outline" @click="updateFeatured(false)"/>
  <q-btn v-else flat round :color="color" icon="radio_button_unchecked" @click="updateFeatured(true)"/>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import {Ref} from '@vue/reactivity';
import {useStore} from 'src/store';
import {UpdatePostFeaturedPayloadDto} from 'src/modules/cms';

export default defineComponent({
  name: 'FeaturedField',
  components: {},
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  setup(props) {

    const store = useStore()

    const postId = toRef(props, 'postId') as Ref<string>

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const entities = computed( () => store.getters['cmsPost/entities'])

    const featured = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (entities.value && entities.value[postId.value]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return entities.value[postId.value].featured
      } else {
        return false
      }
    })
    const color = computed(() => featured.value ? 'primary' : 'grey')


    const updateFeatured = (flag: boolean) => {
      const payload: UpdatePostFeaturedPayloadDto = {
        id: postId.value,
        featured: flag
      }
      void store.dispatch('cmsPost/updatePostFeatured', payload)
    }

    return {
      featured,
      color,
      updateFeatured,
    }
  }
});
</script>
