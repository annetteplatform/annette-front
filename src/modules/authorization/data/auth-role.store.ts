import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {AuthRole, AuthRoleFilter, emptyAuthRoleFilter} from './auth-role.model';
import {authorizationService} from 'src/modules/authorization/data/service';

const DEFAULT_PAGE_SIZE = 10

export const useAuthRoleStore = defineStore('authRole', () => {

  const entityStore = useEntityStore<AuthRole, AuthRoleFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyAuthRoleFilter,
    find: authorizationService.findRoles,
    getEntity: authorizationService.getRole,
    getEntities: authorizationService.getRoles,
  })

  const createEntity = async (entity: AuthRole) => {
    const newEntity = await authorizationService.createRole(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: AuthRole) => {
    const newEntity = await authorizationService.updateRole(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await authorizationService.deleteRole(id)
    entityStore.removeEntity(id)
  }

  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})
