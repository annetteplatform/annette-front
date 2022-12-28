import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

export interface Blog extends BaseEntity {
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

export interface BlogFilter {
  filter?: string,
  blogIds?: string[],
  categories?: string[],
  sortBy?: SortBy[]
}

export function emptyBlogFilter() {
  return { filter: ''}
}

export interface CreateBlogPayloadDto {
  id: string,
  name: string,
  description: string,
  blogType: string,
  categoryId: string,
  authors: AnnettePrincipal[],
  targets: AnnettePrincipal[]
}

export interface UpdateBlogNamePayloadDto {
  id: string,
  name: string
}

export interface UpdateBlogDescriptionPayloadDto {
  id: string,
  description: string
}

export interface UpdateBlogCategoryPayloadDto {
  id: string,
  categoryId: string
}

export interface AssignBlogPrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}

export interface UnassignBlogPrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}



