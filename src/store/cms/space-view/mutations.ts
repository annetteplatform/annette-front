import {MutationTree} from 'vuex'
import {DEFAULT_SPACE_VIEW_FIND_QUERY, SpaceView, SpaceViewFindQuery, SpaceViewState} from './state'
import {buildMutations, EntityState} from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<SpaceViewState> = {

  ...buildMutations<SpaceView, SpaceViewFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_SPACE_VIEW_FIND_QUERY()
  ),

  UpdateSubscriptions: (state: EntityState<SpaceView, SpaceViewFindQuery>, {id, subscriptions}) => {
    if (state.entities[id]) {
      state.entities[id].subscriptions = [...subscriptions]
    }
  }

}
