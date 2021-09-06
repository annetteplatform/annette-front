<template>
  <q-list class="full-width " bordered>
    <q-item-label header>Assigned Persons</q-item-label>
    <q-item>
      <q-item-section>
        <div class="row">
          <q-input
            class="col-md-6 col-sm-12 col-xs-12 q-pr-md"
            :model-value="entity.limit"
            @update:model-value="changePositionLimit"
            type="number"
            label="Person assignment limit"
            :readonly="readonly"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-item v-if="!readonly && assignedPersons.length < entity.limit">
      <q-item-section>
        <person-selector label="Person"
                         v-model="personId"
                         :readonly="readonly"
        />
      </q-item-section>
      <q-item-section avatar v-if="!readonly">
        <q-btn
          flat round color="primary" icon="add"
          :disable="!personId || assignedPersons.length >= entity.limit"
          @click="assignPerson(personId)"/>
      </q-item-section>
    </q-item>

    <q-item v-for="person in assignedPersons" :key="person.id">
      <q-item-section class="cursor-pointer" avatar>
        <q-btn
          flat round icon="person"
          :to="{name: 'person.person', params: {action: 'view', id: person.id}}"
        />
      </q-item-section>
      <q-item-section>
        {{ person.lastname }}  {{ person.firstname }}
      </q-item-section>
      <q-item-section avatar v-if="!readonly">
        <q-btn flat round color="negative" icon="delete" @click="unassignPerson(person.id)"/>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, toRef, watch} from 'vue';
import {Ref} from '@vue/reactivity';
import {
  AssignPersonPayloadDto,
  ChangePositionLimitPayloadDto,
  OrgPosition,
  UnassignPersonPayloadDto
} from 'src/modules/org-structure';
import {Person} from 'src/modules/person';
import {useStore} from 'src/store';
import PersonSelector from 'src/modules/person/person/components/PersonSelector.vue';


export default defineComponent({
  name: 'PersonAssignmentForm',
  components: {PersonSelector},
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: Object as PropType<OrgPosition>,
      required: true
    },
  },
  emits: ['nameUpdated'],
  setup(props) {

    const store = useStore()

    const entity: Ref<OrgPosition> = toRef(props, 'entity')

    const assignedPersons: Ref<Person[]> = ref([])
    const personId = ref('')

    const loadAssignedPersons = async () => {
      console.log('loadAssignedPersons')
      const persons: Person[] = await store.dispatch('personPerson/loadEntitiesIfNotExist', entity.value.persons)
      assignedPersons.value = persons
        .sort((a, b) => a.lastname + a.firstname < b.lastname + b.firstname ? -1 : 1)
    }

    const changePositionLimit = async (limit: string) => {
      const payload: ChangePositionLimitPayloadDto = {
        positionId: entity.value.id,
        limit: parseInt(limit)
      }
      await store.dispatch('orgItem/changePositionLimit', payload)

        .catch(failure => console.log(failure))
    }

    const assignPerson = async (newPersonId: string) => {
      const payload: AssignPersonPayloadDto = {
        positionId: entity.value.id,
        personId: newPersonId
      }
      await store.dispatch('orgItem/assignPerson', payload)
      personId.value = ''
    }

    const unassignPerson = async (removedPersonId: string) => {
      const payload: UnassignPersonPayloadDto = {
        positionId: entity.value.id,
        personId: removedPersonId
      }
      await store.dispatch('orgItem/unassignPerson', payload)
    }

    void loadAssignedPersons()
    watch( () => entity.value.persons, loadAssignedPersons)

    return {
      assignedPersons,
      personId,
      changePositionLimit,
      assignPerson,
      unassignPerson


    };
  }
});
</script>
