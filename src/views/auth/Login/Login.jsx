/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

import {
  login,
  otpResendSaga,
  otpVerifySaga,
  otpVerifySuccess,
  resetTempData,
  showModal,
  resetErrorMsg,
  // resetSocialNotRegistered,
} from '../../../store/actions';
import {
  EMAIL_PHONE_REQUIRED,
  // EMAIL_VALID,
  PASSWORD_REQUIRED,
  PHONE_VALID,
  EMAIL_OR_PHONE_VALID,
} from '../../../constants/errorConstants';
// import { TWITTER_SVG } from '../../../assets/images';
import AuthLayout from '../AuthLayout/AuthLayout';
import ForgotPasswordModal from './ForgotPasswordModal';
import OTPModal from '../Signup/OTPModal';
import CreatePasswordModal from './CreatePasswordModal';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
import PhoneNumerValModal from './PhoneNumberValModal';
import auth from '../../../firebase';
import { FACEBOOK_SVG, GOOGLE_SVG, TWITTER_SVG } from '../../../assets/images';

const Login = () => {
  const [OTPModalOpen, setOTPModalOpen] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [openCreatePasswordModal, setOpenCreatePasswordModal] = useState(false);
  const [openPhoneValModal, setOpenPhoneValModal] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [count, setCount] = useState(30);
  const [isUserVerification, setIsUserVerfication] = useState(false);
  const [tempPhone, setTempPhone] = useState('');

  const {
    tempUserData: { countryCode, phone },
    verificationFlow,
    signupToken,
    isLogin,
    errorMsg,
    // isLoading,
    errorType,
  } = useSelector(state => state.auth);
  const { open } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  const resetCount = () => {
    setCount(30);
  };
  useEffect(() => () => dispatch(resetErrorMsg()), [dispatch]);

  const history = useHistory();

  const redirectSocialSignup = () => {
    // dispatch(resetSocialNotRegistered());
    history.push('/signup');
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const validationSchema = Yup.object({
    isEmail: Yup.boolean(),
    email: Yup.string()
      .trim()
      .when('isEmail', {
        is: true,
        then: Yup.string().email(EMAIL_OR_PHONE_VALID),
        otherwise: Yup.string().min(5, PHONE_VALID).max(13, PHONE_VALID),
      })
      .required(EMAIL_PHONE_REQUIRED),
    password: Yup.string().required(PASSWORD_REQUIRED),
    loginType: Yup.string(),
    socialId: Yup.string(),
  });

  const submitBtnHandler = values => {
    const requestBody = { ...values };
    


    // requestBody.deviceToken = localStorage.getItem('gtoken');

    if (!isNaN(requestBody.email)) {
      requestBody.phone = requestBody.email;
      requestBody.email = '';
      delete requestBody.email;
    } else {
      delete requestBody.phone;
    }
    if (
      requestBody.loginType === 'twitter' ||
      requestBody.loginType === 'facebook' ||
      requestBody.loginType === 'google'
    ) {
      delete requestBody.phone;
    }
    dispatch(login(requestBody));
  };

  const handleSocialLoginError = error => {
    if (
      !(
        error !== 'Firebase: Error (auth/popup-closed-by-user).' ||
        error !== 'Firebase: Error (auth/cancelled-popup-request).'
      )
    ) {
      dispatch(
        showModal({
          open: true,
          notifyType: 1,
          message: error || 'Something went wrong! Please try again.',
        }),
      );
    }
  };

  const handleFacebookLogin = () => {
    let firstName = '';
    let lastName = '';
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const { user } = result;
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        const { email, displayName } = user;
        const { oauthAccessToken } = result._tokenResponse;

        if (displayName) {
          if (displayName.split(' ').length > 1) {
            [firstName, lastName] = displayName.split(' ');
          } else {
            [firstName] = displayName.split(' ');
          }
        }

        submitBtnHandler({
          firstName,
          lastName,
          email,
          loginType: 'facebook',
          socialId: user.providerData && user.providerData[0].uid,
          socialAccessToken: oauthAccessToken,
          redirectSocialSignup,
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        handleSocialLoginError(errorMessage);
      });
  };
  const handleGoogleLogin = () => {
    let firstName = '';
    let lastName = '';
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { user, _tokenResponse } = result;
        const { email, displayName } = user;
        const { oauthIdToken } = _tokenResponse;

        if (displayName) {
          if (displayName.split(' ').length > 1) {
            [firstName, lastName] = displayName.split(' ');
          } else {
            [firstName] = displayName.split(' ');
          }
        }
        submitBtnHandler({
          firstName,
          lastName,
          email,
          loginType: 'google',
          socialId: user.providerData && user.providerData[0].uid,
          // socialAccessToken: accessToken,
          socialAccessToken: oauthIdToken,
          redirectSocialSignup,
        });
        // ...
      })
      .catch(error => {
        const errorMessage = error.message;
        handleSocialLoginError(errorMessage);
        // ...
      });
  };
  const handleTwitterLogin = () => {
    let firstName = '';
    let lastName = '';
    signInWithPopup(auth, twitterProvider)
      .then(result => {
        const { user, _tokenResponse } = result;
        const { oauthAccessToken, oauthTokenSecret } = _tokenResponse;
        const { email, displayName } = user;

        if (displayName) {
          if (displayName.split(' ').length > 1) {
            [firstName, lastName] = displayName.split(' ');
          } else {
            [firstName] = displayName.split(' ');
          }
        }
        submitBtnHandler({
          firstName,
          lastName,
          email,
          loginType: 'twitter',
          socialId: user.providerData && user.providerData[0].uid,
          socialAccessToken: oauthAccessToken,
          oauth_token_secret: oauthTokenSecret,
          redirectSocialSignup,
        });
        // ...
      })
      .catch(error => {
        const errorMessage = error.message;
        handleSocialLoginError(errorMessage);
      });
  };


  const handleSubmit = async (e, values) => {
    e.preventDefault();
    console.log("signed in");
    console.log("Form Value:", values);
  
    const requestBody = { ...values };
  
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You might need additional headers like authorization tokens
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        // Handle error, for example:
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      
      // Handle the response data, for example:
      console.log("Login successful:", responseData);
  
      // Dispatch your action or handle success accordingly
      // dispatch(
      //   login({
      //     data: responseData,
      //     modalHandler: setOTPModalOpen,
      //   }),
      // );
  
      // Further actions after successful login
      console.log("dispatch");  
      // history.push('/dashboard');
      console.log("redirecting");

    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, show error message, etc.
    }
  };
  


  // const handleSubmit =(e, values) =>{

  //   e.preventDefault();
  //   console.log("signed in")
  //   console.log("Form Value:", values);
  //   const requestBody = { ...values };

  //   dispatch(
  //     login({
  //       data: requestBody,
  //       modalHandler: setOTPModalOpen,
  //     }),
  //   );
  //   console.log("dispatch")
    
  // }

  const successHandler = payload => {
    setOTPModalOpen(false);
    setIsUserVerfication(false);
    dispatch(otpVerifySuccess(payload));
    if (!verificationFlow) {
      setOpenCreatePasswordModal(true);
    } else {
      dispatch(
        showModal({
          open: true,
          notifyType: 2,
          message: 'Your account is verified!',
          buttonClick: () => dispatch(resetTempData()),
        }),
      );
    }
  };
  const modalButtonHandlerVerify = payload => {
    dispatch(
      otpVerifySaga({
        phone: tempPhone,
        successHandler,
        type: 'verifyPhone',
        // countryCode: '+91',
        ...payload,
      }),
    );
  };
  // const modalButtonHandler = payload => {
  //   dispatch(
  //     otpVerifySaga({
  //       phone,
  //       successHandler,
  //       type: 'verifyPhone',
  //       ...payload,
  //     }),
  //   );
  // };

  const modalButtonHandler = payload => {
    dispatch(
      otpVerifySaga({
        countryCode,
        phone,
        signupToken,
        successHandler,
        // type: isPhoneVerified ? 'forgot pwd' : 'verify',
        type: 'forgotPassword',
        ...payload,
      }),
    );
  };
  
  return (
    <AuthLayout isLogin>

      <div className="col col-sm-12 col-md-12  col-lg-5 pad-15 p-7">
        <h3 className="signinTitle">Sign In</h3>
        <h6 className="grey-text f-18 o-5 mt-3 mb-4">
          Please sign in to continue using the website
        </h6>
        <Formik
          initialValues={{
            email: '',
            // email: process.env.REACT_APP_TESTING ? 'something10@gmail.com' : '',
            // phone: '',
            // password: process.env.REACT_APP_TESTING ? 'Solulab@1234' : '',
            password: '',
            loginType: 'manual',
            socialId: '',
            isEmail: true,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            validationSchema.validate(values);
            submitBtnHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            // handleSubmit,
            isSubmitting,
            isValid
          }) => (
            <form onSubmit={(e) => handleSubmit(e, values)} noValidate autoComplete="off">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1 mb-2">Email/Phone No.</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email/Phone No."
                  name="email"
                  value={values.email && values.email.trim().replace(/\s/g, '')}
                  onChange={e => {
                    const { value } = e.target;
                    if (isNaN(value)) {
                      setFieldValue('isEmail', true);
                    } else {
                      setFieldValue('isEmail', false);
                      setTempPhone(value);
                    }
                    handleChange(e);
                  }}
                  onBlur={e => {
                    if (isNaN(e.target.value)) {
                      setFieldValue('isEmail', true);
                    } else {
                      setFieldValue('isEmail', false);
                    }
                    handleBlur(e);
                  }}
                  onClick={() => {
                    // resetting the incorrect email/phonenumber error
                    if (errorType && errorMsg) dispatch(resetErrorMsg());
                  }}
                />
                <div className="error-message">
                  {(errors.email && touched.email && errors.email) ||
                    (errorType === 'phone_or_mail' && errorMsg)}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1 mb-2">Password</label>
                <div className="relative-positioner">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    className="form-control"
                    placeholder="**********"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={() => {
                      // resetting the incorrect password error
                      if (errorType && errorMsg) dispatch(resetErrorMsg());
                    }}
                  />
                  <i
                    className={passwordShown ? 'far fa-eye' : 'far fa-eye-slash'}
                    id="togglePassword"
                    onClick={togglePasswordVisiblity}
                    onKeyDown={togglePasswordVisiblity}
                    aria-hidden="true"
                  />
                </div>
                <div className="error-message">
                  {(errors.password && touched.password && errors.password) ||
                    (errorType === 'password' && errorMsg)}
                </div>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <div className="form-check check-radio">
                  <input type="checkbox" className="form-check-input" />
                  <label className="form-check-label ml-1" htmlFor="exampleCheck1">
                    Remember me
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    className="resend-button"
                    onClick={() => {
                      setOpenForgotPasswordModal(true);
                    }}
                  >
                    Forgot Password ?
                  </button>
                </div>
              </div>
              {isLogin && verificationFlow && (
                <p className="error-message text-center">
                  Your account is not verified. Please click
                  <button
                    type="button"
                    className="resend-button"
                    onClick={() => {
                      setIsUserVerfication(true);
                      // const phone = values.email;
                      dispatch(
                        otpResendSaga({
                          phone: tempPhone,
                          resetCount,
                        }),
                      );
                      // otpVerifySaga({
                      //   countryCode,
                      //   phone,
                      //   type: 'verifyPhone',
                      //   ...payload,
                      // }),
                      setOTPModalOpen(true);
                      // setOpenPhoneValModal(true);
                    }}
                  >
                    here
                  </button>
                  for send OTP.
                </p>
              )}
              <div className="error-message">
                {!OTPModalOpen &&
                  !openForgotPasswordModal &&
                  !openCreatePasswordModal &&
                  !errorType &&
                  errorMsg}
              </div>
              <button type="submit" className="btn btn-primary signIn-btn w-100"
              disabled={isSubmitting || !isValid}
              >
                Sign In
              </button>
            </form>
          )}
        </Formik>
        <p className="text-blu my-3 text-center">OR</p>

        <div className="d-flex social-flex align-items-center">
          <div className="m-1">
            <button
              type="button"
              className="btn default-btn social-btn
               my-1 d-flex align-items-center justify-content-center social-btn-style"
              onClick={handleGoogleLogin}
            >
              <img className="social-img mr-3" src={GOOGLE_SVG} alt="" />
              Google
            </button>
          </div>
          <div className="m-1">
            <button
              type="button"
              className="btn default-btn social-btn
               my-1 d-flex align-items-center justify-content-center social-btn-style"
              onClick={handleFacebookLogin}
            >
              <img className="social-img mr-3" src={FACEBOOK_SVG} alt="" />
              Facebook
            </button>
          </div>{' '}
          <div className="m-1">
            <button
              type="button"
              className="btn default-btn social-btn
               my-1 d-flex align-items-center justify-content-center social-btn-style"
              onClick={handleTwitterLogin}
            >
              <img className="social-img mr-3" src={TWITTER_SVG} alt="" />
              Twitter
            </button>
          </div>
        </div>
        <br />
        <div className="text-center mt-0 signInLink">
          <p>
            Don&apos;t have an account yet? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      {openPhoneValModal && (
        <PhoneNumerValModal
          modalOpenClose={setOpenPhoneValModal}
          setOTPModalOpen={setOTPModalOpen}
        />
      )}
      {openForgotPasswordModal && (
        <ForgotPasswordModal
          modalOpenClose={setOpenForgotPasswordModal}
          setOTPModalOpen={setOTPModalOpen}
        />
      )}
      {OTPModalOpen && !isUserVerification && (
        <OTPModal modalOpenClose={setOTPModalOpen} buttonHandler={modalButtonHandler} />
      )}
      {OTPModalOpen && isUserVerification && (
        <OTPModal modalOpenClose={setOTPModalOpen} buttonHandler={modalButtonHandlerVerify} />
      )}
      {openCreatePasswordModal && (
        <CreatePasswordModal modalOpenClose={setOpenCreatePasswordModal} />
      )}
      {open && <AlertMessageModal />}
    </AuthLayout>
  );
};

export default Login;
