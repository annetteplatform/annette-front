import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {personService} from './service';
import {emptyPersonFilter, Person, PersonFilter} from './person.model';

const DEFAULT_PAGE_SIZE = 10

export const usePersonStore = defineStore('person', () => {

  const entityStore = useEntityStore<Person, PersonFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyPersonFilter,
    find: personService.findPersons,
    getEntity: personService.getPerson,
    getEntities: personService.getPersons,
  })

  const createEntity = async (entity: Person) => {
    const newEntity = await personService.createPerson(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Person) => {
    const newEntity = await personService.updatePerson(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await personService.deletePerson(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})
