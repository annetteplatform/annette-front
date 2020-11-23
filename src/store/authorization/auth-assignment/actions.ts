import { ActionTree } from 'vuex'
import { RootState } from '../../root-state'
import {
  AssignmentFindResult,
  AuthAssignmentState,
  FindAssignmentsQuery, PermissionAssignment
} from './state'
import { authorizationService } from '../authorization.service'
import { buildActionsWithCustomLoad, LoadCompletedData, LoadData } from 'src/lib/state'

// import Vue from 'vue'

async function load ({ commit, state }, data: LoadData<FindAssignmentsQuery>) {
  const instance = state.instances[data.instanceKey]
  if (!instance) {
    throw new Error(`Instance ${data.instanceKey} isn't initialised`)
  }

  commit('LoadStarted', { instanceKey: data.instanceKey })

  const filter: FindAssignmentsQuery = {
    ...data.filter,
    offset: Math.max((data.fromPage - 1) * instance.pageSize, 0),
    size: (data.toPage - data.fromPage + 1) * instance.pageSize
  }

  const findResponse: AssignmentFindResult = await authorizationService.findAssignments(filter)

  const entities = {}
  Object.values(findResponse.hits).forEach(hit => {
    const newItem: PermissionAssignment = {
      id: hit.id,
      ...hit.assignment
    }
    newItem.updatedAt = new Date(newItem.updatedAt)
    entities[hit.id] = newItem
  })

  const loadCompletedData: LoadCompletedData<PermissionAssignment> = {
    instanceKey: data.instanceKey,
    fromPage: data.fromPage,
    toPage: data.toPage,
    total: findResponse.total,
    ids: Object.values(findResponse.hits).map(v => v.id),
    entities: entities,
    page: data.page,
    clearPages: data.clearPages
  }

  commit('LoadCompleted', loadCompletedData)
  return 'done'
}

export const actions: ActionTree<AuthAssignmentState, RootState> = {
  ...buildActionsWithCustomLoad<PermissionAssignment, FindAssignmentsQuery, RootState>(load)

}
