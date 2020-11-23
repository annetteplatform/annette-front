import { ActionTree } from 'vuex'
import { RootState } from '../root-state'
import {
  OrgItem,
  OrgItemFindQuery,
  OrgItemState
} from './state'
import { backendService } from 'src/services/backend.service'
import { buildActions } from 'src/lib/state'

// import Vue from 'vue'

export const actions: ActionTree<OrgItemState, RootState> = {
  ...buildActions<OrgItem, OrgItemFindQuery, RootState>(
    (query: OrgItemFindQuery) => backendService.findOrgItems(query),
    (ids: string[]) => backendService.getOrgItemsByIdFromReadSide(ids)
  ),

  async GetOrganizationForEdit ({ commit }, id: string) {
    const entity = await backendService.getOrgItemById(id, id)
    commit('StoreEntity', entity)
    return entity
  }
  //
  // async CreateEntity ({ commit }, entity: OrgItem) {
  //   const newEntity = await backendService.createOrgItem(entity)
  //   commit('StoreEntity', newEntity)
  //   return newEntity
  // },
  //
  // async UpdateEntity ({ commit }, entity: OrgItem) {
  //   const newEntity = await backendService.updateOrgItem(entity)
  //   commit('StoreEntity', newEntity)
  //   return newEntity
  // },
  //
  // async DeleteEntity ({ commit }, id: string) {
  //   await backendService.deleteOrgItem(id)
  //   commit('RemoveEntity', id)
  // }

}
