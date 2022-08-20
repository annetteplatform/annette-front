import {BaseEntity} from './model';
import {InstanceMap} from './instance-map';
import {EntityMap} from './entity-map';

export interface EntityState<E extends BaseEntity, F> {
  instances: InstanceMap<F>
  entities: EntityMap<E>
  idInLoading: string[]
}

export function isEntityLoading(id: string, idInLoading: string[]) {
  if (idInLoading.find(v => v === id)) {
    return true
  } else {
    return false
  }
}
