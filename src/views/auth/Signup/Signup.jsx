import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';
import MaskedInput from 'react-text-mask';
import 'react-phone-input-2/lib/material.css';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';
import auth from '../../../firebase';

import {
  otpVerifySaga,
  otpVerifySuccess,
  resetSocialNotRegistered,
  showModal,
  signupSaga,
} from '../../../store/actions';
import {
  FIRSTNAME_REQUIRED,
  LASTNAME_REQUIRED,
  EMAIL_VALID,
  EMAIL_REQUIRED,
  COUNTRYCODE_REQUIRED,
  PHONE_REQUIRED,
  PHONE_VALID,
  PASSWORD_REQUIRED,
  PASSWORD_VALIDATION,
  SET_PASSWORDS_NOT_MATCH,
  CONFIRM_PASSWORD_REQUIRED,
  GENDER_REQUIRED,
  USERNAME_REQUIRED,
  DATE_OF_BIRTH_REQUIRED,
  USERNAME_LENGTH,
} from '../../../constants/errorConstants';
import AuthLayout from '../AuthLayout/AuthLayout';

import OTPModal from './OTPModal';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
import DocumentVarificationModal from './DocumentVarificationModal';
import { FACEBOOK_SVG, GOOGLE_SVG, TWITTER_SVG } from '../../../assets/images';

// eslint-disable-next-line no-unused-vars
const Signup = props => {
  const [OTPModalOpen, setOTPModalOpen] = useState(false);
  const [documentVarificationModalOpen, setDocumentVarificationModalOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [repasswordShown, RepasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [dialCode, setDialCode] = useState('1');
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    password: '',
    rePassword: '',
    deviceType: 'ios',
    fcmToken: '',
    loginType: 'manual',
    socialId: '',
    gender: '',
    dob: '',
    userName: '',
    socialAccessToken: '',
    oauth_token_secret: '',
  });

  const { open } = useSelector(state => state.modal);
  const {
    tempUserData: { countryCode, phone },
    signupToken,
    socialData,
  } = useSelector(state => state.auth);
  const errorMsg = useSelector(state => state.auth.errorMsg);

  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  useEffect(() => {
    if (socialData !== null) {
      const {
        email,
        loginType,
        socialId,
        socialAccessToken,
        firstName,
        lastName,
        // eslint-disable-next-line camelcase
        oauth_token_secret,
      } = socialData;
      setInitialValues({
        ...initialValues,
        firstName,
        lastName,
        email,
        socialId,
        loginType,
        socialAccessToken,
        oauth_token_secret,
      });
    }
    return () => dispatch(resetSocialNotRegistered());
  }, [dispatch]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(256, USERNAME_LENGTH)
      .trim()
      // .matches(/^[A-Za-z]+$/, FIRSTNAME_REQUIRED)
      .required(FIRSTNAME_REQUIRED),
    lastName: Yup.string()
      .max(256, USERNAME_LENGTH)
      .trim()
      // .matches(/^[A-Za-z]+$/, LASTNAME_REQUIRED)
      .required(LASTNAME_REQUIRED),
    email: Yup.string().email(EMAIL_VALID).required(EMAIL_REQUIRED),
    countryCode: Yup.number().required(COUNTRYCODE_REQUIRED),
    phone: Yup.string()
      .min(dialCode.length + 5, PHONE_VALID)
      .max(13, PHONE_VALID)
      .required(PHONE_REQUIRED),
    password:
      initialValues.loginType === 'manual' &&
      !initialValues.socialId &&
      Yup.string()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, PASSWORD_VALIDATION)
        .required(PASSWORD_REQUIRED),
    rePassword:
      initialValues.loginType === 'manual' &&
      !initialValues.socialId &&
      Yup.string()
        .oneOf([Yup.ref('password'), null], SET_PASSWORDS_NOT_MATCH)
        .required(CONFIRM_PASSWORD_REQUIRED),
    gender: Yup.string().required(GENDER_REQUIRED),
    dob: Yup.string().required(DATE_OF_BIRTH_REQUIRED),
    userName: Yup.string().required(USERNAME_REQUIRED),
  });

  // eslint-disable-next-line consistent-return
  const submitBtnHandler = values => {
    if (disable) return '';
    const requestBody = { ...values };
    dispatch(
      signupSaga({
        data: requestBody,
        modalHandler: setOTPModalOpen,
      }),
    );
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

  const handleGoogleLogin = () => {
    let firstName = '';
    let lastName = '';
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { user, _tokenResponse } = result;
        const { oauthIdToken } = _tokenResponse;
        const { email, displayName } = user;

        if (displayName) {
          if (displayName.split(' ').length > 1) {
            [firstName, lastName] = displayName.split(' ');
          } else {
            [firstName] = displayName.split(' ');
          }
        }

        setInitialValues({
          ...initialValues,
          firstName,
          lastName,
          socialId: user.providerData && user.providerData[0].uid,
          socialAccessToken: oauthIdToken,
          loginType: 'google',
          email,
          // phone: phoneNumber,
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        handleSocialLoginError(errorMessage);
        // ...
      });
  };
  const handleFacebookLogin = () => {
    let firstName = '';
    let lastName = '';
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const { user, _tokenResponse } = result;
        const { email, displayName } = user;
        const { oauthAccessToken } = _tokenResponse;
        if (displayName) {
          if (displayName.split(' ').length > 1) {
            [firstName, lastName] = displayName.split(' ');
          } else {
            [firstName] = displayName.split(' ');
          }
        }
        setInitialValues({
          ...initialValues,
          firstName,
          lastName,
          socialAccessToken: oauthAccessToken,
          loginType: 'facebook',
          email,
          socialId: user.providerData && user.providerData[0].uid,
          // phone: phoneNumber,
        });
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

        setInitialValues({
          ...initialValues,
          firstName,
          lastName,
          socialAccessToken: oauthAccessToken,
          oauth_token_secret: oauthTokenSecret,
          loginType: 'twitter',
          email,
          socialId: user.providerData[0].uid,
          // phone: phoneNumber,
        });
      })
      .catch(error => {
        const errorMessage = error.message;
        handleSocialLoginError(errorMessage);
        // ...
      });
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const togglerePasswordVisiblity = () => {
    RepasswordShown(!repasswordShown);
  };

  const successHandler = payload => {
    setOTPModalOpen(false);
    dispatch(otpVerifySuccess(payload));
    dispatch(
      showModal({
        open: true,
        notifyType: 2,
        message: 'OTP verified successfully',
        redirectURL: '/signin',
      }),
    );
  };

  const modalButtonHandler = payload => {
    dispatch(
      otpVerifySaga({
        countryCode,
        phone,
        signupToken,
        successHandler,
        type: 'verifyPhone',
        ...payload,
      }),
    );
  };

  return (
    <AuthLayout isLogin={false}>
      <div className="col col-sm-12 col-md-12 pad-30 col-lg-5 p-7">
        <h3 className="signinTitle">
          {initialValues.loginType === 'manual' && !initialValues.socialId
            ? 'Sign Up1'
            : 'Social Sign Up'}
        </h3>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fname">First name:</label>
          <br />
          <input
            type="text"
            id="fname"
            name="fname"
            value={this.state.fname}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="lname">Last name:</label>
          <br />
          <input
            type="text"
            id="lname"
            name="lname"
            value={this.state.lname}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>

        <h6 className="grey-text f-18 o-5 mt-3 mb-4">Please sign up to enter</h6>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const obj = { ...values };
            obj.phone = String(values.phone.substring(values.countryCode.length - 1));
            obj.countryCode = `${values.countryCode}`;
            submitBtnHandler(obj);
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
            handleSubmit,
            // isSubmitting
          }) => (
            <form
              onSubmit={handleSubmit}
              autoComplete="nope"
              // autoFill="off"
              // noValidate
              // readOnly
              // onFocus="this.removeAttribute('readonly');"
              // onBlur="this.setAttribute('readonly','');"
            >
              <div className="row">
                <div className="form-group col">
                  <label htmlFor="exampleInputEmail1 mb-2">First Name</label>
                  <input
                    type="text"
                    // pattern="[^\s]+"
                    className="form-control"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={values.firstName && values.firstName.trim()}
                    // value={values.firstName &&
                    // values.firstName.trim().replace(/[^a-zA-Z]/gi, '')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="error-message">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="exampleInputEmail1 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={values.lastName && values.lastName.trim()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="error-message">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1 mb-2">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email Address"
                  name="email"
                  disabled={
                    initialValues.email &&
                    initialValues.loginType !== 'manual' &&
                    initialValues.socialId
                  }
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">{errors.email && touched.email && errors.email}</div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1 mb-2">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter UserName"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="nope"
                />
                <div className="error-message">
                  {errors.userName && touched.userName && errors.userName}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1 mb-2">Phone Number</label>
                <div>
                  <PhoneInput
                    type="name"
                    placeholder="Enter phone number"
                    specialLabel={false}
                    value={values.phone}
                    // eslint-disable-next-line no-shadow
                    onChange={(value, props, e) => {
                      if (value.length > 10 + props.dialCode.length) {
                        e.preventDefault();
                      } else {
                        if (props.dialCode !== dialCode) {
                          setDialCode(props.dialCode);
                        }
                        setFieldValue('phone', value);
                        setFieldValue('countryCode', `+${props.dialCode}`);
                      }
                    }}
                    inputStyle={{
                      width: '100%',
                      font: 'caption',
                      border: '1px solid #999999',
                    }}
                    countryCodeEditable={false}
                    enableSearch
                    country="us"
                    onBlur={e => {
                      e.target.name = 'phone';
                      if (e.target.value.length > 10) {
                        e.preventDefault();
                      } else {
                        handleBlur(e);
                      }
                    }}
                  />
                  <div className="error-message">
                    {errors.phone && touched.phone && errors.phone}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col">
                  <label htmlFor="exampleFormControlSelect1">Gender</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="error-message">
                    {errors.gender && touched.gender && errors.gender}
                  </div>
                </div>
                <div className="form-group col">
                  <label className="">Date of Birth</label>
                  <div className="dateinput">
                    <DatePicker
                      className="form-control datetimepicker2"
                      selected={values.dob}
                      dateFormat="dd/MM/yyyy"
                      name="dob"
                      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 10))}
                      onChange={date => {
                        setFieldValue('dob', date);
                      }}
                      customInput={
                        <MaskedInput
                          // mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /[1-2]/, /[0,9]/, /\d/, /\d/]}
                          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        />
                      }
                      placeholderText="dd/mm/yyyy"
                      showYearDropdown
                      showMonthDropdown
                      autoComplete="off"
                    />
                  </div>
                  <div className="error-message">
                    {errors.dob && touched.dob && errors.dob && values.dob == null
                      ? `${DATE_OF_BIRTH_REQUIRED}`
                      : errors.dob && touched.dob && errors.dob}
                  </div>
                </div>
              </div>
              {initialValues.loginType === 'manual' && !initialValues.socialId && (
                <>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1 mb-2">Create Password</label>
                    <div className="relative-positioner">
                      <input
                        type={passwordShown ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                      {errors.password && touched.password && errors.password}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor=" mb-2">Re-enter Password</label>
                    <div className="relative-positioner">
                      <input
                        type={repasswordShown ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Re-enter Password"
                        name="rePassword"
                        value={values.rePassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <i
                        className={repasswordShown ? 'far fa-eye' : 'far fa-eye-slash'}
                        id="togglePassword"
                        onClick={togglerePasswordVisiblity}
                        onKeyDown={togglerePasswordVisiblity}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="error-message">
                    {errors.rePassword && touched.rePassword && errors.rePassword}
                  </div>
                </>
              )}
              <div className="d-flex justify-content-between mb-4">
                <div className="form-check check-radio">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={() => setDisable(!disable)}
                  />
                  <label className="form-check-label ml-2" htmlFor="exampleCheck1">
                    I agree with{' '}
                    <Link to="/terms-and-conditions" target="_blank">
                      <u>terms &amp; conditions</u>
                    </Link>
                  </label>
                </div>
              </div>
              {errorMsg && <div className="error-message mb-4">{errorMsg}</div>}
              <button
                type="submit"
                className={disable ? 'btn btn-primary disabled-signup' : 'btn btn-primary'}
              >
                Sign Up
              </button>
              {/* <button
              type="button"
              className="btn btn-primary  w-100"
              data-toggle="modal"
              data-target="#enterOTP"
            >
              Sign Up
            </button> */}
              {initialValues.loginType === 'manual' && !initialValues.socialId && (
                <>
                  <p className="text-blu my-0 mt-3 mb-1 text-center">OR</p>
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
                </>
              )}
              <div className="text-center mt-4 signInLink">
                <p>
                  Already have an account yet? <Link to="/signin">Sign In</Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
        {OTPModalOpen && (
          <OTPModal modalOpenClose={setOTPModalOpen} buttonHandler={modalButtonHandler} />
        )}
        {open && <AlertMessageModal />}
        {documentVarificationModalOpen && (
          <DocumentVarificationModal modalOpenClose={setDocumentVarificationModalOpen} />
        )}
      </div>
    </AuthLayout>
  );
};

export default Signup;
