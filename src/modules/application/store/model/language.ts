import {AnnettePrincipal, BaseEntity} from 'src/common';

export interface Translation extends BaseEntity {
  id: string,
  name: string
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}
