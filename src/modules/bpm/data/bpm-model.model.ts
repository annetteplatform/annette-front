import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

export enum Notation {
  BPMN = 'bpmn',
  CMMN = 'cmmn',
  DMN = 'dmn'
}

export interface BpmModel extends BaseEntity {
  id: string,
  code: string,
  name: string,
  description: string,
  notation: Notation,
  xml?: string,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface CreateBpmModelPayloadDto {
  id: string,
  name: string,
  description: string,
  notation: Notation,
  xml: string
}

export interface UpdateBpmModelPayloadDto {
  id: string,
  name: string,
  description: string,
  notation: Notation,
  xml: string
}

export interface UpdateBpmModelNamePayloadDto {
  id: string,
  name: string,
}

export interface UpdateBpmModelDescriptionPayloadDto {
  id: string,
  description: string,
}

export interface UpdateBpmModelXmlPayloadDto {
  id: string,
  notation: Notation,
  xml: string
}

export interface BpmModelFilter {
  filter?: string,
  notations?: Notation[],
  sortBy?: SortBy[]
}


export function emptyBpmModelFilter() {
  return {
    filter: '',
    notations: []
  }
}

