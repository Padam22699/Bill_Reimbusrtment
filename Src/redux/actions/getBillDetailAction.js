import { types } from './types';

export function getBillDetail(data) {
    return {
        type: types.SEND_REQUEST_GET_BILL_DETAIL,
        payload: data,
    };
}

export function getBillDetailSuccess(data) {
    return {
        type: types.SEND_REQUEST_GET_BILL_DETAIL_SUCCESS,
        payload: data,
    };
}

export function getBillDetailFailure(error) {
    return {
        type: types.SEND_REQUEST_GET_BILL_DETAIL_FAILURE,
        payload: {},
        error: error,
    };
}

export function clearGetBillDetail() {
    return {
        type: types.CLEAR_REQUEST_GET_BILL_DETAIL,
        payload: {},
    };
}
