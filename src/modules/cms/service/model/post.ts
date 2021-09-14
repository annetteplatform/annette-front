import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';



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
  targets?: AnnettePrincipal[],
  media?: {[key: string]: Media },
  docs?: {[key: string]: Doc },
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

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

export interface PostFilter {
  filter: string,
  postIds?: string[],
  spaces?: string[],
  featured?: boolean,
  authors?: AnnettePrincipal[],
  publicationStatus?: string,
  publicationTimestampFrom?: Date,
  publicationTimestampTo?: Date,
  targets?: AnnettePrincipal[],
  sortBy?: SortBy[]
}


export interface  CreatePostPayloadDto {
  id: string,
  spaceId: string,
  parent?: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: PostContent,
  content: PostContent
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



export interface UpdatePostIntroPayloadDto {
  id: string
  introContent: PostContent
}

export interface UpdatePostContentPayloadDto {
  id: string
  content: PostContent
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

export interface DeletePostPayloadDto {
  id: string
}

