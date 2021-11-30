<template>
  <q-item-section v-if="person">
    <q-item-label caption lines="1">
      Person
    </q-item-label>
    <q-item-label class="cursor-pointer" @click="openPerson">
        <span class="person-navigate">
          <span class="text-weight-bold">{{ person.lastname }}</span> {{ person.firstname }} {{ person.middlename || '' }}
        </span>
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef, watch} from 'vue';
import {useRouter} from 'vue-router'
import {Ref} from '@vue/reactivity';
import {Person} from 'src/modules/person';
import {useStore} from 'src/store';
import {AnnettePrincipal} from 'src/shared';


export default defineComponent({
  name: 'PersonPrincipalView',
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

    const principal = toRef(props, 'principal')

    const person: Ref<Person | null> = ref(null)

    const loadPrincipal = async () => {
      if (principal.value.principalId !== 'ANONYMOUS') {
        const persons: Person[] = await store.dispatch('personPerson/loadEntitiesIfNotExist', [principal.value.principalId])
        if (persons && persons[0]) {
          person.value = persons[0]
        } else {
          person.value = {
            id: principal.value.principalId,
            lastname: 'Unknown person',
            firstname: `[${principal.value.principalId}]`,
            categoryId:''
          }
        }
      } else {
        person.value = {
          id: principal.value.principalId,
          lastname: 'ANONYMOUS',
          firstname: '',
          categoryId:''
        }
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
      person,
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
