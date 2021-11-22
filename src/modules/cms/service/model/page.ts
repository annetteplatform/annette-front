import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';
import {WidgetContent} from './widget-content';

export interface Page extends BaseEntity {
  id: string,
  spaceId: string,
  authorId: AnnettePrincipal,
  title: string,
  content?: WidgetContent[],
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

export interface CreatePagePayloadDto {
  id: string,
  spaceId: string,
  authorId: AnnettePrincipal,
  title: string,
  content: WidgetContent[]
}


export interface UpdatePageTitlePayloadDto {
  id: string,
  title: string
}

export interface UpdatePageAuthorPayloadDto {
  id: string,
  authorId: AnnettePrincipal
}

export interface UpdatePageWidgetContentPayloadDto {
  id: string,
  widgetContent: WidgetContent,
  order?: number
}

export interface ChangePageWidgetContentOrderPayloadDto {
  id: string,
  widgetContentId: string,
  order: number
}

export interface DeletePageWidgetContentPayloadDto {
  id: string,
  widgetContentId: string,
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





