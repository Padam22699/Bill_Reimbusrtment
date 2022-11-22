import { types } from './types';

export function getAllBills(data) {
    return {
        type: types.SEND_REQUEST_GET_ALL_BILLS,
        payload: data,
    };
}

export function getAllBillsSuccess(data) {
    return {
        type: types.SEND_REQUEST_GET_ALL_BILLS_SUCCESS,
        payload: data,
    };
}

export function getAllBillsFailure(error) {
    return {
        type: types.SEND_REQUEST_GET_ALL_BILLS_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearGetAllBills() {
    return {
        type: types.CLEAR_REQUEST_GET_ALL_BILLS,
        payload: {},
    };
}
