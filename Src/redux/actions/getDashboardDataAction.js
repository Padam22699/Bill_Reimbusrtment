import { types } from './types';

export function getDashboardData(data) {
    return {
        type: types.SEND_REQUEST_GET_DASHBOARD_DATA,
        payload: data,
    };
}

export function getDashboardDataSuccess(data) {
    return {
        type: types.SEND_REQUEST_GET_DASHBOARD_DATA_SUCCESS,
        payload: data,
    };
}

export function getDashboardDataFailure(error) {
    return {
        type: types.SEND_REQUEST_GET_DASHBOARD_DATA_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearGetDashboardData() {
    return {
        type: types.CLEAR_REQUEST_GET_DASHBOARD_DATA,
        payload: {},
    };
}
