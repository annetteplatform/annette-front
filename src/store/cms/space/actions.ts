import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  CreateSpacePayloadDto,
  Space,
  SpaceFindQuery,
  SpaceState
} from './state'
import { cmsService } from '../cms.service'
import { buildActions } from 'src/lib/state'

export const actions: ActionTree<SpaceState, RootState> = {
  ...buildActions<Space, SpaceFindQuery, RootState>(
    (query: SpaceFindQuery) => cmsService.findSpaces(query),
    (ids: string[]) => cmsService.getSpacesById(ids)
  ),

  async LoadEntitiesIfNotExist ({ commit, state }, ids: string[]) {
    const entitiesToLoad: string[] = ids.filter(id => !state.entities[id])
    if (entitiesToLoad.length > 0) {
      const entities = await cmsService.getSpacesById(entitiesToLoad)
      commit('StoreEntities', entities)
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    } else {
      return ids.filter(id => state.entities[id]).map(id => state.entities[id])
    }
  },

  async CreateSpace ({ commit }, space: CreateSpacePayloadDto) {
    const entity = await cmsService.createSpace(space)
    commit('StoreEntity', entity)
    return entity
  }

}
