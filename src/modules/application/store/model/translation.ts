import {AnnettePrincipal, BaseEntity} from 'src/common';

export interface Language extends BaseEntity {
  id: string,
  name: string
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}
