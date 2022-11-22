import { types } from './types';

export function forgotPassword(data) {
    return {
        type: types.SEND_REQUEST_FORGOT_PASSWORD,
        payload: data,
    };
}

export function forgotPasswordSuccess(data) {
    return {
        type: types.SEND_REQUEST_FORGOT_PASSWORD_SUCCESS,
        payload: data,
    };
}

export function forgotPasswordFailure(error) {
    return {
        type: types.SEND_REQUEST_FORGOT_PASSWORD_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearForgotPassword() {
    return {
        type: types.CLEAR_REQUEST_FORGOT_PASSWORD,
        payload: {},
    };
}
