import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, Caption, SimpleFilter} from 'src/shared/model';

export interface Application extends BaseEntity {
  id: string,
  name: string
  caption: Caption,
  translations: string[],
  serverUrl: string,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export type ApplicationFilter = SimpleFilter

export function emptyApplicationFilter() {
  return {filter: ''}
}

