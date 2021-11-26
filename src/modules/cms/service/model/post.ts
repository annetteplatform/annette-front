import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';
import {Content} from './content';

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
