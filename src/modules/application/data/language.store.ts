import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {applicationService} from './service';
import {Language, LanguageFilter, emptyLanguageFilter} from './language.model';

const DEFAULT_PAGE_SIZE = 10

export const useLanguageStore = defineStore('language', () => {

  const entityStore = useEntityStore<Language, LanguageFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyLanguageFilter,
    find: applicationService.findLanguages,
    getEntity: applicationService.getLanguageById,
    getEntities: applicationService.getLanguagesById,
  })

  const createEntity = async (entity: Language) => {
    const newEntity = await applicationService.createLanguage(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Language) => {
    const newEntity = await applicationService.updateLanguage(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await applicationService.deleteLanguage(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})
