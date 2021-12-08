import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

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

export interface AssignHomePagePayloadDto {
  applicationId: string,
  principal: AnnettePrincipal,
  priority: number,
  pageId: string,
}

export interface UnassignHomePagePayloadDto {
  id: string,
}
