import React from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class InputPhone extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { phone: '' };

  handleOnChange = value => {
    this.setState({ phone: value }, () => {
      console.log(this.state.phone);
    });
  };

  render() {
    return (
      <div>
        <ReactPhoneInput
          inputExtraProps={{
            name: 'phone',
            required: true,
            autoFocus: true,
          }}
          defaultCountry="sg"
          value={this.state.phone}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default InputPhone;
