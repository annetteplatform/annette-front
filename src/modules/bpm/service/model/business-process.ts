import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';
import {Datatype} from './datatype';

export type BusinessProcessVariables = { [variableName: string]: BusinessProcessVariable}

export interface BusinessProcess extends BaseEntity {
  id: string,
  name: string,
  description: string,
  bpmModelId?: string,
  processDefinitionId?: string,
  dataSchemaId?: string,
  variables: BusinessProcessVariables,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface BusinessProcessVariable
{
  name: string,
  caption: string,
  datatype: Datatype,
  defaultValue: string
}

export interface FullBusinessProcessVariable
{
  variableName: string,
  name: string,
  caption: string,
  datatype: Datatype,
  defaultValue: string
}

export interface BusinessProcessFilter {
  filter?: string,
  sortBy?: SortBy[]
}

export interface CreateBusinessProcessPayloadDto {
  id: string,
  name: string,
  description: string,
  bpmModelId?: string,
  processDefinitionId?: string,
  dataSchemaId?: string,
  variables: BusinessProcessVariables,
}

export interface UpdateBusinessProcessPayloadDto {
  id: string,
  name: string,
  description: string,
  bpmModelId?: string,
  processDefinitionId?: string,
  dataSchemaId?: string,
  variables: BusinessProcessVariables,
}

export interface UpdateBusinessProcessNamePayloadDto {
  id: string,
  name: string,
}

export interface UpdateBusinessProcessBpmModelPayloadDto {
  id: string,
  bpmModelId: string,
}

export interface UpdateBusinessProcessProcessDefinitionPayloadDto {
  id: string,
  processDefinitionId: string,
}

export interface UpdateBusinessProcessDataSchemaPayloadDto {
  id: string,
  dataSchemaId: string,
}

export interface UpdateBusinessProcessDescriptionPayloadDto {
  id: string,
  description: string,
}

export interface StoreBusinessProcessVariablePayloadDto {
  businessProcessId: string,
  variableName: string,
  oldVariableName?: string,
  name: string,
  caption: string,
  datatype: Datatype,
  defaultValue: string,
}

export interface DeleteBusinessProcessVariablePayloadDto {
  businessProcessId: string,
  variableName: string
}
