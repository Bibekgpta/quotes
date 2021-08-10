import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { graphActions } from './index';
import { selectNextPage } from './selectors';

const api = axios.create({
  baseURL: 'http://localhost:3333/api/',
});

function* loadQuotes(action: PayloadAction<string>) {
  const { start, key, end } = yield select(selectNextPage);
  try {
    const { data } = yield call(
      api.get,
      `quotes?key=${key}&page=0&pageSize=99999999&start=${start}&end=${end}`
    );
    yield put(graphActions.dataLoaded(data));
  } catch (error) {
    console.log(error);
  }
}

export function* graphSaga() {
  yield takeEvery(graphActions.loadData.type, loadQuotes);
}
