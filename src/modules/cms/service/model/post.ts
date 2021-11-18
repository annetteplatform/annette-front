import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';

export interface Post extends BaseEntity {
  id: string,
  blogId: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: WidgetContent[],
  content?: WidgetContent[],
  publicationStatus: string,
  publicationTimestamp?: Date,
  targets?: AnnettePrincipal[],
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface WidgetContent {
  id: string,
  widgetType: string,
  data: any,
  indexData?: string
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
  introContent: WidgetContent[],
  content: WidgetContent[]
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

export interface UpdatePostWidgetContentPayloadDto {
  id: string,
  contentType: string,
  widgetContent: WidgetContent,
  order?: number
}

export interface ChangePostWidgetContentOrderPayloadDto {
  id: string,
  contentType: string,
  widgetContentId: string,
  order: number
}

export interface DeletePostWidgetContentPayloadDto {
  id: string,
  contentType: string,
  widgetContentId: string,
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

