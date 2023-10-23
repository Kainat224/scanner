import * as actionLabels from '../../actionLabels';

export const initialState = {
  reviewRating: null,
  errMsg: '',
  isLoading: false,
  orderDetail: null,
  myPurchases: null,
  mySales: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GIVE_REVIEW_AND_RATING_START:
      return { ...state, isLoading: true };
    case actionLabels.GIVE_REVIEW_AND_RATING_SUCCESS:
      return {
        ...state,
        reviewRating: payload,
        isLoading: false,
      };
    case actionLabels.GIVE_REVIEW_AND_RATING_FAIL:
      return {
        ...state,
        errMsg: payload,
        reviewRating: [],
        isLoading: false,
      };
    case actionLabels.GET_ORDER_SOLD_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_ORDER_SOLD_SUCCESS:
      return {
        ...state,
        mySales: payload,
        isLoading: false,
      };
    case actionLabels.GET_ORDER_SOLD_FAIL:
      return {
        ...state,
        errMsg: payload,
        mySales: [],
        isLoading: false,
      };
    case actionLabels.GET_ORDER_BOUGHT_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_ORDER_BOUGHT_SUCCESS:
      return {
        ...state,
        myPurchases: payload,
        isLoading: false,
      };
    case actionLabels.GET_ORDER_BOUGHT_FAIL:
      return {
        ...state,
        errMsg: payload,
        myPurchases: [],
        isLoading: false,
      };
    case actionLabels.GET_ORDER_DETAIL_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: payload,
        isLoading: false,
      };
    case actionLabels.GET_ORDER_DETAIL_FAIL:
      return {
        ...state,
        errMsg: payload,
        orderDetail: null,
        isLoading: false,
      };
    case actionLabels.RESET_ORDERS:
      return {
        reviewRating: null,
        errMsg: '',
        isLoading: false,
        orderDetail: null,
        myPurchases: null,
        mySales: null,
      };
    case actionLabels.POST_TRACKING_DETAILS_START:
      return { ...state, isLoading: true };
    case actionLabels.POST_TRACKING_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.POST_TRACKING_DETAILS_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
