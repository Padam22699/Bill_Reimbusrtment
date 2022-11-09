import { types } from './types';

export function login(data) {
    return {
        type: types.SEND_REQUEST_LOGIN,
        payload: data,
    };
}

export function loginSuccess(data) {
    return {
        type: types.SEND_REQUEST_LOGIN_SUCCESS,
        payload: data,
    };
}

export function loginFailure(error) {
    return {
        type: types.SEND_REQUEST_LOGIN_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearLogin() {
    return {
        type: types.CLEAR_REQUEST_LOGIN,
        payload: {},
    };
}
