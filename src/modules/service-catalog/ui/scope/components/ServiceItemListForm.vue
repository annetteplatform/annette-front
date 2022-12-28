<template>
  <div class="full-width">
    <div class="row full-width">
      <q-list bordered class="full-width" separator>
        <q-item v-if="label">
          <q-item-section>
            <q-item-label>
              {{ label }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!readonly">
          <q-item-section>
            <service-item-selector v-model="newServiceItem"/>
          </q-item-section>
          <q-item-section avatar>
            <q-btn class="float-left" round dense flat color="primary" icon="add"
                   @click="addServiceItem(newServiceItem)"
                   :disable="newServiceItem === ''"
            />
          </q-item-section>
        </q-item>
        <q-item v-if="model && model.length === 0">
          <q-item-section>
            <q-item-label caption>
              Service items not found
            </q-item-label>
          </q-item-section>
        </q-item>
        <draggable v-if="model && model.length !== 0"
                   v-model="model"
                   :item-key="key => key"
                   class="list-group"
                   ghost-class="ghost"
                   @start="drag=true"
                   @end="drag=false"
                   handle=".cursor-move"
        >
          <template #item="{element}">
            <q-item class="list-group-item" >
              <q-item-section  avatar>
                <q-avatar  class="cursor-move" color="primary" text-color="white">
                  {{ serviceItemType(element).charAt(0).toUpperCase() }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ serviceItemName(element) }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div>

                  <q-btn flat round color="red" size="sm" icon="fas fa-trash"
                         v-if="!readonly"
                         @click="deleteServiceItem(element)"/>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import {computed, defineComponent, PropType, ref} from 'vue';
import {useServiceItemStore} from 'src/modules/service-catalog';
import ServiceItemSelector from 'src/modules/service-catalog/ui/item/components/ServiceItemSelector.vue';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'ServiceItemListForm',
  components: {ServiceItemSelector, draggable},
  props: {
    modelValue: {
      type: Object as PropType<string[]>,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const serviceItemStore = useServiceItemStore()

    serviceItemStore.loadEntitiesIfNotExist(props.modelValue)

    const newServiceItem = ref('')
    const drag = ref(false)

    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const addServiceItem = (id: string) => {
      model.value = [...model.value, id]
      newServiceItem.value = ''
    }

    const deleteServiceItem = (id: string) => {
      model.value = model.value.filter(s => s !== id)
    }

    const serviceItemEntities = computed(() => serviceItemStore.entities)

    const serviceItemName = (id: string) => {
      if (serviceItemEntities.value[id]) {
        return serviceItemEntities.value[id].name
      } else return id
    }

    const serviceItemType = (id: string) => {
      if (serviceItemEntities.value[id]) {
        return serviceItemEntities.value[id].type
      } else return ' '
    }

    const itemKey = (key: string) => {
      console.log('key', key)
      return key
    }

    return {
      model,
      drag,
      newServiceItem,
      serviceItemEntities,
      addServiceItem,
      deleteServiceItem,
      serviceItemName,
      serviceItemType,
      itemKey

    };
  }
});
</script>

<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #e1dfdf;
}
.not-draggable {
  cursor: no-drop;
}

.cursor-move {
  cursor: move
}
</style>
