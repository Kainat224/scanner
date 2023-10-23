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
import { changePasswordSaga } from '../../../store/actions';

const CreateSocialPassword = props => {
  const {
    errorMsg,
    userData: { phone, countryCode },
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

  return (
    <Formik
      initialValues={{
        password: '',
        rePassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // dispatch(createPasswordSaga({ ...values, phone, countryCode, referenceToken, closeModel }));
        dispatch(
          changePasswordSaga({
            phone,
            countryCode,
            newPassword: values.password,
            // closeModel,
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
            modalId="createSocialPassword"
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
                <input
                  type="password"
                  className="form-control mr-2"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">
                  {errors.password && touched.password && errors.password}
                </div>
              </div>
              <div className="form-group mt-2 mb-0">
                <label className="mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control mr-2"
                  placeholder="Confirm Password"
                  name="rePassword"
                  value={values.rePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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

export default CreateSocialPassword;
