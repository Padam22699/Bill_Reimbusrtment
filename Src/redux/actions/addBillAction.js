import { types } from './types';

export function addBill(data) {
    return {
        type: types.SEND_REQUEST_ADD_BILL,
        payload: data,
    };
}

export function addBillSuccess(data) {
    return {
        type: types.SEND_REQUEST_ADD_BILL_SUCCESS,
        payload: data,
    };
}

export function addBillFailure(error) {
    return {
        type: types.SEND_REQUEST_ADD_BILL_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearAddBill() {
    return {
        type: types.CLEAR_REQUEST_ADD_BILL,
        payload: {},
    };
}
