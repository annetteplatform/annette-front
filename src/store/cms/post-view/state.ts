
// Person specific declarations

import {
  AnnettePrincipal,
  EntityState,
  SortBy,
  BaseEntity
} from 'src/lib/state'

export interface PostView extends BaseEntity {
  id: string,
  spaceId: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: PostContent,
  content?: PostContent,
  publicationStatus: string,
  publicationTimestamp?: Date,
  metric?: PostMetric
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
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

export interface PostMetric extends PostContent{
  id: string,
  views: number,
  likes: number,
  likedByMe: boolean
}

export interface PostViewFindQuery {
  offset: number
  size: number,
  filter?: string,
  spaces?: string[],
  featured?: boolean,
  authors?: AnnettePrincipal[],
  sortBy?: SortBy[]
}

export type PostViewState = EntityState<PostView, PostViewFindQuery>

export function DEFAULT_POST_VIEW_FIND_QUERY():PostViewFindQuery {
  return {
    offset: 0,
    size: 10,
    filter: ''
  }
}
