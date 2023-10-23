/* eslint-disable import/prefer-default-export */
import { put } from 'redux-saga/effects';
import { errorHandler } from '../../../utils';
import {
  getOrderBoughtFail,
  getOrderBoughtStart,
  getOrderBoughtSuccess,
  getOrderSoldFail,
  getOrderSoldStart,
  getOrderSoldSuccess,
  giveReviewRatingFail,
  giveReviewRatingStart,
  giveReviewRatingSuccess,
  getOrderDetailStart,
  getOrderDetailSuccess,
  getOrderDetailFail,
  postTrackingDetailStart,
  postTrackingDetailSuccess,
  postTrackingDetailFail,
  showModal,
} from '../../actions';

export function* giveReviewRatingSaga(action) {
  yield put(giveReviewRatingStart());
  const { data, id } = action.payload;
  yield errorHandler({
    endpoint: `/order/review/${id}`,
    successHandler: yield function* (response) {
      yield put(giveReviewRatingSuccess(response.data));
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
    },
    failHandler: giveReviewRatingFail,
    apiType: 'put',
    payload: data,
  });
}

export function* getOrderBoughtSaga(action) {
  yield put(getOrderBoughtStart());
  const { URL } = action.payload;
  yield errorHandler({
    endpoint: `/order/buy?${URL}`,
    successHandler: yield function* (response) {
      yield put(getOrderBoughtSuccess(response.data));
    },
    failHandler: getOrderBoughtFail,
    apiType: 'get',
  });
}

export function* getOrderSoldSaga(action) {
  yield put(getOrderSoldStart());
  const { URL } = action.payload;
  yield errorHandler({
    endpoint: `/order/sell?${URL}`,
    successHandler: yield function* (response) {
      yield put(getOrderSoldSuccess(response.data));
    },
    failHandler: getOrderSoldFail,
    apiType: 'get',
  });
}

export function* getOrderDetailSaga(action) {
  yield put(getOrderDetailStart());
  yield errorHandler({
    endpoint: `/order/detail/${action.payload}`,
    successHandler: yield function* (response) {
      yield put(
        getOrderDetailSuccess({
          ...response.data.result,
          addressDetails: response.data.addressDetails,
        }),
      );
    },
    failHandler: getOrderDetailFail,
    apiType: 'get',
  });
}

export function* postTrackingDetailSaga(action) {
  yield put(postTrackingDetailStart());
  const { data, orderId } = action.payload;
  yield errorHandler({
    endpoint: `/order/track/${orderId}`,
    successHandler: yield function* (response) {
      yield put(postTrackingDetailSuccess(response.data));
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
    },
    failHandler: postTrackingDetailFail,
    apiType: 'post',
    payload: data,
  });
}
