import {MutationTree} from 'vuex'
import {DEFAULT_SPACE_FIND_QUERY, Space, SpaceFindQuery, SpaceState} from './state'
import {buildMutations} from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<SpaceState> = {

  ...buildMutations<Space, SpaceFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_SPACE_FIND_QUERY()
  )

}
