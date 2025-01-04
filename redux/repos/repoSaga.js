import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
} from "./repoSlice";

import { fetchReposApi } from "../../services/githubApi";

function* fetchRepos(action) {
  try {
    const response = yield call(fetchReposApi, action.payload);
    yield put(fetchReposSuccess(response.data.items));
  } catch (error) {
    yield put(fetchReposFailure(error.response.data.message));
  }
}

export default function* repoSaga() {
  yield takeLatest(fetchReposRequest.type, fetchRepos);
}
