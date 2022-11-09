import { put, call, takeEvery } from 'redux-saga/effects';
import { types } from '../actions/types';
import {
    getNotification,
    login, register
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

export default function* saga() {
    yield takeEvery(types.SEND_REQUEST_REGISTER, registerSaga);
    yield takeEvery(types.SEND_REQUEST_LOGIN, loginSaga);
    yield takeEvery(types.SEND_REQUEST_NOTIFICATION, notificationSaga);
}
