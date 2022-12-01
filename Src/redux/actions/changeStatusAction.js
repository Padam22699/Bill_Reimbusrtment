import { types } from './types';

export function changeStatus(data) {
    return {
        type: types.SEND_REQUEST_CHANGE_STATUS,
        payload: data,
    };
}

export function changeStatusSuccess(data) {
    return {
        type: types.SEND_REQUEST_CHANGE_STATUS_SUCCESS,
        payload: data,
    };
}

export function changeStatusFailure(error) {
    return {
        type: types.SEND_REQUEST_CHANGE_STATUS_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearChangeStatus() {
    return {
        type: types.CLEAR_REQUEST_CHANGE_STATUS,
        payload: {},
    };
}
