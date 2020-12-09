// OrgItem specific declarations

import { AnnettePrincipal, BaseEntity, EntityState, SortBy } from 'src/lib/state'

export type OrgItemState = EntityState<OrgItem, OrgItemFindQuery>

export interface OrgItem extends BaseEntity {
  id: string,
  orgId: string
  parentId: string
  rootPath: string[]
  name: string
  shortName: string
  level: number
  itemType: string
  categoryId: string,
  updatedAt: Date
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

export interface OrgItemDto {
  id: string,
  orgId: string
  parentId: string
  rootPath: string[]
  name: string
  shortName: string
  categoryId: string,
  level: number
  itemType: string
}

export interface OrgUnitDto extends OrgItemDto {
  children: string[]
  chief?: string
}

export interface OrgPositionDto extends OrgItemDto {
  limit: number,
  persons: string[]
  orgRoles: string[]
}

export interface OrgItemFindQuery {
  offset: number
  size: number,
  filter?: string,
  name?: string
  shortName?: string
  orgUnits?: string[]
  persons?: string[]
  orgRoles?: string[]
  fromLevel?: number
  toLevel?: number
  itemTypes?: string[]
  organizations?: string[]
  parents?: string[]
  chiefs?: string[]
  // attributes: Option[AttributeQuery] = None,
  sortBy?: SortBy[]
}

export const DEFAULT_ORG_ITEM_FIND_QUERY: OrgItemFindQuery = {
  offset: 0,
  size: 0,
  filter: '',
  sortBy: [{
    field: 'name',
    ascending: true
  }
  ]

}

export const DEFAULT_ORGANIZATION_FIND_QUERY: OrgItemFindQuery = {
  offset: 0,
  size: 0,
  filter: '',
  parents: ['ROOT']
  // sortBy: [{
  //   field: 'name',
  //   ascending: true
  // }
  // ]

}

export interface CreateOrganizationPayloadDto {
  orgId: string,
  name: string,
  shortName: string,
  categoryId: string
}

export interface CreateUnitPayloadDto {
  orgId: string,
  parentId: string,
  unitId: string,
  name: string,
  shortName: string,
  categoryId: string
  order?: number
}

export interface CreatePositionPayloadDto {
  orgId: string,
  parentId: string,
  positionId: string,
  name: string,
  shortName: string,
  limit: number,
  categoryId: string
  order?: number
}

export interface UpdateNamePayloadDto {
  orgId: string,
  orgItemId: string,
  name: string
}

export interface UpdateShortNamePayloadDto {
  orgId: string,
  orgItemId: string,
  shortName: string
}

export interface AssignCategoryPayloadDto {
  orgId: string,
  itemId: string,
  categoryId: string
}

export interface ChangePositionLimitPayloadDto {
  orgId: string,
  positionId: string,
  limit: number
}

export interface AssignPersonPayloadDto {
  orgId: string,
  positionId: string,
  personId: string
}

export interface UnassignPersonPayloadDto {
  orgId: string,
  positionId: string,
  personId: string
}
