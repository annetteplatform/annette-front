import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SortBy} from 'src/shared/model';
import {Content} from './content.model';

export interface PostView extends BaseEntity {
  id: string,
  blogId: string,
  featured: boolean,
  authorId: AnnettePrincipal,
  title: string,
  introContent: Content,
  content?: Content,
  publicationStatus: string,
  publicationTimestamp?: Date,
  metric?: PostMetric
  updatedAt: Date,
  updatedBy?: AnnettePrincipal
}

export interface PostMetric {
  id: string,
  views: number,
  likes: number,
  likedByMe: boolean
}

export interface PostViewFilter {
  filter?: string,
  blogs?: string[],
  featured?: boolean,
  authors?: AnnettePrincipal[],
  sortBy?: SortBy[]
}

export function emptyPostViewFilter() {
  return { filter: ''}
}

