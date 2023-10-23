import * as actionLabels from '../../actionLabels';

export const getAddressStart = payload => ({
  type: actionLabels.GET_ADDRESS_START,
  payload,
});

export const getAddressSaga = payload => ({
  type: actionLabels.GET_ADDRESS_SAGA,
  payload,
});

export const getAddressSuccess = payload => ({
  type: actionLabels.GET_ADDRESS_SUCCESS,
  payload,
});

export const getAddressFail = payload => ({
  type: actionLabels.GET_ADDRESS_FAIL,
  payload,
});

export const addAddressStart = payload => ({
  type: actionLabels.ADD_ADDRESS_START,
  payload,
});

export const addAddressSaga = payload => ({
  type: actionLabels.ADD_ADDRESS_SAGA,
  payload,
});

export const addAddressSuccess = payload => ({
  type: actionLabels.ADD_ADDRESS_SUCCESS,
  payload,
});

export const addAddressFail = payload => ({
  type: actionLabels.ADD_ADDRESS_FAIL,
  payload,
});

export const editAddressStart = payload => ({
  type: actionLabels.EDIT_ADDRESS_START,
  payload,
});

export const editAddressSaga = payload => ({
  type: actionLabels.EDIT_ADDRESS_SAGA,
  payload,
});

export const editAddressSuccess = payload => ({
  type: actionLabels.EDIT_ADDRESS_SUCCESS,
  payload,
});

export const editAddressFail = payload => ({
  type: actionLabels.EDIT_ADDRESS_FAIL,
  payload,
});

export const deleteAddressStart = payload => ({
  type: actionLabels.DELETE_ADDRESS_START,
  payload,
});

export const deleteAddressSaga = payload => ({
  type: actionLabels.DELETE_ADDRESS_SAGA,
  payload,
});

export const deleteAddressSuccess = payload => ({
  type: actionLabels.DELETE_ADDRESS_SUCCESS,
  payload,
});

export const deleteAddressFail = payload => ({
  type: actionLabels.DELETE_ADDRESS_FAIL,
  payload,
});

export const getCountryStart = payload => ({
  type: actionLabels.GET_COUNTRY_START,
  payload,
});

export const getCountrySaga = payload => ({
  type: actionLabels.GET_COUNTRY_SAGA,
  payload,
});

export const getCountrySuccess = payload => ({
  type: actionLabels.GET_COUNTRY_SUCCESS,
  payload,
});

export const getCountryFail = payload => ({
  type: actionLabels.GET_COUNTRY_FAIL,
  payload,
});

export const setPrimaryAddressStart = payload => ({
  type: actionLabels.SET_PRIMARY_ADDRESS_START,
  payload,
});

export const setPrimaryAddressSaga = payload => ({
  type: actionLabels.SET_PRIMARY_ADDRESS_SAGA,
  payload,
});

export const setPrimaryAddressSuccess = payload => ({
  type: actionLabels.SET_PRIMARY_ADDRESS_SUCCESS,
  payload,
});

export const setPrimaryAddressFail = payload => ({
  type: actionLabels.SET_PRIMARY_ADDRESS_FAIL,
  payload,
});

export const getNotificationStart = payload => ({
  type: actionLabels.GET_NOTIFICATION_START,
  payload,
});

export const getNotificationSaga = payload => ({
  type: actionLabels.GET_NOTIFICATION_SAGA,
  payload,
});

export const getNotificationSuccess = payload => ({
  type: actionLabels.GET_NOTIFICATION_SUCCESS,
  payload,
});

export const getNotificationFail = payload => ({
  type: actionLabels.GET_NOTIFICATION_FAIL,
  payload,
});

export const getCmsStart = payload => ({
  type: actionLabels.GET_CMS_START,
  payload,
});

export const getCmsSaga = payload => ({
  type: actionLabels.GET_CMS_SAGA,
  payload,
});

export const getCmsSuccess = payload => ({
  type: actionLabels.GET_CMS_SUCCESS,
  payload,
});

export const getCmsFail = payload => ({
  type: actionLabels.GET_CMS_FAIL,
  payload,
});
export const resetCms = () => ({
  type: actionLabels.RESET_CMS,
});
