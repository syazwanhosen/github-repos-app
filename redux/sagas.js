import { all } from "redux-saga/effects";
import repoSaga from "./repos/repoSaga";

export default function* rootSaga() {
  yield all([repoSaga()]);
}
