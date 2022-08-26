import {BaseEntity, BaseFilter} from './model';
import {InstanceMap} from './instance-map';
import {EntityMap} from './entity-map';

export interface EntityState<E extends BaseEntity, F extends BaseFilter> {
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
