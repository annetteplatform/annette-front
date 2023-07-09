<template>
  <q-item-section >
    <q-item-label caption lines="1" >
      {{ principalTypeName }}
    </q-item-label>
    <q-item-label class="cursor-pointer" @click="openOrgItem" v-if="orgItem">
      <span class="person-navigate text-weight-bold"> {{ orgItem.name }} </span>
    </q-item-label>
    <q-item-label v-else>
       {{ principalId }}
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
import {computed, defineComponent, ref, toRef, watch} from 'vue';
import {useRouter} from 'vue-router'
import {OrgItem, OrgPosition, useOrgItemStore} from 'src/modules/org-structure';
import {Ref} from '@vue/reactivity';
import {Person, usePersonStore} from 'src/modules/person';
import {AnnettePrincipal, extractPrincipalId, extractPrincipalType, PrincipalTypeNames} from 'src/shared/model';


export default defineComponent({
  name: 'OrgItemPrincipalView',
  components: {},
  props: {
    principal: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const orgItemStore = useOrgItemStore()
    const personStore = usePersonStore()
    const router = useRouter()

    const principal: Ref<AnnettePrincipal> = toRef(props, 'principal')
    const principalType = computed( () => extractPrincipalType(principal.value))
    const principalId = computed( () => extractPrincipalId(principal.value))

    const orgItem: Ref<OrgItem | null> = ref(null)
    const hierarchy = ref('')
    const person: Ref<Person | null> = ref(null)

    const principalTypes = PrincipalTypeNames

    const principalTypeName = computed(() => {
      return principalTypes[principalType.value] || principalType.value
    })

    const isUnitPrincipal = computed(() => {
      const orgItemPrincipals = ['unit-chief', 'direct-unit', 'descendant-unit']
      return orgItemPrincipals.includes(principalType.value)
    })

    const isPositionPrincipal = computed(() => {
      const orgItemPrincipals = ['org-position']
      return orgItemPrincipals.includes(principalType.value)
    })

    const loadPrincipal = async () => {
      const loadedItems: OrgItem[] = await orgItemStore.loadEntitiesIfNotExist([principalId.value])
      if (loadedItems && loadedItems[0]) {
        orgItem.value = loadedItems[0]
        // @ts-ignore
        const len = orgItem.value.rootPath.length
        // @ts-ignore
        const hierarchyIds: string[] = orgItem.value.rootPath.slice(0, len - 1)
        const items: OrgItem[] = await orgItemStore.loadEntitiesIfNotExist( hierarchyIds)
        hierarchy.value = items.map((item: OrgItem) => item.name).join(' / ')
        if (orgItem.value && orgItem.value?.itemType === 'position' && (orgItem.value as OrgPosition).persons.length === 1) {
          const persons: Person[] = await personStore.loadEntitiesIfNotExist([(orgItem.value as OrgPosition).persons[0]])
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
      principalTypeName,
      principalId,
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
