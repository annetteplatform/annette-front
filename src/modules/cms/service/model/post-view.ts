import {AnnettePrincipal, BaseEntity, SortBy} from 'src/shared';
import {PostContent} from 'src/modules/cms';

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

export interface PostMetric extends PostContent{
  id: string,
  views: number,
  likes: number,
  likedByMe: boolean
}

export interface PostViewFilter {
  filter?: string,
  spaces?: string[],
  featured?: boolean,
  authors?: AnnettePrincipal[],
  sortBy?: SortBy[]
}
