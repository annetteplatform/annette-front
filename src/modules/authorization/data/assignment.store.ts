import {defineStore} from 'pinia';
import {LoadPayload, LoadSuccessPayload} from 'src/shared/store';
import {authorizationService} from 'src/modules/authorization/data/service';
import {Message} from 'src/shared/model';
import {
  AssignmentFindResult,
  AuthAssignmentFilter,
  emptyAuthAssignmentFilter,
  PermissionAssignment
} from 'src/modules/authorization';
import {EntityState, useCustomEntityStore} from 'src/shared/store/custom-store';

const DEFAULT_PAGE_SIZE = 10

async function load(
  state: EntityState<PermissionAssignment, AuthAssignmentFilter>,
  payload: LoadPayload<AuthAssignmentFilter>) {
  const instance = state.instances.value[payload.key]
  if (!instance) {
    throw new Error(`Instance ${payload.key} isn't initialised`)
  }

  // commit('loadStarted', {key: payload.key})
  instance.loading = true
  instance.message = undefined

  try {
    const offset = payload.fromPage * payload.pageSize
    const size = (payload.toPage + 1) * payload.pageSize
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

    state.loadSuccess(loadCompletedData)
    return 'done'
  } catch (ex: any) {
    console.log(ex)
    // commit('loadFailure', loadFailurePayload)
    instance.loading = false
    instance.message = ex as Message
    throw ex
  }
}

export const useAuthAssignmentStore = defineStore('authAssignment', () => {

  const entityStore = useCustomEntityStore<PermissionAssignment, AuthAssignmentFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyAuthAssignmentFilter,
    load: load,
  })

  return {
    ...entityStore,
  }

})
