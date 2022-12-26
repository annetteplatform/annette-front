import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

export interface Space extends BaseEntity {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  active: boolean,
  authors: AnnettePrincipal[],
  targets: AnnettePrincipal[],
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface SpaceFilter {
  filter?: string,
  spaceIds?: string[],
  categories?: string[],
  sortBy?: SortBy[]
}

export function emptySpaceFilter() {
  return { filter: ''}
}

export interface CreateSpacePayloadDto {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  authors: AnnettePrincipal[],
  targets: AnnettePrincipal[]
}

export interface UpdateSpaceNamePayloadDto {
  id: string,
  name: string
}

export interface UpdateSpaceDescriptionPayloadDto {
  id: string,
  description: string
}

export interface UpdateSpaceCategoryPayloadDto {
  id: string,
  categoryId: string
}

export interface AssignSpacePrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}

export interface UnassignSpacePrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}
