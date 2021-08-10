import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { quoteActions } from './index';
import { selectNextPage } from './selectors';

const api = axios.create({
  baseURL: 'http://localhost:3333/api/',
});

function* loadKey(action: PayloadAction<string>) {
  try {
    const { data } = yield call(api.get, `quotes/key?k=${action.payload}`);
    yield put(quoteActions.keysLoaded(data));
  } catch (error) {
    console.log(error);
  }
}

function* loadQuotes(action: PayloadAction<string>) {
  const { page, pageSize, start, key, end } = yield select(selectNextPage);
  try {
    const { data } = yield call(
      api.get,
      `quotes?key=${key}&page=${page}&pageSize=${pageSize}&start=${start}&end=${end}`
    );
    yield put(quoteActions.dataLoaded(data));
  } catch (error) {
    console.log(error);
  }
}

function* loadMoreQuotes() {
  const { page, pageSize, start, key, end } = yield select(selectNextPage);
  try {
    const { data } = yield call(
      api.get,
      `quotes?key=${key}&page=${page}&pageSize=${pageSize}&start=${start}&end=${end}`
    );
    yield put(quoteActions.moreLoaded(data));
  } catch (error) {
    console.log(error);
  }
}

export function* quoteSaga() {
  yield takeLatest(quoteActions.loadkey.type, loadKey);
  yield takeEvery(quoteActions.loadData.type, loadQuotes);
  yield takeEvery(quoteActions.loadMore.type, loadMoreQuotes);
  yield takeEvery(quoteActions.setFilters.type, loadQuotes);
  yield takeEvery(quoteActions.setPage.type, loadQuotes);
  yield takeEvery(quoteActions.setPagination.type, loadQuotes);
  yield takeEvery(quoteActions.setPageSize.type, loadQuotes);
}
