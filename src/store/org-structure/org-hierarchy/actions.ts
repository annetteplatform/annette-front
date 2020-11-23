import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  OrgItem,
  OrgItemFindQuery,
  OrgItemState
} from './state'
import { orgStructureService } from '../org-structure.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<OrgItemState, RootState> = {
  ...buildActions<OrgItem, OrgItemFindQuery, RootState>(
    (query: OrgItemFindQuery) => orgStructureService.findOrgItems(query),
    (ids: string[]) => orgStructureService.getOrgItemsByIdFromReadSide(ids)
  ),

  async GetOrganizationForEdit ({ commit }, id: string) {
    const entity = await orgStructureService.getOrgItemById(id, id)
    commit('StoreEntity', entity)
    return entity
  }
  //
  // async CreateEntity ({ commit }, entity: OrgItem) {
  //   const newEntity = await orgStructureService.createOrgItem(entity)
  //   commit('StoreEntity', newEntity)
  //   return newEntity
  // },
  //
  // async UpdateEntity ({ commit }, entity: OrgItem) {
  //   const newEntity = await orgStructureService.updateOrgItem(entity)
  //   commit('StoreEntity', newEntity)
  //   return newEntity
  // },
  //
  // async DeleteEntity ({ commit }, id: string) {
  //   await orgStructureService.deleteOrgItem(id)
  //   commit('RemoveEntity', id)
  // }

}
