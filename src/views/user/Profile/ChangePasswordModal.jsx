import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Model from '../../../components/UI/Model/Model';
// import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
import {
  PASSWORD_REQUIRED,
  PASSWORD_VALIDATION,
  SET_PASSWORDS_NOT_MATCH,
  CONFIRM_PASSWORD_REQUIRED,
} from '../../../constants/errorConstants';
import { changePasswordSaga } from '../../../store/actions';

const ChangePasswordModal = props => {
  const [oldpasswordShown, OldasswordShown] = useState(false);
  const [newpasswordShown, NewpasswordShown] = useState(false);
  const [repasswordShown, RepasswordShown] = useState(false);
  const dispatch = useDispatch();
  const {
    userData: { phone, countryCode },
    errorMsg,
  } = useSelector(state => state.auth);
  // const { open } = useSelector(state => state.modal);
  //   const [alertModal, setAlertModal] = useState(false);

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required(PASSWORD_REQUIRED),
    newPassword: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, PASSWORD_VALIDATION)
      .required(PASSWORD_REQUIRED),
    rePassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], SET_PASSWORDS_NOT_MATCH)
      .required(CONFIRM_PASSWORD_REQUIRED),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const togglePasswordVisiblity = () => {
    OldasswordShown(!oldpasswordShown);
  };
  const togglenewPasswordVisiblity = () => {
    NewpasswordShown(!newpasswordShown);
  };
  const togglerePasswordVisiblity = () => {
    RepasswordShown(!repasswordShown);
  };
  //   const closeAlertModal = () => {
  //     setAlertModal(true);
  //   };

  const FooterComponent = () => (
    <>
      <button
        id="changePwdBtn"
        className="btn btn-secondary"
        data-dismiss="modal"
        data-toggle="modal"
        data-target="#changePwd"
        type="submit"
      >
        Submit
      </button>
    </>
  );

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          phone,
          countryCode,
        };
        dispatch(changePasswordSaga({ ...data }));
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
          (
          <Model
            closeModel={closeModel}
            headerTitle="Change Password"
            modalId="changePassword"
            FooterComponent={FooterComponent}
            //   submitBtnText="Cancel"
          >
            <div className="modal-body pt-0">
              <div className="form-group mb-0">
              <div className="relative-positioner" >
                <input
                 type=  {oldpasswordShown ? 'text' : 'password'}
                  className="form-control my-4"
                  placeholder="Enter old password"
                  name="oldPassword"
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i
                    className={oldpasswordShown ? 'far fa-eye' : 'far fa-eye-slash'}
                    id="togglePassword"
                    onClick={togglePasswordVisiblity}
                    onKeyDown={togglePasswordVisiblity}
                    aria-hidden="true"
                  />
               
              </div>
              <div className="error-message">
                  {errors.oldPassword && touched.oldPassword && errors.oldPassword}
                </div>
              </div>
              <div className="form-group mb-0">
              <div className="relative-positioner" >
                <input
                  type=  {newpasswordShown ? 'text' : 'password'}
                  className="form-control my-4"
                  placeholder="Enter new password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i
                    className={newpasswordShown ? 'far fa-eye' : 'far fa-eye-slash'}
                    id="togglePassword"
                    onClick={togglenewPasswordVisiblity}
                    onKeyDown={togglenewPasswordVisiblity}
                    aria-hidden="true"
                  />
                
              </div>
              <div className="error-message">
                  {errors.newPassword && touched.newPassword && errors.newPassword}
                </div>
              </div>
             
              <div className="relative-positioner" >
                <input
                  type=  {repasswordShown ? 'text' : 'password'}
                  className="form-control my-4 "
                  placeholder="Re-enter new password"
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
              <div className="error-message">
                  {errors.rePassword && touched.rePassword && errors.rePassword}
              </div>
              <div className="error-message">{errorMsg}</div>
            </div>
          </Model>
          )
        </form>
      )}
    </Formik>
  );
};

export default ChangePasswordModal;
