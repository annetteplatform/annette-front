import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

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

export interface ActivateSpacePayloadDto {
  id: string
}

export interface DeactivateSpacePayloadDto {
  id: string
}



