<template>
  <q-item-section >
    <q-item-label caption lines="1" >
      {{ principalType }}
    </q-item-label>
    <q-item-label class="cursor-pointer" @click="openOrgItem" v-if="orgItem">
      <span class="person-navigate text-weight-bold"> {{ orgItem.name }} </span>
    </q-item-label>
    <q-item-label v-else>
       {{ principal.principalId }}
    </q-item-label>
    <q-item-label caption lines="2" v-if="hierarchy" >
      {{ hierarchy }}
    </q-item-label>
    <q-item-label class="cursor-pointer" caption lines="1" v-if="person" @click="openPerson">
      <span class="person-navigate text-weight-bold">{{ person.firstname }} {{ person.lastname }}</span>
    </q-item-label>

  </q-item-section>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, toRef, watch} from 'vue';
import {useRouter} from 'vue-router'
import {OrgItem, OrgPosition} from 'src/modules/org-structure';
import {Ref} from '@vue/reactivity';
import {Person} from 'src/modules/person';
import {useStore} from 'src/store';
import {AnnettePrincipal} from 'src/shared';


export default defineComponent({
  name: 'OrgItemPrincipalView',
  components: {},
  props: {
    principal: {
      type: Object as PropType<AnnettePrincipal>,
      required: true,
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    const principal: Ref<AnnettePrincipal> = toRef(props, 'principal')

    const orgItem: Ref<OrgItem | null> = ref(null)
    const hierarchy = ref('')
    const person: Ref<Person | null> = ref(null)

    const principalTypes: {[id: string]: string} = {
      'org-position': 'Position',
      'unit-chief': 'Unit chief',
      'direct-unit': 'Direct unit',
      'descendant-unit': 'Descendant unit'
    }

    const principalType = computed(() => {
      return principalTypes[principal.value.principalType] || principal.value.principalType
    })

    const isUnitPrincipal = computed(() => {
      const orgItemPrincipals = ['unit-chief', 'direct-unit', 'descendant-unit']
      return orgItemPrincipals.includes(principal.value.principalType)
    })

    const isPositionPrincipal = computed(() => {
      const orgItemPrincipals = ['org-position']
      return orgItemPrincipals.includes(principal.value.principalType)
    })

    const loadPrincipal = async () => {
      const loadedItems: OrgItem[] = await store.dispatch('orgItem/loadEntitiesIfNotExist', [principal.value.principalId])
      if (loadedItems && loadedItems[0]) {
        orgItem.value = loadedItems[0]
        // @ts-ignore
        const len = orgItem.value.rootPath.length
        // @ts-ignore
        const hierarchyIds: string[] = orgItem.value.rootPath.slice(0, len - 1)
        const items: OrgItem[] = await store.dispatch('orgItem/loadEntitiesIfNotExist', hierarchyIds)
        hierarchy.value = items.map((item: OrgItem) => item.name).join(' / ')
        if (orgItem.value && orgItem.value?.itemType === 'position' && (orgItem.value as OrgPosition).persons.length === 1) {
          const persons: Person[] = await store.dispatch('personPerson/loadEntitiesIfNotExist', [(orgItem.value as OrgPosition).persons[0]])
          if (persons && persons[0]) {
            person.value = persons[0]
          } else {
            person.value = null
          }
        } else {
          person.value = null
        }
      } else {
        orgItem.value = null
      }
    }

    const openOrgItem = () => {
      if (orgItem.value) {
        // @ts-ignore
        router.push({name: 'orgStructure.organization', params: {action: 'view', id: orgItem.value.orgId}})
          .catch(err => console.error(err))
      }
    }

    const openPerson = () => {
      if (person.value) {
        router.push({name: 'person.person', params: {action: 'view', id: person.value.id}})
          .catch(err => console.error(err))
      }
    }

    void loadPrincipal()
    watch(principal, loadPrincipal)

    return {
      orgItem,
      hierarchy,
      person,
      principalType,
      isUnitPrincipal,
      isPositionPrincipal,
      openOrgItem,
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
