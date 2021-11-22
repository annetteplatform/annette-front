import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface Space extends BaseEntity {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  active: boolean,
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

export interface AssignSpaceTargetPrincipalPayloadDto{
  id: string,
  principal: AnnettePrincipal
}

export interface UnassignSpaceTargetPrincipalPayloadDto{
  id: string,
  principal: AnnettePrincipal
}

export interface ActivateSpacePayloadDto {
  id: string
}

export interface DeactivateSpacePayloadDto {
  id: string
}



