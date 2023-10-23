import * as actionLabels from '../../actionLabels';

export const giveReviewRatingStart = payload => ({
  type: actionLabels.GIVE_REVIEW_AND_RATING_START,
  payload,
});

export const giveReviewRatingSaga = payload => ({
  type: actionLabels.GIVE_REVIEW_AND_RATING_SAGA,
  payload,
});

export const giveReviewRatingSuccess = payload => ({
  type: actionLabels.GIVE_REVIEW_AND_RATING_SUCCESS,
  payload,
});

export const giveReviewRatingFail = payload => ({
  type: actionLabels.GIVE_REVIEW_AND_RATING_FAIL,
  payload,
});

export const getOrderBoughtStart = payload => ({
  type: actionLabels.GET_ORDER_BOUGHT_START,
  payload,
});

export const getOrderBoughtSaga = payload => ({
  type: actionLabels.GET_ORDER_BOUGHT_SAGA,
  payload,
});

export const getOrderBoughtSuccess = payload => ({
  type: actionLabels.GET_ORDER_BOUGHT_SUCCESS,
  payload,
});

export const getOrderBoughtFail = payload => ({
  type: actionLabels.GET_ORDER_BOUGHT_FAIL,
  payload,
});

export const getOrderSoldStart = payload => ({
  type: actionLabels.GET_ORDER_SOLD_START,
  payload,
});

export const getOrderSoldSaga = payload => ({
  type: actionLabels.GET_ORDER_SOLD_SAGA,
  payload,
});

export const getOrderSoldSuccess = payload => ({
  type: actionLabels.GET_ORDER_SOLD_SUCCESS,
  payload,
});

export const getOrderSoldFail = payload => ({
  type: actionLabels.GET_ORDER_SOLD_FAIL,
  payload,
});
export const getOrderDetailStart = payload => ({
  type: actionLabels.GET_ORDER_DETAIL_START,
  payload,
});

export const getOrderDetailSaga = payload => ({
  type: actionLabels.GET_ORDER_DETAIL_SAGA,
  payload,
});

export const getOrderDetailSuccess = payload => ({
  type: actionLabels.GET_ORDER_DETAIL_SUCCESS,
  payload,
});

export const getOrderDetailFail = payload => ({
  type: actionLabels.GET_ORDER_DETAIL_FAIL,
  payload,
});

export const resetOrders = payload => ({
  type: actionLabels.RESET_ORDERS,
  payload,
});
export const postTrackingDetailStart = payload => ({
  type: actionLabels.POST_TRACKING_DETAILS_START,
  payload,
});

export const postTrackingDetailSaga = payload => ({
  type: actionLabels.POST_TRACKING_DETAILS_SAGA,
  payload,
});

export const postTrackingDetailSuccess = payload => ({
  type: actionLabels.POST_TRACKING_DETAILS_SUCCESS,
  payload,
});

export const postTrackingDetailFail = payload => ({
  type: actionLabels.POST_TRACKING_DETAILS_FAIL,
  payload,
});
