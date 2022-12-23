import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {bpmBusinessProcessService} from './business-process.service';
import {
  BusinessProcess,
  BusinessProcessFilter,
  CreateBusinessProcessPayloadDto, DeleteBusinessProcessVariablePayloadDto,
  emptyBusinessProcessFilter, StoreBusinessProcessVariablePayloadDto,
  UpdateBusinessProcessBpmModelPayloadDto, UpdateBusinessProcessDataSchemaPayloadDto,
  UpdateBusinessProcessDescriptionPayloadDto,
  UpdateBusinessProcessNamePayloadDto,
  UpdateBusinessProcessPayloadDto
} from './business-process.model';

const DEFAULT_PAGE_SIZE = 10

export const useBusinessProcessStore = defineStore('businessProcess', () => {

  const entityStore = useEntityStore<BusinessProcess, BusinessProcessFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyBusinessProcessFilter,
    find: bpmBusinessProcessService.findBusinessProcesses,
    getEntityById: bpmBusinessProcessService.getBusinessProcessById,
    getEntitiesById: bpmBusinessProcessService.getBusinessProcessesById,
  })

  const createEntity = async (entity: CreateBusinessProcessPayloadDto) => {
    const newEntity = await bpmBusinessProcessService.createBusinessProcess(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: UpdateBusinessProcessPayloadDto) => {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcess(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityName = async (entity: UpdateBusinessProcessNamePayloadDto) => {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessName(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityDescription = async (entity: UpdateBusinessProcessDescriptionPayloadDto) => {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessDescription(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityBpmModel = async (entity: UpdateBusinessProcessBpmModelPayloadDto) => {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessBpmModel(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityDataSchema = async (entity: UpdateBusinessProcessDataSchemaPayloadDto) => {
    const newEntity = await bpmBusinessProcessService.updateBusinessProcessDataSchema(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const storeBusinessProcessVariable = async (entity: StoreBusinessProcessVariablePayloadDto) => {
    const newEntity = await bpmBusinessProcessService.storeBusinessProcessVariable(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteBusinessProcessVariable = async (entity: DeleteBusinessProcessVariablePayloadDto) => {
    const newEntity = await bpmBusinessProcessService.deleteBusinessProcessVariable(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await bpmBusinessProcessService.deleteBusinessProcess(id)
    entityStore.removeEntity(id)
  }

  return {
    ...entityStore,
    createEntity,
    updateEntity,
    updateEntityName,
    updateEntityDescription,
    updateEntityBpmModel,
    updateEntityDataSchema,
    storeBusinessProcessVariable,
    deleteBusinessProcessVariable,
    deleteEntity
  }

})
