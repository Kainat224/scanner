/* eslint-disable radix */
/* eslint-disable no-unused-vars */
import { put, call } from 'redux-saga/effects';
// import firebase from 'firebase';
import {
  loginSuccess,
  loginFail,
  loginStart,
  socialNotRegistered,
  signupSuccess,
  signupFail,
  signupStart,
  logout,
  logoutStart,
  logoutSuccess,
  otpVerifyStart,
  otpVerifyFail,
  otpResendStart,
  otpResendSuccess,
  otpResendFail,
  resetApp,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFail,
  logoutFailed,
  showModal,
  createPasswordStart,
  createPasswordSuccess,
  createPasswordFail,
  getUserDetailSaga as getUserDetailSagaAction,
  getUserDetailStart,
  getUserDetailSuccess,
  getCurrentUserDetailSuccess,
  getUserDetailFail,
  getCurrentUserDetailFail,
  editUserDetailStart,
  editUserDetailSuccess,
  editUserDetailFail,
  updateProfilePicStart,
  updateProfilePicSuccess,
  updateProfilePicFail,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFail,
  buyVIPMembershipStart,
  buyVIPMembershipSuccess,
  buyVIPMembershipFail,
  uploadKycSuccess,
  uploadKycFail,
  uploadKycStart,
  postQueryStart,
  postQuerySuccess,
  postQueryFail,
} from '../../actions';
import { errorHandler } from '../../../utils';

export function* loginSaga(action) {
  yield put(loginStart());
  yield errorHandler({
    endpoint: `/users/login`,
    successHandler: yield function* (response) {
      const { loginType, redirectSocialSignup } = action.payload;
      if (loginType !== 'manual' && response.data.SOCIAL_NOT_REGISTERED) {
        yield put(
          showModal({
            open: true,
            notifyType: 3,
            message: 'Social account not registered, please signup to continue',
          }),
        );
        yield put(socialNotRegistered(action.payload));

        redirectSocialSignup();
      } else {
        if (response.data.token) {
          yield call([localStorage, 'setItem'], 'authToken', response.data.token);
          yield call([localStorage, 'setItem'], 'userid', response.data._id);
        }
        yield put(loginSuccess(response.data));
      }
    },
    failHandler: loginFail,
    payload: action.payload,
    apiType: 'post',
  });
}

export function* signupSaga(action) {
  yield put(signupStart());
  const { data, modalHandler } = action.payload;
  yield errorHandler({
    endpoint: `/users/register`,
    successHandler: yield function* (response) {
      if (data.loginType === 'manual') {
        yield put(signupSuccess(response.data));
        modalHandler(true);
      } else {
        yield call([localStorage, 'setItem'], 'authToken', response.data.token);
        yield call([localStorage, 'setItem'], 'userid', response.data._id);
        yield put(loginSuccess(response.data));
      }
    },
    failHandler: signupFail,
    payload: data,
    apiType: 'post',
  });
}

export function* otpVerifySaga(action) {
  yield put(otpVerifyStart());
  const { countryCode, phone, otp, successHandler, type } = action.payload;
  yield errorHandler({
    endpoint: `/users/otp-verify`,
    successHandler: yield function* (response) {
      yield successHandler(response.data);
    },
    failHandler: otpVerifyFail,
    payload: {
      countryCode,
      phone,
      otp: parseInt(otp),
      type,
    },
    apiType: 'post',
  });
}

export function* otpResendSaga(action) {
  yield put(otpResendStart());
  const { phone, resetCount } = action.payload;
  yield errorHandler({
    endpoint: `/users/resend-otp`,
    successHandler: yield function* (response) {
      resetCount();
      yield put(otpResendSuccess(response.msg));
    },
    failHandler: otpResendFail,
    payload: { phone },
    apiType: 'post',
  });
}

// eslint-disable-next-line no-unused-vars
export function* logoutSaga(action) {
  yield put(logoutStart());
  let gtoken = null;
  try {
    // const response = yield axios.post(`/logout`);
    // if (response.status === 200) {
    //   // if (action.payload && action.payload.fromAuth) {
    //   //   gtoken = yield localStorage.getItem('gtoken');
    //   // } else if (firebase.messaging.isSupported()) {
    //   //   yield put(
    //   //     showModal({
    //   //       open: true,
    //   //       notifyType: 0,
    //   //       withButton: false,
    //   //       message: `Please wait... Logging out...`,
    //   //     }),
    //   //   );
    //   //   const response = yield Promise.all([
    //   //     firebase.messaging().deleteToken(),
    //   //     firebase.messaging().getToken(),
    //   //   ]);
    //   //   const [deleted, token] = response;
    //   //   gtoken = token;
    //   // } else {
    //   //   gtoken = null;
    //   // }
    // } else {
    //   yield put(logoutFailed('Something went wrong! Please try again.'));
    // }
  } catch (err) {
    gtoken = null;
  }
  yield call([localStorage, 'clear']);
  yield call([localStorage, 'setItem'], 'gtoken', gtoken);
  yield put(resetApp());
  yield put(logoutSuccess());
}

// eslint-disable-next-line no-unused-vars
export function* authenticationValidatorSaga(action) {
  yield put(loginStart());
  const token = yield localStorage.getItem('authToken');
  if (!token) {
    yield put(logout({ fromAuth: true }));
  } else {
    yield put(
      getUserDetailSagaAction({
        data: { id: localStorage.getItem('userid'), token },
        isCurrentUser: true,
      }),
    );
    yield put(loginSuccess({ token }));
  }
}

export function* forgotPasswordSaga(action) {
  yield put(forgotPasswordStart());
  const { phone, countryCode, modalHandler } = action.payload;
  yield errorHandler({
    endpoint: `/users/forgot-password`,
    successHandler: yield function* () {
      yield put(forgotPasswordSuccess({ phone, countryCode }));
      // if (response.data.isPhoneVerified) {
      modalHandler();
      // }
    },
    failHandler: forgotPasswordFail,
    payload: { phone, countryCode },
    apiType: 'post',
  });
}

export function* createPasswordSaga(action) {
  yield put(createPasswordStart());
  // const { countryCode, phone, password, closeModel } = action.payload;
  const { referenceToken, newPassword, closeModel } = action.payload;
  yield errorHandler({
    endpoint: `/users/reset-password`,
    successHandler: yield function* (response) {
      yield put(createPasswordSuccess(response.data));
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
      closeModel();
    },
    failHandler: createPasswordFail,
    payload: { referenceToken, newPassword },
    apiType: 'post',
  });
}

export function* getUserDetailSaga(action) {
  yield put(getUserDetailStart());
  const { data, isCurrentUser } = action.payload;
  yield errorHandler({
    endpoint: `/users/data/${data.id}`,
    successHandler: yield function* (response) {
      if (isCurrentUser) {
        yield put(
          getCurrentUserDetailSuccess({
            ...response.data.response,
            coin_sold: response.data.coin_sold,
            coin_bought: response.data.coin_bought,
          }),
        );
      } else {
        yield put(
          getUserDetailSuccess({
            ...response.data.response,
            coin_sold: response.data.coin_sold,
            coin_bought: response.data.coin_bought,
          }),
        );
      }
    },
    failHandler: isCurrentUser ? getCurrentUserDetailFail : getUserDetailFail,
    apiType: 'get',
    token: data.token ? data.token : '',
  });
}

export function* editUserDetailSaga(action) {
  const { data, closeModel } = action.payload;
  yield put(editUserDetailStart());
  yield errorHandler({
    endpoint: `/users`,
    successHandler: yield function* (response) {
      yield put(editUserDetailSuccess(response.data));
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: 'Profile information updated successfully.',
        }),
      );
      closeModel();
    },
    failHandler: editUserDetailFail,
    apiType: 'put',
    payload: data,
  });
}

export function* updateProfilePicSaga(action) {
  const { data } = action.payload;
  yield put(updateProfilePicStart());
  yield errorHandler({
    endpoint: `/users/update/profile-pic`,
    successHandler: yield function* (response) {
      yield put(updateProfilePicSuccess(response.data));
    },
    failHandler: updateProfilePicFail,
    apiType: 'put',
    payload: data,
  });
}

export function* changePasswordSaga(action) {
  yield put(changePasswordStart());
  // const { phone, countryCode, newPassword, oldPassword } = action.payload;
  yield errorHandler({
    endpoint: `/users/change-password`,
    successHandler: yield function* (response) {
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
      yield put(changePasswordSuccess(response.data));
    },
    failHandler: changePasswordFail,
    payload: {
      ...action.payload,
    },
    apiType: 'post',
  });
}

export function* postQuerySaga(action) {
  yield put(postQueryStart());
  const { message, setQuery } = action.payload;
  yield errorHandler({
    endpoint: `/coin/contact-us`,
    successHandler: yield function* (response) {
      yield put(postQuerySuccess(response.data));
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
      setQuery('');
    },
    failHandler: yield function* (response) {
      yield put(
        showModal({
          open: true,
          notifyType: 1,
          message: response.msg,
        }),
      );
      yield put(postQueryFail(response.data));
    },
    payload: {
      message,
    },
    apiType: 'post',
  });
}

export function* buyVIPMembershipSaga(action) {
  yield put(buyVIPMembershipStart());
  const { userId } = action.payload;
  yield errorHandler({
    endpoint: `/pay?gateway=internal&type=buyVipMembership&_userId=${userId}`,
    successHandler: yield function* (response) {
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
        }),
      );
      yield put(buyVIPMembershipSuccess(response.data));
    },
    failHandler: yield function* (response) {
      yield put(
        showModal({
          open: true,
          notifyType: 1,
          message: response,
        }),
      );
      yield put(buyVIPMembershipFail(response));
    },
    failHandlerType: 'CUSTOM',
    apiType: 'get',
    // payload: action.payload,
  });
}

export function* uploadKycSaga(action) {
  yield put(uploadKycStart());
  const { data } = action.payload;
  yield errorHandler({
    endpoint: `/users/upload-kyc`,
    successHandler: yield function* (response) {
      yield put(uploadKycSuccess(response.data));
      yield put(
        showModal({
          open: true,
          notifyType: 2,
          message: response.msg,
          redirectURL: '/profile',
        }),
      );
    },
    failHandler: uploadKycFail,
    apiType: 'post',
    payload: data,
  });
}
