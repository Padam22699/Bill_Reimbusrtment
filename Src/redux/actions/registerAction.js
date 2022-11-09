import {types} from './types';

export function register(data) {
  return {
    type: types.SEND_REQUEST_REGISTER,
    payload: data,
  };
}

export function registerSuccess(data) {
  return {
    type: types.SEND_REQUEST_REGISTER_SUCCESS,
    payload: data,
  };
}

export function registerFailure(error) {
  return {
    type: types.SEND_REQUEST_REGISTER_FAILURE,
    payload: {},
    error: error,
  };
}

export function clearRegister() {
  return {
    type: types.CLEAR_REQUEST_REGISTER,
    payload: {},
  };
}
