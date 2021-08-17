import {AnnettePrincipal, BaseEntity, Caption} from 'src/common';

export interface Application extends BaseEntity {
  id: string,
  name: string
  caption: Caption,
  translations: string[],
  serverUrl: string,
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}

