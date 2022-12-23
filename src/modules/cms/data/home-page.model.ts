import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';

export interface HomePage extends BaseEntity {
  id: string,
  applicationId: string,
  principal: AnnettePrincipal,
  priority: number,
  pageId: string,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface HomePageFilter {
  applicationId?: string
  principalCodes?: string[]
  principalType?: string,
  principalId?: string
  pageId?: string
  sortBy?: SortBy[]
}

export function emptyHomePageFilter(): HomePageFilter {
  return { }
}

export interface AssignHomePagePayloadDto {
  applicationId: string,
  principal: AnnettePrincipal,
  priority: number,
  pageId: string,
}

export interface UnassignHomePagePayloadDto {
  id: string,
}
