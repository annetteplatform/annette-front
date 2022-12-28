import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';
import {Content} from './content.model';
import {Action} from './action.model';
import {Files} from './file.model';

export interface Page extends BaseEntity {
  id: string,
  spaceId: string,
  authorId: AnnettePrincipal,
  title: string,
  content?: Content,
  publicationStatus: string,
  publicationTimestamp?: Date,
  targets?: AnnettePrincipal[],
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}


export interface PageFilter {
  filter: string,
  pageIds?: string[],
  spaces?: string[],
  authors?: AnnettePrincipal[],
  publicationStatus?: string,
  publicationTimestampFrom?: Date,
  publicationTimestampTo?: Date,
  targets?: AnnettePrincipal[],
  sortBy?: SortBy[]
}

export function emptyPageFilter() {
  return { filter: ''}
}

export interface CreatePagePayloadDto {
  id: string,
  spaceId: string,
  authorId: AnnettePrincipal,
  title: string,
  content: Content
}

export interface UpdatePageTitlePayloadDto {
  id: string,
  title: string
}

export interface UpdatePageAuthorPayloadDto {
  id: string,
  authorId: AnnettePrincipal
}

export interface UpdatePagePublicationTimestampPayloadDto {
  id: string,
  publicationTimestamp?: Date
}

export interface AssignPageTargetPrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}

export interface UnassignPageTargetPrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}

export interface PageEditor {
  action?: Action,
  id?: string
  page?: Page
  spaceName?: string
  files: Files
}


export interface InitPageEditorPayload {
  action: Action,
  id: string,
  spaceId?: string // only for create action
  personId?: string // only for create action
}

export interface InitPageContentEditorPayload {
  action: Action,
  id: string,
}







