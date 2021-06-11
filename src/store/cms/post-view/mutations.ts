import { MutationTree } from 'vuex'
import {
  DEFAULT_POST_VIEW_FIND_QUERY, PostMetric,
  PostView, PostViewFindQuery, PostViewState
} from './state'
import {buildMutations, EntityState} from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<PostViewState> = {

  ...buildMutations<PostView, PostViewFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_POST_VIEW_FIND_QUERY()
  ),

  UpdateMetric: (state: EntityState<PostView, PostViewFindQuery>, data: PostMetric) => {
    if (state.entities[data.id]) {
      state.entities[data.id].metric = { ...data}
    }
  }

}
