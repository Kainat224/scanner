import * as actionLabels from '../../actionLabels';

export const loginStart = () => ({
  type: actionLabels.LOGIN_START,
});

export const login = payload => ({
  type: actionLabels.LOGIN_SAGA,
  payload,
});

export const loginSuccess = payload => ({
  type: actionLabels.LOGIN_SUCCESS,
  payload,
});

export const loginFail = payload => ({
  type: actionLabels.LOGIN_FAIL,
  payload,
});

export const socialNotRegistered = payload => ({
  type: actionLabels.SOCIAL_NOT_REGISTERED,
  payload,
});

export const resetSocialNotRegistered = payload => ({
  type: actionLabels.RESET_SOCIAL_NOT_REGISTERED,
  payload,
});

export const signupStart = () => ({
  type: actionLabels.SIGNUP_START,
});

export const signupSaga = payload => ({
  type: actionLabels.SIGNUP_SAGA,
  payload,
});

export const signupSuccess = payload => ({
  type: actionLabels.SIGNUP_SUCCESS,
  payload,
});

export const signupFail = payload => ({
  type: actionLabels.SIGNUP_FAIL,
  payload,
});

export const logoutStart = payload => ({
  type: actionLabels.LOGOUT_START,
  payload,
});
export const logout = payload => ({
  type: actionLabels.LOGOUT_SAGA,
  payload,
});

export const logoutSuccess = payload => ({
  type: actionLabels.LOGOUT_SUCCESS,
  payload,
});

export const logoutFailed = payload => ({
  type: actionLabels.LOGOUT_FAILED,
  payload,
});

export const authenticationValidator = () => ({
  type: actionLabels.AUTHENTICATION_VALIDATOR,
});

export const resetErrorMsg = () => ({
  type: actionLabels.RESET_ERROR_MSG,
});

export const resetTempData = () => ({
  type: actionLabels.RESET_TEMP_DATA,
});

export const otpVerifyStart = () => ({
  type: actionLabels.OTP_VERIFY_START,
});

export const otpVerifySaga = payload => ({
  type: actionLabels.OTP_VERIFY_SAGA,
  payload,
});

export const otpVerifySuccess = payload => ({
  type: actionLabels.OTP_VERIFY_SUCCESS,
  payload,
});

export const otpVerifyFail = payload => ({
  type: actionLabels.OTP_VERIFY_FAIL,
  payload,
});

export const otpResendStart = () => ({
  type: actionLabels.OTP_RESEND_START,
});

export const otpResendSaga = payload => ({
  type: actionLabels.OTP_RESEND_SAGA,
  payload,
});

export const otpResendSuccess = payload => ({
  type: actionLabels.OTP_RESEND_SUCCESS,
  payload,
});

export const otpResendFail = payload => ({
  type: actionLabels.OTP_RESEND_FAIL,
  payload,
});

export const forgotPasswordStart = () => ({
  type: actionLabels.FORGOT_PASSWORD_START,
});

export const forgotPasswordSaga = payload => ({
  type: actionLabels.FORGOT_PASSWORD_SAGA,
  payload,
});

export const forgotPasswordSuccess = payload => ({
  type: actionLabels.FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordFail = payload => ({
  type: actionLabels.FORGOT_PASSWORD_FAIL,
  payload,
});

export const createPasswordStart = () => ({
  type: actionLabels.CREATE_PASSWORD_START,
});

export const createPasswordSaga = payload => ({
  type: actionLabels.CREATE_PASSWORD_SAGA,
  payload,
});

export const createPasswordSuccess = payload => ({
  type: actionLabels.CREATE_PASSWORD_SUCCESS,
  payload,
});

export const createPasswordFail = payload => ({
  type: actionLabels.CREATE_PASSWORD_FAIL,
  payload,
});

export const getUserDetailSaga = payload => ({
  type: actionLabels.GET_USER_DETAIL_SAGA,
  payload,
});

export const getUserDetailStart = () => ({
  type: actionLabels.GET_USER_DETAIL_START,
});

export const getUserDetailSuccess = payload => ({
  type: actionLabels.GET_USER_DETAIL_SUCCESS,
  payload,
});

export const getCurrentUserDetailSuccess = payload => ({
  type: actionLabels.GET_CURRENT_USER_DETAIL_SUCCESS,
  payload,
});

export const getUserDetailFail = payload => ({
  type: actionLabels.GET_USER_DETAIL_FAIL,
  payload,
});

export const getCurrentUserDetailFail = payload => ({
  type: actionLabels.GET_CURRENT_USER_DETAIL_FAIL,
  payload,
});

export const editUserDetailSaga = payload => ({
  type: actionLabels.EDIT_USER_DETAIL_SAGA,
  payload,
});

export const editUserDetailStart = () => ({
  type: actionLabels.EDIT_USER_DETAIL_START,
});

export const editUserDetailSuccess = payload => ({
  type: actionLabels.EDIT_USER_DETAIL_SUCCESS,
  payload,
});

export const editUserDetailFail = payload => ({
  type: actionLabels.EDIT_USER_DETAIL_FAIL,
  payload,
});

export const updateProfilePicSaga = payload => ({
  type: actionLabels.UPDATE_PROFILE_PIC_SAGA,
  payload,
});

export const updateProfilePicStart = () => ({
  type: actionLabels.UPDATE_PROFILE_PIC_START,
});

export const updateProfilePicSuccess = payload => ({
  type: actionLabels.UPDATE_PROFILE_PIC_SUCCESS,
  payload,
});

export const updateProfilePicFail = () => ({
  type: actionLabels.UPDATE_PROFILE_PIC_FAIL,
});

export const changePasswordSaga = payload => ({
  type: actionLabels.CHANGE_PASSWORD_SAGA,
  payload,
});

export const changePasswordStart = () => ({
  type: actionLabels.CHANGE_PASSWORD_START,
});

export const changePasswordSuccess = payload => ({
  type: actionLabels.CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const changePasswordFail = payload => ({
  type: actionLabels.CHANGE_PASSWORD_FAIL,
  payload,
});

export const postQuerySaga = payload => ({
  type: actionLabels.POST_QUERY_SAGA,
  payload,
});

export const postQueryStart = () => ({
  type: actionLabels.POST_QUERY_START,
});

export const postQuerySuccess = payload => ({
  type: actionLabels.POST_QUERY_SUCCESS,
  payload,
});

export const postQueryFail = payload => ({
  type: actionLabels.POST_QUERY_FAIL,
  payload,
});

export const buyVIPMembershipStart = payload => ({
  type: actionLabels.BUY_VIP_MEMBERSHIP_START,
  payload,
});

export const buyVIPMembershipSaga = payload => ({
  type: actionLabels.BUY_VIP_MEMBERSHIP_SAGA,
  payload,
});

export const buyVIPMembershipSuccess = payload => ({
  type: actionLabels.BUY_VIP_MEMBERSHIP_SUCCESS,
  payload,
});

export const buyVIPMembershipFail = () => ({
  type: actionLabels.BUY_VIP_MEMBERSHIP_FAIL,
});

export const uploadKycStart = payload => ({
  type: actionLabels.UPLOAD_KYC_START,
  payload,
});

export const uploadKycSaga = payload => ({
  type: actionLabels.UPLOAD_KYC_SAGA,
  payload,
});

export const uploadKycSuccess = payload => ({
  type: actionLabels.UPLOAD_KYC_SUCCESS,
  payload,
});

export const uploadKycFail = () => ({
  type: actionLabels.UPLOAD_KYC_FAIL,
});
