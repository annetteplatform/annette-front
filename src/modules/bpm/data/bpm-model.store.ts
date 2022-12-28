import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {bpmBpmModelService} from './bpm-model.service';
import {
  BpmModel,
  BpmModelFilter,
  CreateBpmModelPayloadDto,
  emptyBpmModelFilter, UpdateBpmModelDescriptionPayloadDto, UpdateBpmModelNamePayloadDto,
  UpdateBpmModelPayloadDto, UpdateBpmModelXmlPayloadDto
} from './bpm-model.model';

const DEFAULT_PAGE_SIZE = 10

export const useBpmModelStore = defineStore('bpmModel', () => {

  const entityStore = useEntityStore<BpmModel, BpmModelFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyBpmModelFilter,
    find: bpmBpmModelService.findBpmModels,
    getEntityById: bpmBpmModelService.getBpmModelById,
    getEntitiesById: bpmBpmModelService.getBpmModelsById,
  })

  const createEntity = async (entity: CreateBpmModelPayloadDto) => {
    const newEntity = await bpmBpmModelService.createBpmModel(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: UpdateBpmModelPayloadDto) => {
    const newEntity = await bpmBpmModelService.updateBpmModel(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityName = async (entity: UpdateBpmModelNamePayloadDto) => {
    const newEntity = await bpmBpmModelService.updateBpmModelName(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityDescription = async (entity: UpdateBpmModelDescriptionPayloadDto) => {
    const newEntity = await bpmBpmModelService.updateBpmModelDescription(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityXml = async (entity: UpdateBpmModelXmlPayloadDto) => {
    const newEntity = await bpmBpmModelService.updateBpmModelXml(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await bpmBpmModelService.deleteBpmModel(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity,
    updateEntityName,
    updateEntityDescription,
    updateEntityXml
  }

})
