/* eslint-disable max-len */
import { put } from 'redux-saga/effects';
import { errorHandler } from '../../../utils';
import * as actions from '../../actions';

export function* buyCreditSaga(action) {
  yield put(actions.buyCreditStart());

  const { userId, creditCount } = action.payload;
  window.open(
    `https://dev-api.collectionscanner.com/api/v1/pay?gateway=paypal&type=buyCredits&_userId=${userId}&creditCount=${creditCount}&frontURL=https://collectionscanner.com/wallet`,
    '_self',
  );
}

export function* buyCollectionSaga(action) {
  yield put(actions.buyCollectionStart());
  const { userId, coinId } = action.payload;
  window.open(
    `http://dev-api.collectionscanner.com/api/v1/coin/buy-coin?coinId=${coinId}&_id=${userId}&frontURL=https://collectionscanner.com/wallet`,
    '_self',
  );
}

export function* validatePaymentSaga(action) {
  yield put(actions.validatePaymentStart());
  const { setPaymentModel, transactionId } = action.payload;
  yield errorHandler({
    endpoint: `/users/getTransectionById?_id=${transactionId}`,
    successHandler: yield function* (response) {
      yield put(actions.validatePaymentSuccess(response));
      setPaymentModel({ isOpen: true, msg: response.msg });
    },
    failHandler: actions.validatePaymentFail,
    apiType: 'get',
  });
}

export function* paymentHistorySaga(action) {
  yield put(actions.paymentHistoryStart());
  const { userId } = action.payload;
  yield errorHandler({
    endpoint: `/users/getTransectionDetails?_id=${userId}`,
    successHandler: yield function* (response) {
      yield put(actions.paymentHistorySuccess(response.data));
    },
    failHandler: actions.paymentHistoryFail,
    apiType: 'get',
  });
}
