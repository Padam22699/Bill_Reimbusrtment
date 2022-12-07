import {types} from './types';

export function addSuperAdmin(data) {
  return {
    type: types.SEND_REQUEST_ADD_SUPER_ADMIN,
    payload: data,
  };
}
export function addSuperAdminSuccess(data) {
  return {
    type: types.SEND_REQUEST_ADD_SUPER_ADMIN_SUCCESS,
    payload: data,
  };
}
export function addSuperAdminFailure(error) {
  return {
    type: types.SEND_REQUEST_ADD_SUPER_ADMIN_FAILURE,
    payload: {},
    error: error,
  };
}
export function clearSuperAdmin(error) {
  return {
    type: types.CLEAR_REQUEST_ADD_SUPER_ADMIN,
    payload: {},
  };
}
