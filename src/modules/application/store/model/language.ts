import {AnnettePrincipal, BaseEntity} from 'src/shared';

export interface Language extends BaseEntity {
  id: string,
  name: string
  updatedAt?: Date
  updatedBy?: AnnettePrincipal
}
