import { put } from 'redux-saga/effects';
import { errorHandler } from '../../../utils';
import {
  getAddressStart,
  getAddressSuccess,
  getAddressFail,
  addAddressStart,
  addAddressSuccess,
  addAddressFail,
  editAddressStart,
  editAddressSuccess,
  editAddressFail,
  deleteAddressStart,
  deleteAddressSuccess,
  deleteAddressFail,
  getCountryStart,
  getCountrySuccess,
  getCountryFail,
  setPrimaryAddressStart,
  setPrimaryAddressSuccess,
  setPrimaryAddressFail,
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFail,
  getCmsStart,
  getCmsSuccess,
  getCmsFail,
  // getCoinDetailsSaga as getCoinDetails,
} from '../../actions';

export function* getAddressSaga() {
  yield put(getAddressStart());
  yield errorHandler({
    endpoint: '/users/get-address',
    successHandler: yield function* (response) {
      yield put(getAddressSuccess(response.data));
    },
    failHandler: getAddressFail,
    apiType: 'get',
  });
}

export function* addAddressSaga(action) {
  yield put(addAddressStart());
  const { data, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/users/post-address`,
    successHandler: yield function* (response) {
      yield put(addAddressSuccess(response.data));
      closeModel();
    },
    failHandler: addAddressFail,
    apiType: 'post',
    payload: data,
  });
}

export function* editAddressSaga(action) {
  yield put(editAddressStart());
  const { data, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/users/edit-address`,
    successHandler: yield function* (response) {
      yield put(editAddressSuccess(response.data));
      closeModel();
    },
    failHandler: editAddressFail,
    apiType: 'put',
    payload: data,
  });
}

export function* deleteAddressSaga(action) {
  yield put(deleteAddressStart());
  const { data, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/users/delete-address/${data.id}`,
    successHandler: yield function* (response) {
      yield put(deleteAddressSuccess(response.data));
      closeModel();
    },
    failHandler: deleteAddressFail,
    apiType: 'delete',
  });
}

export function* getCountrySaga() {
  yield put(getCountryStart());
  yield errorHandler({
    endpoint: `/users/countries/`,
    successHandler: yield function* (response) {
      yield put(getCountrySuccess(response.data));
    },
    failHandler: getCountryFail,
    apiType: 'get',
  });
}

export function* setPrimaryAddressSaga(action) {
  const { id, index } = action.payload;
  yield put(setPrimaryAddressStart({ index }));
  yield errorHandler({
    endpoint: `/users/change-primary-address/${id}`,
    successHandler: yield function* (response) {
      yield put(setPrimaryAddressSuccess(response));
    },
    failHandler: setPrimaryAddressFail,
    apiType: 'put',
  });
}

export function* getNotificationSaga(action) {
  yield put(getNotificationStart());
  const { URL } = action.payload;

  yield errorHandler({
    endpoint: `/users/notifications?${URL}`,
    successHandler: yield function* (response) {
      yield put(getNotificationSuccess(response));
    },
    failHandler: getNotificationFail,
    apiType: 'get',
  });
}
export function* getCmsSaga(action) {
  yield put(getCmsStart());
  const { screen } = action.payload;

  yield errorHandler({
    endpoint: `/users/cmsPage?pageTitle=${screen}`,
    successHandler: yield function* (response) {
      yield put(getCmsSuccess(response));
    },
    failHandler: getCmsFail,
    apiType: 'get',
  });
}
