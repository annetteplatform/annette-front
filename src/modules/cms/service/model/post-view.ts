import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';
import {Content} from './content';

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
