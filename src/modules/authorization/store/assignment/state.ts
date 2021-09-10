import {EntityState} from 'src/shared';
import {AuthAssignmentFilter,  PermissionAssignment} from 'src/modules/authorization';
import {PERMISSION_IDS} from 'src/modules/authorization/store/model/permission-ids';
import {PRINCIPAL_TYPES} from 'src/modules/authorization/store/model/principal-types';

export const AUTH_ASSIGNMENT_DEFAULT_PAGE_SIZE = 10


export interface AuthAssignmentState extends EntityState<PermissionAssignment, AuthAssignmentFilter> {
  permissionIds: string[]
  principalTypes: string[]
}


export function authAssignmentState(): AuthAssignmentState {
  return {
    instances: {},
    entities: {},
    idInLoading: [],
    permissionIds: PERMISSION_IDS,
    principalTypes: PRINCIPAL_TYPES
  }
}

export function emptyAuthAssignmentFilter() {
  return {
    permission: {
      id: '',
      arg1: '',
      arg2: '',
      arg3: ''
    },
    principal: {
      principalType: '',
      principalId: ''
    },
    source: {
      sourceType: '',
      sourceId: ''
    }
  }
}
