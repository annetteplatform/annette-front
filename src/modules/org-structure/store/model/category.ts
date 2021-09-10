import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface OrgCategory extends BaseEntity{
  id: string,
  name: string,
  forOrganization: boolean,
  forUnit: boolean,
  forPosition: boolean
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface OrgCategoryFilter {
  filter?: string
  name?: string
  sortBy?: SortBy[]
}
