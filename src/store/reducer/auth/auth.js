import * as actionLabels from '../../actionLabels';

export const initialState = {
  isLogin: false,
  isLoading: false,
  isUserLoading: false,
  userData: null,
  tempUserData: {},
  socialData: null,
  verificationFlow: false,
  authToken: '',
  signupToken: '',
  errorMsg: '',
  errorType: '',
  fcmToken: '',
  registerEmail: '',
  isOTPSendSuccess: '',
  isOTPSenFail: '',
  otpReferenceToken: '',
  isRegisterTokenValid: false,
  isRegisterSuccess: false,
  isResetPasswordTokenValid: false,
  isForgotPasswordSuccess: false,
  isEmailVerificationTokenValid: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.LOGIN_START:
      return { ...state, isLoading: true };
    case actionLabels.LOGIN_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        authToken: payload.token,
        // fcmToken: payload.deviceToken,
        tempUserData: payload.token ? {} : payload,
        verificationFlow: !payload.token,
        userData: payload.token ? payload : {},
        errorMsg: '',
      };
    }
    case actionLabels.LOGIN_FAIL: {
      if (payload.type) {
        return { ...state, isLoading: false, errorMsg: payload.msg, errorType: payload.type };
      }
      return { ...state, isLoading: false, errorMsg: payload };
    }
    case actionLabels.SOCIAL_NOT_REGISTERED: {
      return { ...state, socialData: payload, isLoading: false, errorMsg: '' };
    }
    case actionLabels.RESET_SOCIAL_NOT_REGISTERED: {
      return { ...state, socialData: null, isLoading: false, errorMsg: '' };
    }
    case actionLabels.SIGNUP_START:
      return { ...state, isLoading: true };
    case actionLabels.SIGNUP_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        // signupToken: payload.token,
        // fcmToken: payload.deviceToken,
        tempUserData: payload,
        errorMsg: '',
      };
    }
    case actionLabels.SIGNUP_FAIL: {
      return { ...state, isLoading: false, errorMsg: payload };
    }
    case actionLabels.LOGOUT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionLabels.LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        verificationFlow: false,
        authToken: '',
        signupToken: '',
        errorMsg: '',
        fcmToken: '',
        userData: {},
        tempUserData: {},
      };
    }
    case actionLabels.LOGOUT_FAILED: {
      return { ...state, isLoading: false, errorMsg: payload };
    }
    case actionLabels.RESET_ERROR_MSG: {
      return {
        ...state,
        errorMsg: '',
        isRegisterSuccess: false,
        isResetPasswordTokenValid: false,
        isForgotPasswordSuccess: false,
        isEmailVerificationTokenValid: false,
        isRegisterTokenValid: false,
        verificationFlow: false,
      };
    }
    case actionLabels.RESET_TEMP_DATA: {
      return {
        ...state,
        errorMsg: '',
        tempUserData: {},
        isOTPSendSuccess: '',
        verificationFlow: false,
      };
    }
    case actionLabels.OTP_VERIFY_START:
      return { ...state, isLoading: true };
    case actionLabels.OTP_VERIFY_SUCCESS: {
      return {
        ...state,
        isOTPVerificationSuccess: true,
        errorMsg: '',
        tempUserData: {
          ...state.tempUserData,
          ...payload,
        },
      };
    }
    case actionLabels.OTP_VERIFY_FAIL: {
      return {
        ...state,
        isLoading: false,
        isOTPVerificationSuccess: false,
        errorMsg: payload,
      };
    }
    case actionLabels.OTP_RESEND_START:
      return { ...state, isLoading: true };
    case actionLabels.OTP_RESEND_SUCCESS: {
      return {
        ...state,
        isOTPSendSuccess: payload,
        isOTPSenFail: '',
        errorMsg: '',
      };
    }
    case actionLabels.OTP_RESEND_FAIL: {
      return {
        ...state,
        isLoading: false,
        isOTPSendSuccess: '',
        isOTPSenFail: payload,
        errorMsg: payload,
      };
    }
    case actionLabels.FORGOT_PASSWORD_START: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    }
    case actionLabels.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isForgotPasswordSuccess: true,
        tempUserData: payload,
        errorMsg: '',
      };
    }
    case actionLabels.FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    }
    case actionLabels.CREATE_PASSWORD_START: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    }
    case actionLabels.CREATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        tempUserData: {},
        errorMsg: '',
      };
    }
    case actionLabels.CREATE_PASSWORD_FAIL: {
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    }
    case actionLabels.GET_USER_DETAIL_START: {
      return {
        ...state,
        isLoading: true,
        isUserLoading: true,
        errorMsg: '',
      };
    }
    case actionLabels.GET_CURRENT_USER_DETAIL_SUCCESS: {
      return {
        ...state,
        userData: { ...payload },
        errorMsg: '',
        isLoading: false,
        isUserLoading: false,
      };
    }
    case actionLabels.GET_CURRENT_USER_DETAIL_FAIL: {
      return {
        ...state,
        userData: {
          _id: localStorage.getItem('userid'),
        },
        errorMsg: payload,
        isLoading: false,
        isUserLoading: false,
      };
    }
    case actionLabels.EDIT_USER_DETAIL_START: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    }
    case actionLabels.EDIT_USER_DETAIL_SUCCESS: {
      const { userData } = state;
      const { firstName, lastName, profilePic, gender, dob, country } = payload;
      return {
        ...state,
        userData: { ...userData, firstName, lastName, profilePic, gender, dob, country },
        errorMsg: '',
      };
    }
    case actionLabels.EDIT_USER_DETAIL_FAIL: {
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    }
    case actionLabels.UPDATE_PROFILE_PIC_START: {
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    }
    case actionLabels.UPDATE_PROFILE_PIC_SUCCESS: {
      const { userData } = state;
      const { profilePic } = payload;
      return {
        ...state,
        userData: {
          ...userData,
          profilePic,
          // ...payload,
        },
        errorMsg: '',
      };
    }
    case actionLabels.UPDATE_PROFILE_PIC_FAIL: {
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    }
    case actionLabels.CHANGE_PASSWORD_START: {
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    }
    case actionLabels.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        errorMsg: '',
      };
    }
    case actionLabels.CHANGE_PASSWORD_FAIL: {
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    }
    case actionLabels.BUY_VIP_MEMBERSHIP_START:
      return { ...state, isLoading: true };
    case actionLabels.BUY_VIP_MEMBERSHIP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: {
          ...state.userData,
          isVIPMemeber: true,
        },
      };
    }
    case actionLabels.BUY_VIP_MEMBERSHIP_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };

    case actionLabels.POST_QUERY_START: {
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    }
    case actionLabels.POST_QUERY_SUCCESS: {
      return {
        ...state,
        errorMsg: '',
      };
    }
    case actionLabels.POST_QUERY_FAIL: {
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    }
    case actionLabels.UPLOAD_KYC_START:
      return { ...state, isLoading: true };
    case actionLabels.UPLOAD_KYC_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: {
          ...state.userData,
          kyc: {
            status: false,
            isKyc: 'pending',
            kycRejectReason: 'null',
          },
        },
      };
    }
    case actionLabels.UPLOAD_KYC_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
