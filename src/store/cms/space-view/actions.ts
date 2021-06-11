import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  SpaceView,
  SpaceViewFindQuery,
  SpaceViewState
} from './state'
import { cmsService } from '../cms.service'
import { buildActions } from 'src/lib/state'

export const actions: ActionTree<SpaceViewState, RootState> = {
  ...buildActions<SpaceView, SpaceViewFindQuery, RootState>(
    (query: SpaceViewFindQuery) => cmsService.findSpaceViews(query),
    (ids: string[]) => cmsService.getSpaceViewsById(ids)
  )

}
