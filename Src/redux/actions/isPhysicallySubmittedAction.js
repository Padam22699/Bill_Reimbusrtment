import { types } from './types';

export function isPhysicallySubmitted(data) {
    return {
        type: types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED,
        payload: data,
    };
}

export function isPhysicallySubmittedSuccess(data) {
    return {
        type: types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED_SUCCESS,
        payload: data,
    };
}

export function isPhysicallySubmittedFailure(error) {
    return {
        type: types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearIsPhysicallySubmitted() {
    return {
        type: types.CLEAR_REQUEST_IS_PHYSICALLY_SUBMITTED,
        payload: {},
    };
}
