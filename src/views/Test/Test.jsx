import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// import TwitterLogin from 'react-twitter-login';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

// eslint-disable-next-line no-unused-vars
const Test = props => {
  const [OTP, setOTP] = useState('');
  let element;

  // eslint-disable-next-line no-unused-vars
  const facebookResponse = e => {
    console.log('🚀 ~ file: Login.jsx ~ line 36 ~ e', e);
  };

  // eslint-disable-next-line no-unused-vars
  const googleResponse = e => {
    console.log('🚀 ~ file: Login.jsx ~ line 36 ~ e', e);
  };

  const isInViewport = (offset = 0) => {
    if (!element) return false;
    const { top } = element.getBoundingClientRect();
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  return (
    <div id="wrapper">
      <FacebookLogin
        appId="1410623085956266"
        autoLoad={false}
        fields="name,email,picture,birthday,gender"
        callback={facebookResponse}
        buttonStyle={{ fontSize: 15, padding: 11, marginRight: 15 }}
      />
      <GoogleLogin
        clientId="1029800951716-209eo432ioooc4tilcohrnv77east8db.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={googleResponse}
      />
      <OtpInput
        value={OTP}
        onChange={value => setOTP(value)}
        numInputs={6}
        inputStyle={{
          padding: 10,
          marginRight: 5,
          border: '1px solid',
          borderRadius: 3,
        }}
        shouldAutoFocus
        isInputNum
      />
      <Slider dots step={10} />
      <button
        style={{ position: 'fixed' }}
        type="button"
        onClick={() => console.log(isInViewport())}
      >
        Check
      </button>
      <div style={{ height: 1000 }}>test</div>
      <div ref={el => (element = el)}>test</div>
    </div>
  );
};

export default Test;
