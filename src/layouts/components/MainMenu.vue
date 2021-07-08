<template>
  <q-list padding>
    <template v-for="group in serviceGroups" :key="group.id">
      <q-expansion-item
        expand-separator
        switch-toggle-sideu
        :icon="group.icon"
        :label="group.title"
        :model-value="!!openGroups[group.id] || false"
        @update:model-value="toggleOpenGroup(group.id)"
        :content-inset-level="0.4"
      >
        <q-list>
          <q-item v-for="service in group.services" :key="service.id" :to="service.action">
            <q-item-section avatar>
              <q-icon color="primary" :name="service.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ service.title }}</q-item-label>
              <q-item-label caption lines="2">{{ service.subtitle ? service.subtitle : ' ' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </template>
  </q-list>

</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'src/store';

export default defineComponent({
  name: 'MainMenu',
  components: {},
  setup() {
    const store = useStore()
    const serviceGroups = computed(() => store.getters['main/serviceGroups'])
    const openGroups = computed(() => store.getters['main/openGroups'])
    const toggleOpenGroup = (groupId: string) => store.commit('main/ToggleOpenGroup', groupId)
    return {
      serviceGroups,
      openGroups,
      toggleOpenGroup
    };
  }
});
</script>
