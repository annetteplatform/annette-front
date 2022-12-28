import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, MultiLanguageText, SortBy} from 'src/shared/model';
import {Icon, ServiceLink} from 'src/main';

export interface ServiceItem extends BaseEntity {
  id: string,
  name: string
  description: string,
  icon: Icon
  label: MultiLanguageText,
  labelDescription: MultiLanguageText,
  type: string,
  active: boolean,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export interface  Service extends ServiceItem {
  link: ServiceLink,
}

export interface  Group extends ServiceItem {
  children: string[]
}

export interface ServiceItemFilter {
  filter?: string,
  types?: string[],
  ids?: string[],
  active?: boolean,
  sortBy?: SortBy[]
}

export function emptyServiceItemFilter() {
  return { filter: ''}
}
