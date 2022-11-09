import { types } from './types';

export function getNotification(data) {
    return {
        type: types.SEND_REQUEST_NOTIFICATION,
        payload: data,
    };
}

export function notificationSuccess(data) {
    return {
        type: types.SEND_REQUEST_NOTIFICATION_SUCCESS,
        payload: data,
    };
}

export function notificationFailure(error) {
    return {
        type: types.SEND_REQUEST_NOTIFICATION_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearNotification() {
    return {
        type: types.CLEAR_REQUEST_NOTIFICATION,
        payload: {},
    };
}
