<template>
  <q-item dense>
    <q-item-section avatar>
      <q-btn flat round icon="person" @click="openPerson" />
    </q-item-section>
    <q-item-section v-if="position">
      <q-item-label class="cursor-pointer" @click="openPosition">
        <span class="person-navigate text-weight-bold"> {{ position.name }} </span>
      </q-item-label>
      <q-item-label caption lines="2" v-if="hierarchy">
        {{ hierarchy }}
      </q-item-label>
      <q-item-label class="cursor-pointer" caption lines="1" v-if="person" @click="openPerson">
        <span class="person-navigate text-weight-bold">{{ person.firstname }} {{ person.lastname }}</span>
      </q-item-label>

    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, toRef, watch} from 'vue';
import OrgCategorySelector from 'src/modules/org-structure/category/components/OrgCategorySelector.vue';
import {OrgItem, OrgPosition} from 'src/modules/org-structure';
import {Ref} from "@vue/reactivity";
import {Person} from "src/modules/person";
import {useStore} from "src/store";


export default defineComponent({
  name: 'PositionViewField',
  components: {},
  props: {
    positionId: {
      type: String,
      required: true,
    }
  },
  setup(props ) {
    const store = useStore()
    // const router = useRouter()

    const positionIdProp = toRef(props, 'positionId')

    const position: Ref<OrgPosition | null> = ref(null)
    const hierarchy = ref('')
    const person: Ref<Person | null> = ref(null)


    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const entities = computed(() => store.getters['orgItem/entities'])

    const loadPosition = async (posId: string) => {
      await store.dispatch('orgItem/loadEntitiesIfNotExist', [posId])
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      position.value = entities.value[posId]
      console.log(position.value)
      const len = position.value.rootPath.length
      const hierarchyIds: string[] = position.value.rootPath.slice(0, len - 1)
      const items: OrgItems[] = await store.dispatch('orgItem/loadEntitiesIfNotExist', hierarchyIds)
      hierarchy.value = items.map((item: OrgItem) => item.name).join(' / ')
      if (position.value.persons.length === 1) {
        const persons: Person[] = await store.dispatch('personPerson/loadEntitiesIfNotExist',[position.value.persons[0]])
        console.log(persons)
        if (persons && persons[0]) {
          person.value = persons[0]
        } else {
          person.value = null
        }
      } else {
        person.value = null
      }
    }

    const openPosition = () => {
      // router.push({name: 'organization', params: {action: 'view', id: position.value.orgId}})
      //   .catch(err => console.error(err))
    }

    const openPerson = () =>  {
      // router.push({name: 'person', params: {action: 'view', id: person.value.id}})
      //   .catch(err => console.error(err))
    }

    void loadPosition(props.positionId)
    watch(positionIdProp, loadPosition)

    return {
      position,
      hierarchy,
      person,
      openPosition,
      openPerson
    };
  }
});
</script>


<style>
.person-navigate:hover {
  color: #1976D2;
}
</style>
