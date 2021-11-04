<template>

  <q-list>
    <q-item>
      <q-item-section>
        <q-item-label class="text-h6">Select template</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-btn flat round icon="close"
               @click="cancel"/>
      </q-item-section>

    </q-item>
    <q-item>
      <q-item-section>
        <q-input outlined dense v-model="templateFilter">
          <template v-slot:append>
            <q-icon v-if="templateFilter !== ''" name="close" @click="templateFilter = ''" class="cursor-pointer"/>
            <q-icon name="search"/>
          </template>
        </q-input>
      </q-item-section>
    </q-item>
    <q-separator spaced/>
    <template v-for="template in filteredTemplates" :key="template.id">
      <q-item clickable v-ripple
              @click="select(template)">
        <q-item-section class="text-weight-medium">{{ template.name }}</q-item-section>
      </q-item>
      <q-separator/>
    </template>
  </q-list>

</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {WidgetContentTemplate, widgetContentTemplates} from 'src/modules/cms';
import {extend, uid} from 'quasar';


export default defineComponent({
  name: 'WidgetTemplateSelector',
  components: {},
  emits: ['cancel', 'select'],
  setup(props, {emit}) {

    const templateFilter = ref('')
    const templates = widgetContentTemplates()
    const filteredTemplates = computed(() => {
      if (templateFilter.value === '') {
        return templates
      } else {
        return templates
          .filter((t: WidgetContentTemplate) => t.name.toLowerCase().includes(templateFilter.value.toLowerCase()))
      }
    })

    const cancel = () => {
      emit('cancel')
    }

    const select = (template: WidgetContentTemplate) => {
      let data = {}
      extend(true, data, template.widgetContent)
      // @ts-ignore
      data.id = uid()
      emit('select', data)
    }

    return {
      templateFilter,
      filteredTemplates,
      cancel,
      select
    }
  }
})
</script>
