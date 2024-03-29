<template>
  <q-item dense>
    <q-item-section avatar>
      <q-btn flat round icon="person" @click="openPerson"/>
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
import {computed, defineComponent, ref, toRef, watch} from 'vue';
import {useRouter} from 'vue-router'
import {OrgItem, OrgPosition, useOrgItemStore} from 'src/modules/org-structure';
import {Ref} from '@vue/reactivity';
import {Person, usePersonStore} from 'src/modules/person';


export default defineComponent({
  name: 'PositionViewField',
  components: {},
  props: {
    positionId: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const orgItemStore = useOrgItemStore()
    const personStore = usePersonStore()
    const router = useRouter()

    const positionIdProp = toRef(props, 'positionId')

    const position: Ref<OrgPosition | null> = ref(null)
    const hierarchy = ref('')
    const person: Ref<Person | null> = ref(null)


    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    const entities = computed(() => orgItemStore.entities)

    const loadPosition = async (posId: string) => {
      await orgItemStore.loadEntitiesIfNotExist([posId])
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      position.value = entities.value[posId] as OrgPosition
      // @ts-ignore
      const len = position.value.rootPath.length
      // @ts-ignore
      const hierarchyIds: string[] = position.value.rootPath.slice(0, len - 1)
      const items: OrgItem[] = await orgItemStore.loadEntitiesIfNotExist(hierarchyIds)
      hierarchy.value = items.map((item: OrgItem) => item.name).join(' / ')
      if (position.value && position.value.persons.length === 1) {
        const persons: Person[] = await personStore.loadEntitiesIfNotExist([position.value.persons[0]])
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
      if (position.value) {
        // @ts-ignore
        router.push({name: 'orgStructure.organization', params: {action: 'view', id: position.value.orgId}})
          .catch(err => console.error(err))
      }
    }

    const openPerson = () => {
      if (person.value) {
        router.push({name: 'person.person', params: {action: 'view', id: person.value.id}})
          .catch(err => console.error(err))
      }
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
