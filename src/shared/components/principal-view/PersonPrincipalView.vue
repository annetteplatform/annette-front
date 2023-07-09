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
import {computed, defineComponent, ref, toRef, watch} from 'vue';
import {useRouter} from 'vue-router'
import {Ref} from '@vue/reactivity';
import {Person, usePersonStore} from 'src/modules/person';
import {AnnettePrincipal, extractPrincipalId} from 'src/shared/model';


export default defineComponent({
  name: 'PersonPrincipalView',
  components: {},
  props: {
    principal: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const store = usePersonStore()
    const router = useRouter()

    const principal: Ref<AnnettePrincipal> = toRef(props, 'principal')
    const principalId = computed( () => extractPrincipalId(principal.value))

    const person: Ref<Person | null> = ref(null)

    const loadPrincipal = async () => {
      if (principalId.value === 'ANONYMOUS') {
        person.value = {
          id: principalId.value,
          lastname: 'ANONYMOUS',
          firstname: '',
          categoryId:''
        }
      } else {
        person.value = {
          id: principalId.value,
          lastname: principalId.value,
          firstname: '',
          categoryId:''
        }
        if (principalId.value !== '') {
          const persons: Person[] = await store.loadEntitiesIfNotExist([principalId.value])
          if (persons && persons[0]) {
            person.value = persons[0]
          }
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
