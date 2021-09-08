import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface PrincipalGroup extends BaseEntity {
  id: string,
  name: string,
  description: string,
  categoryId: string,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface PrincipalGroupFilter {
  filter?: string,
  categories?: string[],
  sortBy?: SortBy[]
}

export interface UpdatePrincipalGroupNameDto extends BaseEntity {
  id: string,
  name: string,
}

export interface UpdatePrincipalGroupDescriptionDto extends BaseEntity {
  id: string,
  description: string,
}

export interface UpdatePrincipalGroupCategoryDto extends BaseEntity {
  id: string,
  categoryId: string,
}

export interface AssignPrincipalDto extends BaseEntity {
  id: string,
  principal: AnnettePrincipal
}

export interface UnassignPrincipalDto extends BaseEntity {
  id: string,
  principal: AnnettePrincipal
}
