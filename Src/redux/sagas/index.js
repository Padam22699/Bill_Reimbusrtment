import { spawn } from "redux-saga/effects"
import saga from "./saga"

export default function* rootSaga() {
    yield spawn(saga)
}