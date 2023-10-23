import { useEffect, useState, memo } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import Model from '../../../components/UI/Model/Model';
import { otpResendSaga } from '../../../store/actions';

const OTPModal = props => {
  const { otpMsg } = props;
  const [OTP, setOTP] = useState('');
  const [errorOTP, setErrorOTP] = useState(false);
  const [count, setCount] = useState(30);
  const {
    tempUserData: { phone },
    isOTPSendSuccess,
    isOTPSendFail,
    errorMsg,
  } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

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

  const FooterComponent = () => (
    <div className="button-function-enabler">
      <button
        type="button"
        className="btn"
        style={{ backgroundColor: 'blue', color: 'white' }}
        onClick={() => {
          if (OTP.length === 6) {
            setErrorOTP(false);
            props.buttonHandler({ otp: OTP });
          } else {
            setErrorOTP(true);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
  return (
    <Model
      closeModel={closeModel}
      headerTitle="Enter OTP"
      modalId="otpModal"
      FooterComponent={memo(FooterComponent)}
      errorMsg={isOTPSendFail}
      successMsg={isOTPSendSuccess}
      footerModalClass="ml-5 mr-5"
      //   submitBtnText="Cancel"
    >
      <p className="text-center mb-4 txt-light">{otpMsg}</p>
      <div
        className="modal-body input-otp"
        style={{
          textAlign: 'center',
          margin: '0 auto',
          paddingBottom: 0,
        }}
      >
        <OtpInput
          value={OTP}
          onChange={value => {
            if (errorOTP && value.length === 6) {
              setErrorOTP(false);
            }
            setOTP(value);
          }}
          numInputs={6}
          inputStyle={{
            padding: 10,
            marginRight: 10,
            border: '1px solid',
            borderRadius: 3,
            width: 40,
            height: 40,
          }}
          errorStyle={{
            borderColor: '#c52626',
          }}
          shouldAutoFocus
          isInputNum
          hasErrored={errorOTP}
        />
        <div className="d-flex justify-content-between mt-2 float-right mr-2">
          {count !== 0 ? (
            <span>00:{count >= 10 ? count : `0${count}`}</span>
          ) : (
            <button
              type="button"
              className="resend-button"
              onClick={() => {
                dispatch(
                  otpResendSaga({
                    phone,
                    resetCount,
                  }),
                );
              }}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
      <div className="error-message text-center">{errorMsg}</div>
    </Model>
  );
};

export default OTPModal;
