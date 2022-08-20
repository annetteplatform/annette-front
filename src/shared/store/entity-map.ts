import {BaseEntity} from 'src/shared/store/model';

export type EntityMap<E extends  BaseEntity> = { [key: string]: E }

export function isEntityUpdated<E extends BaseEntity>(id: string, updatedAt: string, entities: EntityMap<E>): boolean {
  const entity = entities[id]
  if (!entity) {
    return true
  }
  const lastModified = new Date(updatedAt)
  if (entity.updatedAt && lastModified > entity.updatedAt) {
    return true
  } else {
    return false
  }
}


