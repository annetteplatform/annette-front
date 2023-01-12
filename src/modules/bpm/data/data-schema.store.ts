import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {bpmDataSchemaService} from './data-schema.service';
import {
  DataSchema,
  DataSchemaFilter,
  CreateDataSchemaPayloadDto, DeleteDataSchemaVariablePayloadDto,
  emptyDataSchemaFilter, StoreDataSchemaVariablePayloadDto,
  UpdateDataSchemaDescriptionPayloadDto,
  UpdateDataSchemaNamePayloadDto,
  UpdateDataSchemaPayloadDto
} from './data-schema.model';

const DEFAULT_PAGE_SIZE = 10

export const useDataSchemaStore = defineStore('dataSchema', () => {

  const entityStore = useEntityStore<DataSchema, DataSchemaFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyDataSchemaFilter,
    find: bpmDataSchemaService.findDataSchemas,
    getEntity: bpmDataSchemaService.getDataSchemaById,
    getEntities: bpmDataSchemaService.getDataSchemasById,
  })

  const createEntity = async (entity: CreateDataSchemaPayloadDto) => {
    const newEntity = await bpmDataSchemaService.createDataSchema(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: UpdateDataSchemaPayloadDto) => {
    const newEntity = await bpmDataSchemaService.updateDataSchema(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityName = async (entity: UpdateDataSchemaNamePayloadDto) => {
    const newEntity = await bpmDataSchemaService.updateDataSchemaName(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityDescription = async (entity: UpdateDataSchemaDescriptionPayloadDto) => {
    const newEntity = await bpmDataSchemaService.updateDataSchemaDescription(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const storeDataSchemaVariable = async (entity: StoreDataSchemaVariablePayloadDto) => {
    const newEntity = await bpmDataSchemaService.storeDataSchemaVariable(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteDataSchemaVariable = async (entity: DeleteDataSchemaVariablePayloadDto) => {
    const newEntity = await bpmDataSchemaService.deleteDataSchemaVariable(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await bpmDataSchemaService.deleteDataSchema(id)
    entityStore.removeEntity(id)
  }

  return {
    ...entityStore,
    createEntity,
    updateEntity,
    updateEntityName,
    updateEntityDescription,
    storeDataSchemaVariable,
    deleteDataSchemaVariable,
    deleteEntity
  }

})
