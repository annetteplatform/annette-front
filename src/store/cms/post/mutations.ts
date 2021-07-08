import { MutationTree } from 'vuex'
import {
  DEFAULT_POST_FIND_QUERY,
  Post, PostFindQuery, PostState
} from './state'
import {buildMutations} from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<PostState> = {

  ...buildMutations<Post, PostFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_POST_FIND_QUERY()
  )

}
