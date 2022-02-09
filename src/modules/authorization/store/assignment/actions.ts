import {ActionTree, Store} from 'vuex';
import {StateInterface} from 'src/store';
import {buildActionsWithCustomLoad} from 'src/shared/store/actions';
import {AssignmentFindResult, AuthAssignmentFilter, PermissionAssignment} from 'src/modules/authorization';
import {authorizationService} from 'src/modules/authorization/store/authorization.service';
import {AuthAssignmentState} from 'src/modules/authorization/store/assignment/state';
import {EntityState, LoadFailurePayload, LoadPayload, LoadSuccessPayload, Message} from 'src/shared';


async function load({commit, state}: Store<EntityState<PermissionAssignment, AuthAssignmentFilter>>, payload: LoadPayload<AuthAssignmentFilter>) {
  const instance = state.instances[payload.key]
  if (!instance) {
    throw new Error(`Instance ${payload.key} isn't initialised`)
  }

  commit('loadStarted', {key: payload.key})

  try {
    const offset = payload.fromPage * payload.pageSize
    const size = (payload.toPage + 1)* payload.pageSize
    const findResponse: AssignmentFindResult = await authorizationService.findAssignments(payload.filter, offset, size)

    const entities: PermissionAssignment[] = findResponse.hits.map(
      hit => {
        const newItem: PermissionAssignment = {
          id: hit.id,
          ...hit.assignment,
          updatedAt: new Date(hit.assignment.updatedAt)
        }
        return newItem
      })

    const loadCompletedData: LoadSuccessPayload<PermissionAssignment, AuthAssignmentFilter> = {
      ...payload,
      idInLoading: [],
      total: findResponse.total,
      ids: entities.map(e => e.id),
      entities: entities
    }

    commit('loadSuccess', loadCompletedData)
    return 'done'
  } catch (ex: any) {
    console.log(ex)
    const loadFailurePayload: LoadFailurePayload = {
      key: payload.key,
      message: ex as Message,
      idInLoading: [],
    }
    commit('loadFailure', loadFailurePayload)
    throw ex
  }
}

export const actions: ActionTree<AuthAssignmentState, StateInterface> = {
  ...buildActionsWithCustomLoad<PermissionAssignment, AuthAssignmentFilter, StateInterface>(
    load,
    // @ts-ignore
    null,
    null
  )
}
