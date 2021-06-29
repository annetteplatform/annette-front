
// Person specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export interface Media {
  id: string,
  filename: string
}

export interface Doc {
  id: string,
  name: string
  filename: string
}

export interface PostContent {
  type: string,
}

export interface MarkdownContent extends PostContent{
  type: string,
  markdown: string
}

export interface HtmlContent extends PostContent{
  type: string,
  html: string
}

export interface Post extends BaseEntity {
  id: string,
  spaceId: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: PostContent,
  content?: PostContent,
  publicationStatus: string,
  publicationTimestamp?: Date,
  targets: AnnettePrincipal[],
  media: {[key: string]: Media },
  docs: {[key: string]: Doc },
  updatedAt: Date,
  updatedBy?: AnnettePrincipal

}

export interface PostFindQuery {
  offset: number
  size: number,
  filter?: string,
  spaces?: string[],
  featured?: boolean,
  authors?: AnnettePrincipal[],
  sortBy?: SortBy[]
}

export type PostState = EntityState<Post, PostFindQuery>

export function DEFAULT_POST_FIND_QUERY():PostFindQuery {
  return {
    offset: 0,
    size: 10,
    filter: ''
  }
}

export interface CreatePostPayloadDto {
  id: string,
  spaceId: string,
  parent? : string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: PostContent,
  content: PostContent,
}

export interface UpdatePostTitlePayloadDto {
  id: string,
  title: string,
}

export interface UpdatePostAuthorPayloadDto {
  id: string,
  authorId: AnnettePrincipal,
}

export interface UpdatePostIntroPayloadDto {
  id: string,
  introContent: PostContent,
}

export interface UpdatePostContentPayloadDto {
  id: string,
  content: PostContent,
}

export interface UpdatePostPublicationTimestampPayloadDto {
  id: string,
  publicationTimestamp?: Date
}
