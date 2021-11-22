import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';
import {WidgetContent} from './widget-content';

export interface PageView extends BaseEntity {
  id: string,
  spaceId: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  content?: WidgetContent[],
  publicationStatus: string,
  publicationTimestamp?: Date,
  metric?: PageMetric
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface PageMetric {
  id: string,
  views: number,
  likes: number,
  likedByMe: boolean
}

export interface PageViewFilter {
  filter?: string,
  spaces?: string[],
  featured?: boolean,
  authors?: AnnettePrincipal[],
  sortBy?: SortBy[]
}
