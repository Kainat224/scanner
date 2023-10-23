import * as actionLabels from '../../actionLabels';

export const initialState = {
  address: null,
  errMsg: '',
  isLoading: false,
  countryCode: '',
  notifications: null,
  cms: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_ADDRESS_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload,
        isLoading: false,
      };
    case actionLabels.GET_ADDRESS_FAIL:
      return {
        ...state,
        errMsg: payload,
        address: [],
        isLoading: false,
      };
    case actionLabels.ADD_ADDRESS_START:
      return { ...state, isLoading: true };
    case actionLabels.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload,
        isLoading: false,
      };
    case actionLabels.ADD_ADDRESS_FAIL:
      return {
        ...state,
        errMsg: payload,
        address: [],
        isLoading: false,
      };
    case actionLabels.EDIT_ADDRESS_START:
      return { ...state, isLoading: true };
    case actionLabels.EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload,
        isLoading: false,
      };
    case actionLabels.EDIT_ADDRESS_FAIL:
      return {
        ...state,
        errMsg: payload,
        address: [],
        isLoading: false,
      };
    case actionLabels.DELETE_ADDRESS_START:
      return { ...state, isLoading: true };
    case actionLabels.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        address: payload,
        isLoading: false,
      };
    case actionLabels.DELETE_ADDRESS_FAIL:
      return {
        ...state,
        errMsg: payload,
        address: [],
        isLoading: false,
      };
    case actionLabels.GET_COUNTRY_START:
      return { ...StaticRange, isLoading: true };
    case actionLabels.GET_COUNTRY_SUCCESS: {
      return {
        ...state,
        countryCode: payload,
        isLoading: false,
      };
    }
    case actionLabels.GET_COUNTRY_FAIL:
      return {
        ...state,
        errMsg: payload,
        countryCode: [],
        isLoading: false,
      };
    case actionLabels.SET_PRIMARY_ADDRESS_START:
      // eslint-disable-next-line no-case-declarations
      const { address } = state;
      return {
        ...state,
        isLoading: true,
        address: address.map((item, idx) => {
          if (idx === payload.index) {
            return { ...item, isPrimary: true };
          }
          return { ...item, isPrimary: false };
        }),
      };

    case actionLabels.SET_PRIMARY_ADDRESS_SUCCESS: {
      return {
        ...state,
        address: payload.data,
      };
    }
    case actionLabels.SET_PRIMARY_ADDRESS_FAIL: {
      return {
        ...state,
        errMsg: payload,
        address: [],
        isLoading: false,
      };
    }

    case actionLabels.GET_NOTIFICATION_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        notifications: payload.data,
      };
    }
    case actionLabels.GET_NOTIFICATION_FAIL: {
      return {
        ...state,
        errMsg: payload,
        notifications: null,
        isLoading: false,
      };
    }
    case actionLabels.GET_CMS_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_CMS_SUCCESS: {
      return {
        ...state,
        cms: payload.data,
      };
    }
    case actionLabels.GET_CMS_FAIL: {
      return {
        ...state,
        errMsg: payload,
        cms: null,
        isLoading: false,
      };
    }
    case actionLabels.RESET_CMS: {
      return {
        ...state,
        cms: null,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
