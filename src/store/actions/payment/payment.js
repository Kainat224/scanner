import * as actionLabels from '../../actionLabels';

export const buyCreditStart = () => ({
  type: actionLabels.BUY_CREDIT_START,
  //   payload,
});

export const buyCreditSaga = payload => ({
  type: actionLabels.BUY_CREDIT_SAGA,
  payload,
});

export const buyCreditSuccess = payload => ({
  type: actionLabels.BUY_CREDIT_SUCCESS,
  payload,
});

export const buyCreditFail = payload => ({
  type: actionLabels.BUY_CREDIT_FAIL,
  payload,
});

export const buyCollectionStart = payload => ({
  type: actionLabels.BUY_COLLECTION_START,
  payload,
});

export const buyCollectionSaga = payload => ({
  type: actionLabels.BUY_COLLECTION_SAGA,
  payload,
});

export const buyCollectionSuccess = payload => ({
  type: actionLabels.BUY_COLLECTION_SUCCESS,
  payload,
});

export const buyCollectionFail = payload => ({
  type: actionLabels.BUY_COLLECTION_FAIL,
  payload,
});

export const validatePaymentStart = payload => ({
  type: actionLabels.VALIDATE_PAYMENT_START,
  payload,
});

export const validatePaymentSaga = payload => ({
  type: actionLabels.VALIDATE_PAYMENT_SAGA,
  payload,
});

export const validatePaymentSuccess = payload => ({
  type: actionLabels.VALIDATE_PAYMENT_SUCCESS,
  payload,
});

export const validatePaymentFail = payload => ({
  type: actionLabels.VALIDATE_PAYMENT_FAIL,
  payload,
});

export const paymentHistoryStart = payload => ({
  type: actionLabels.PAYMENT_HISTORY_START,
  payload,
});

export const paymentHistorySaga = payload => ({
  type: actionLabels.PAYMENT_HISTORY_SAGA,
  payload,
});

export const paymentHistorySuccess = payload => ({
  type: actionLabels.PAYMENT_HISTORY_SUCCESS,
  payload,
});

export const paymentHistoryFail = payload => ({
  type: actionLabels.PAYMENT_HISTORY_FAIL,
  payload,
});
