import {AnnettePrincipal} from 'src/shared/model';

export interface Updated {
  updatedAt: Date,
  updatedBy: AnnettePrincipal
}


export interface UpdateResponse<T> {
  payload: T,
  updated: Updated
}
