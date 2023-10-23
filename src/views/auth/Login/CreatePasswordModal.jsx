import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Model from '../../../components/UI/Model/Model';
import {
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_VALIDATION,
  SET_PASSWORDS_NOT_MATCH,
} from '../../../constants/errorConstants';
import { createPasswordSaga } from '../../../store/actions';

const encodedString = data => Buffer.from(data).toString('base64');
const CreatePasswordModal = props => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const {
    errorMsg,
    tempUserData: { referenceToken },
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, PASSWORD_VALIDATION)
      .required(PASSWORD_REQUIRED),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], SET_PASSWORDS_NOT_MATCH)
      .required(CONFIRM_PASSWORD_REQUIRED),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <button type="submit" className="btn btn-primary">
      Reset
    </button>
  );
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Formik
      initialValues={{
        password: '',
        rePassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          createPasswordSaga({
            newPassword: values.password,
            referenceToken: encodedString(referenceToken),
            closeModel,
          }),
        );

        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        // isSubmitting
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Model
            closeModel={closeModel}
            headerTitle="Create Password"
            modalId="createPasswordModal"
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
              <div className="form-group mb-0">
                <label className="mb-2">Enter New Password</label>
                <div className="relative-positioner">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    className="form-control mr-2"
                    placeholder="Password"
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
              <div className="form-group mt-2 mb-0">
                <label className="mb-2">Confirm Password</label>
                <div className="relative-positioner">
                  <input
                    type={confirmPasswordShown ? 'text' : 'password'}
                    className="form-control mr-2"
                    placeholder="Confirm Password"
                    name="rePassword"
                    value={values.rePassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <i
                    className={confirmPasswordShown ? 'far fa-eye' : 'far fa-eye-slash'}
                    id="togglePassword"
                    onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}
                    onKeyDown={() => setConfirmPasswordShown(!confirmPasswordShown)}
                    aria-hidden="true"
                  />
                </div>
                <div className="error-message">
                  {errors.rePassword && touched.rePassword && errors.rePassword}
                </div>
              </div>
            </div>
          </Model>
        </form>
      )}
    </Formik>
  );
};

export default CreatePasswordModal;
