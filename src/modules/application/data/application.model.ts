import {BaseEntity} from 'src/shared/store';
import {AnnettePrincipal, MultiLanguageText, SimpleFilter} from 'src/shared/model';
import {Icon} from 'src/main';

export interface Application extends BaseEntity {
  id: string,
  name: string
  icon?: Icon,
  label: MultiLanguageText,
  labelDescription: MultiLanguageText,
  translations: string[],
  frontendUrl?: string,
  backendUrl?: string,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

export type ApplicationFilter = SimpleFilter

export function emptyApplicationFilter() {
  return {filter: ''}
}

