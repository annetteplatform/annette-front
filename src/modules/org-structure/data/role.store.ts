import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {orgStructureService} from './service';
import {OrgRole, OrgRoleFilter, emptyOrgRoleFilter} from './role.model';

const DEFAULT_PAGE_SIZE = 10

export const useOrgRoleStore = defineStore('orgRole', () => {

  const entityStore = useEntityStore<OrgRole, OrgRoleFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyOrgRoleFilter,
    find: orgStructureService.findOrgRoles,
    getEntityById: orgStructureService.getOrgRoleById,
    getEntitiesById: orgStructureService.getOrgRolesById,
  })

  const createEntity = async (entity: OrgRole) => {
    const newEntity = await orgStructureService.createOrgRole(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntity = async (entity: OrgRole) => {
    const newEntity = await orgStructureService.updateOrgRole(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const deleteEntity = async (id: string) => {
    await orgStructureService.deleteOrgRole(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntity,
    deleteEntity
  }

})
