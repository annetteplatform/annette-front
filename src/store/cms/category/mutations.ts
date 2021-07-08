import { MutationTree } from 'vuex'
import {
  SpaceCategoryState,
  DEFAULT_SPACE_CATEGORY_FIND_QUERY,
  SpaceCategory, SpaceCategoryFindQuery
} from './state'
import { buildMutations } from 'src/lib/state'

const DEFAULT_PAGE_SIZE = 10

export const mutations: MutationTree<SpaceCategoryState> = {

  ...buildMutations<SpaceCategory, SpaceCategoryFindQuery>(
    DEFAULT_PAGE_SIZE,
    DEFAULT_SPACE_CATEGORY_FIND_QUERY()
  )

}
