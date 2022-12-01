import {AnnettePrincipal, SortBy} from 'src/shared/model';
import {BaseEntity} from 'src/shared/store';

export interface OrgItem extends BaseEntity {
  id: string,
  orgId?: string
  parentId: string
  rootPath?: string[]
  name: string
  level?: number
  itemType: string
  categoryId: string,
  source?: string,
  externalId?: string,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export interface OrgUnit extends OrgItem {
  children: string[]
  chief?: string
}

export interface OrgPosition extends OrgItem {
  limit: number,
  persons: string[]
  orgRoles: string[]
}

export interface OrgItemFilter {
  filter?: string,
  name?: string
  orgUnits?: string[]
  persons?: string[]
  orgRoles?: string[]
  fromLevel?: number
  toLevel?: number
  itemTypes?: string[]
  organizations?: string[]
  parents?: string[]
  chiefs?: string[]
  categories?: string[]
  sources?: string[]
  externalIds?: string[]
  sortBy?: SortBy[]
}

export interface CreateOrganizationPayloadDto {
  orgId: string,
  name: string,
  categoryId: string
  source?: string,
  externalId?: string,
}

export interface CreateUnitPayloadDto {
  parentId: string,
  unitId: string,
  name: string,
  categoryId: string
  order?: number
  source?: string,
  externalId?: string,
}

export interface CreatePositionPayloadDto {
  parentId: string,
  positionId: string,
  name: string,
  limit: number,
  categoryId: string
  order?: number
  source?: string,
  externalId?: string,
}

export interface UpdateNamePayloadDto {
  itemId: string,
  name: string
}

export interface AssignCategoryPayloadDto {
  itemId: string,
  categoryId: string
}

export interface ChangePositionLimitPayloadDto {
  positionId: string,
  limit: number
}

export interface AssignPersonPayloadDto {
  positionId: string,
  personId: string
}

export interface UnassignPersonPayloadDto {
  positionId: string,
  personId: string
}

export interface AssignOrgRolePayloadDto {
  positionId: string,
  orgRoleId: string
}

export interface UnassignOrgRolePayloadDto {
  positionId: string,
  orgRoleId: string
}

export interface AssignChiefPayloadDto {
  unitId: string,
  chiefId: string
}

export interface UnassignChiefPayloadDto {
  unitId: string
}

export interface UpdateSourcePayloadDto {
  itemId: string
  source?: string
}

export interface UpdateExternalIdPayloadDto {
  itemId: string
  externalId?: string
}

export interface MoveItemPayloadDto {
  itemId: string
  newParentId: string
  order?: number
}

export function extractOrg(itemId: string)  {
  const splited = itemId.split(':', 2)
  return splited[0]
}
