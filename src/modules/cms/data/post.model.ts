import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';
import {Content} from './content.model';
import {Action} from './action.model';
import {Files} from './file.model';

export interface Post extends BaseEntity {
  id: string,
  blogId: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: Content,
  content?: Content,
  publicationStatus: string,
  publicationTimestamp?: Date,
  targets?: AnnettePrincipal[],
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}


export interface PostFilter {
  filter: string,
  postIds?: string[],
  blogs?: string[],
  featured?: boolean,
  authors?: AnnettePrincipal[],
  publicationStatus?: string,
  publicationTimestampFrom?: Date,
  publicationTimestampTo?: Date,
  targets?: AnnettePrincipal[],
  sortBy?: SortBy[]
}

export function emptyPostFilter() {
  return {filter: ''}
}

export interface CreatePostPayloadDto {
  id: string,
  blogId: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: Content,
  content: Content
}

export interface UpdatePostFeaturedPayloadDto {
  id: string,
  featured: boolean
}

export interface UpdatePostTitlePayloadDto {
  id: string,
  title: string
}

export interface UpdatePostAuthorPayloadDto {
  id: string,
  authorId: AnnettePrincipal
}


export interface UpdatePostPublicationTimestampPayloadDto {
  id: string,
  publicationTimestamp?: Date
}

export interface AssignPostTargetPrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}

export interface UnassignPostTargetPrincipalPayloadDto {
  id: string,
  principal: AnnettePrincipal
}

export interface PostEditor {
  action?: Action,
  id?: string
  contentType?: string
  post?: Post
  blogName?: string
  files: Files
}


export interface InitPostEditorPayload {
  action: Action,
  id: string,
  blogId?: string // only for create action
  personId?: string // only for create action
}

export interface InitPostContentEditorPayload {
  action: Action,
  id: string,
  contentType: string
}





