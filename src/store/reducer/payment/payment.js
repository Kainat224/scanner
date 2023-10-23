import * as actionLabels from '../../actionLabels';

export const initialState = {
  errMsg: '',
  paymentHistory: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.BUY_CREDIT_START:
      return { ...state, isLoading: true };
    case actionLabels.BUY_CREDIT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionLabels.BUY_CREDIT_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };

    case actionLabels.BUY_COLLECTION_START:
      return { ...state, isLoading: false };
    case actionLabels.BUY_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.BUY_COLLECTION_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.VALIDATE_PAYMENT_START:
      return { ...state, isLoading: false };
    case actionLabels.VALIDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.VALIDATE_PAYMENT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actionLabels.PAYMENT_HISTORY_START:
      return { ...state, isLoading: false };
    case actionLabels.PAYMENT_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentHistory: payload,
      };
    case actionLabels.PAYMENT_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
      };
    default:
      return state;
  }
};
