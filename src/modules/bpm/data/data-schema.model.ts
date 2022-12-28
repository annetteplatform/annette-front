import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

export type DataSchemaVariables = { [variableName: string]: DataSchemaVariable}

export interface DataSchema extends BaseEntity {
  id: string,
  name: string,
  description: string,
  variables: DataSchemaVariables,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface DataSchemaVariable
{
  name: string,
  caption: string,
  datatype: Datatype,
  defaultValue: string
}

export interface FullDataSchemaVariable
{
  variableName: string,
  name: string,
  caption: string,
  datatype: Datatype,
  defaultValue: string
}

export interface DataSchemaFilter {
  filter?: string,
  sortBy?: SortBy[]
}

export function emptyDataSchemaFilter() {
  return {
    filter: '',
  }
}


export interface CreateDataSchemaPayloadDto {
  id: string,
  name: string,
  description: string,
  variables: DataSchemaVariables,
}

export interface UpdateDataSchemaPayloadDto {
  id: string,
  name: string,
  description: string,
  variables: DataSchemaVariables,
}

export interface UpdateDataSchemaNamePayloadDto {
  id: string,
  name: string,
}

export interface UpdateDataSchemaDescriptionPayloadDto {
  id: string,
  description: string,
}


export interface StoreDataSchemaVariablePayloadDto {
  dataSchemaId: string,
  variableName: string,
  oldVariableName?: string,
  name: string,
  caption: string,
  datatype: Datatype,
  defaultValue: string,
}

export interface DeleteDataSchemaVariablePayloadDto {
  dataSchemaId: string,
  variableName: string
}

export enum Datatype {
  Boolean = 'Boolean',
  Bytes   = 'Bytes',
  Short   = 'Short',
  Integer = 'Integer',
  Long    = 'Long',
  Double  = 'Double',
  Date    = 'Date',
  String  = 'String',
  Object  = 'Object',
  Json    = 'Json',
  Xml     = 'Xml'
}
