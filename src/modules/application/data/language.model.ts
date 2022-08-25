import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, SimpleFilter} from 'src/shared/model';

export interface Language extends BaseEntity {
  id: string,
  name: string
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export type LanguageFilter = SimpleFilter

export function emptyLanguageFilter() {
  return {filter: ''}
}
