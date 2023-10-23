import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import PhoneInput from 'react-phone-input-2';
import Model from '../../../components/UI/Model/Model';
import { PHONE_REQUIRED, PHONE_VALID } from '../../../constants/errorConstants';
import {
  resetErrorMsg,
  // otpVerifySuccess,
  //  showModal
} from '../../../store/actions';
import 'react-phone-input-2/lib/material.css';
// import { otpVerifySaga } from '../../../store/sagas/auth/auth';

const PhoneNumerValModal = props => {
  const {
    tempUserData:
      // { countryCode, phone },
      // verificationFlow,
      // signupToken,
      // isLogin,
      errorMsg,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [dialCode, setDialCode] = useState('1');

  useEffect(() => () => dispatch(resetErrorMsg()), [dispatch]);

  const validationSchema = Yup.object({
    // phone: Yup.string().min(5, PHONE_VALID).max(10, PHONE_VALID).required(PHONE_REQUIRED),
    phone: Yup.string()
      .min(dialCode.length + 5, PHONE_VALID)
      .max(13, PHONE_VALID)
      .required(PHONE_REQUIRED),
  });

  // const successHandler = payload => {
  //   props.setOTPModalOpen(false);
  //   dispatch(otpVerifySuccess(payload));
  //   dispatch(
  //     showModal({
  //       open: true,
  //       notifyType: 2,
  //       message: payload.msg,
  //       redirectURL: '/signin',
  //     }),
  //   );
  // };
  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <button type="submit" className="btn btn-primary">
      Send OTP
    </button>
  );

  // const modalHandler = () => {
  //   closeModel();
  //   props.setOTPModalOpen(true);
  // };

  return (
    <Formik
      initialValues={{
        phone: '',
        countryCode: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // dispatch(
        //   otpVerifySaga({
        //     countryCode: values.countryCode,
        //     phone: String(values.phone.substring(values.countryCode.length - 1)),
        //     signupToken,
        //     successHandler,
        //     type: 'verifyPhone',
        //   }),

        //   forgotPasswordSaga({
        //     modalHandler,
        //     phone: String(values.phone.substring(values.countryCode.length - 1)),
        //     countryCode: values.countryCode,
        //   }),
        props.setOTPModalOpen(true);

        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        // handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        // isSubmitting
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Model
            closeModel={closeModel}
            headerTitle="User verification"
            modalId="forgotPasswordModal"
            FooterComponent={FooterComponent}
            errorMsg={errorMsg}
            //   submitBtnText="Cancel"
          >
            <div
              className="modal-body pt-0"
              style={{
                margin: '0 auto',
                width: '100%',
              }}
            >
              <p className="text-center mb-4 txt-light">Don&apos;t worry we&apos;re here</p>
              <div className="form-group mb-0">
                <label className="mb-2">Registered Phone no.</label>
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
                <div className="error-message">{errors.phone && touched.phone && errors.phone}</div>
              </div>
            </div>
          </Model>
        </form>
      )}
    </Formik>
  );
};

export default PhoneNumerValModal;
