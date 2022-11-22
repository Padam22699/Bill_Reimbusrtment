import { types } from './types';

export function reminder(data) {
    return {
        type: types.SEND_REQUEST_REMINDER,
        payload: data,
    };
}

export function reminderSuccess(data) {
    return {
        type: types.SEND_REQUEST_REMINDER_SUCCESS,
        payload: data,
    };
}

export function reminderFailure(error) {
    return {
        type: types.SEND_REQUEST_REMINDER_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearReminder() {
    return {
        type: types.CLEAR_REQUEST_REMINDER,
        payload: {},
    };
}
