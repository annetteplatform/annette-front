import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {applicationService} from './service';
import {Translation, TranslationFilter, emptyTranslationFilter, GetTranslationJsonPayload} from './translation.model';

const DEFAULT_PAGE_SIZE = 10

export const useTranslationStore = defineStore('translation', () => {

  const entityStore = useEntityStore<Translation, TranslationFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyTranslationFilter,
    find: applicationService.findTranslations,
    getEntityById: applicationService.getTranslationById,
    getEntitiesById: applicationService.getTranslationsById,
  })

  const createEntity = async (entity: Translation) => {
    const newEntity = await applicationService.createTranslation(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: Translation) => {
    const newEntity = await applicationService.updateTranslation(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await applicationService.deleteTranslation(id)
    entityStore.removeEntity(id)
  }

  const getTranslationLanguages = async (id: string) => {
    return await applicationService.getTranslationLanguages(id)
  }

  const  getTranslationJsonById = async ( payload: GetTranslationJsonPayload) =>  {
    return await applicationService.getTranslationJsonById(payload.translationId, payload.languageId)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity,
    getTranslationLanguages,
    getTranslationJsonById
  }


  return {
   ...entityStore
  }

})
