import { put, call, takeEvery } from 'redux-saga/effects';
import { types } from '../actions/types';
import {
    addBill,
    changeStatus,
    forgotPassword,
    getAllBills,
    getBillDetail,
    getNotification,
    isPhysicallySubmitted,
    login, register, reminder
} from '../apis/Api';

function* registerSaga({ payload, error }) {
    try {
        const response = yield call(register, payload);
        yield put({
            type: types.SEND_REQUEST_REGISTER_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_REGISTER_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* loginSaga({ payload, error }) {
    try {
        const response = yield call(login, payload);
        yield put({
            type: types.SEND_REQUEST_LOGIN_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_LOGIN_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* notificationSaga({ payload, error }) {
    try {
        const response = yield call(getNotification, payload);
        yield put({
            type: types.SEND_REQUEST_NOTIFICATION_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_NOTIFICATION_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* forgotPasswordSaga({ payload, error }) {
    try {
        const response = yield call(forgotPassword, payload);
        yield put({
            type: types.SEND_REQUEST_FORGOT_PASSWORD_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_FORGOT_PASSWORD_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* addBillSaga({ payload, error }) {
    try {
        const response = yield call(addBill, payload);
        yield put({
            type: types.SEND_REQUEST_ADD_BILL_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_ADD_BILL_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* getAllBillsSaga({ payload, error }) {
    try {
        const response = yield call(getAllBills, payload);
        yield put({
            type: types.SEND_REQUEST_GET_ALL_BILLS_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_GET_ALL_BILLS_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* getBillDetailSaga({ payload, error }) {
    try {
        const response = yield call(getBillDetail, payload);
        yield put({
            type: types.SEND_REQUEST_GET_BILL_DETAIL_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_GET_BILL_DETAIL_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* isPhysicallySubmittedSaga({ payload, error }) {
    try {
        const response = yield call(isPhysicallySubmitted, payload);
        yield put({
            type: types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* reminderSaga({ payload, error }) {
    try {
        const response = yield call(reminder, payload);
        yield put({
            type: types.SEND_REQUEST_REMINDER_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_REMINDER_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

function* changeStatusSaga({ payload, error }) {
    try {
        const response = yield call(changeStatus, payload);
        yield put({
            type: types.SEND_REQUEST_CHANGE_STATUS_SUCCESS,
            payload: response
        });
    } catch (err) {
        yield put({
            type: types.SEND_REQUEST_CHANGE_STATUS_FAILURE,
            payload: error
        });
        console.log(err);
    }
}

export default function* saga() {
    yield takeEvery(types.SEND_REQUEST_REGISTER, registerSaga);
    yield takeEvery(types.SEND_REQUEST_LOGIN, loginSaga);
    yield takeEvery(types.SEND_REQUEST_NOTIFICATION, notificationSaga);
    yield takeEvery(types.SEND_REQUEST_FORGOT_PASSWORD, forgotPasswordSaga);
    yield takeEvery(types.SEND_REQUEST_ADD_BILL, addBillSaga);
    yield takeEvery(types.SEND_REQUEST_GET_ALL_BILLS, getAllBillsSaga);
    yield takeEvery(types.SEND_REQUEST_GET_BILL_DETAIL, getBillDetailSaga);
    yield takeEvery(types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED, isPhysicallySubmittedSaga);
    yield takeEvery(types.SEND_REQUEST_REMINDER, reminderSaga);
    yield takeEvery(types.SEND_REQUEST_CHANGE_STATUS, changeStatusSaga);
}
