/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { PROFILE_SVG, VIP_ICON_PNG } from '../../../assets/images';
import Model from '../../../components/UI/Model/Model';

import {
  FIRSTNAME_REQUIRED,
  GENDER_REQUIRED,
  LASTNAME_REQUIRED,
} from '../../../constants/errorConstants';
import { editUserDetailSaga, updateProfilePicSaga } from '../../../store/actions';

const EditProfileModal = props => {
  const { userData } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string().required(FIRSTNAME_REQUIRED),
    lastName: Yup.string().required(LASTNAME_REQUIRED),
    gender: Yup.string().required(GENDER_REQUIRED),
    dob: Yup.string().required(GENDER_REQUIRED),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      {userData.loginType === 'manual' ? (
        <>
          <button
            type="button"
            id="changePwdBtn"
            className="btn btn-secondary"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#changePwd"
            onClick={() => {
              const { modalOpenClose, modalPasswordOpenClose } = props;
              modalPasswordOpenClose(true);
              modalOpenClose(false);
            }}
          >
            Change Password
          </button>
          <br />
          <p>OR</p>
          <br />
        </>
      ) : (
        ''
      )}

      <button type="submit" className="btn btn-primary" data-dismiss="modal" data-toggle="modal">
        Update
      </button>
    </>
  );
  return (
    <Formik
      initialValues={{
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        file: (userData.profilePic && userData.profilePic.url) || '',
        gender: userData.gender || '',
        dob:
          new Date(userData.dob) || new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const data = { ...values };
        // data.phone = String(values.phone);

        if (typeof data.profilePic === 'string') {
          delete data.profilePic;
        }
        // updating profile picture is user had uploaded
        // only if a new one.
        if (values.profilePic) {
          const formData = new FormData();
          formData.append('file', props.images.profile);
          dispatch(
            updateProfilePicSaga({
              data: formData,
            }),
          );
        }

        if (
          userData.firstName !== data.firstName ||
          userData.lastName !== data.lastName ||
          userData.gender !== data.gender ||
          new Date(userData.dob).getTime() !== data.dob.getTime() ||
          values.profilePic
        ) {
          dispatch(editUserDetailSaga({ data, closeModel }));
        } else {
          closeModel();
        }

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
        <>
          <input
            className="hide"
            ref={props.fileUploadRef}
            type="file"
            accept="image/*"
            onChange={e => {
              setFieldValue('profilePic', e.target.files[0]);

              props.setTempImage({ ...props.tempImages, image: e.target.files[0] });
              e.target.value = '';
              props.setOpenCollectionCropModal(true);
              // eslint-disable-next-line no-unused-expressions
              props.setImageHandler &&
                props.setImageHandler({
                  type: props.imageData && props.imageData.type,
                  image: props.cropImage,
                });
            }}
          />
          <form onSubmit={handleSubmit} noValidate>
            <Model
              closeModel={closeModel}
              headerTitle="Edit Profile"
              modalId="editProfile"
              FooterComponent={FooterComponent}
              //   submitBtnText="Cancel"
            >
              <div className="modal-body pt-0">
                <div className="position-relative max-100">
                  <img
                    className="img-fluid rounded-circle profile-img"
                    src={
                      (props.images && props.images.profile
                        ? URL.createObjectURL(props.images.profile)
                        : userData._id && userData.profilePic && userData.profilePic.url) ||
                      PROFILE_SVG
                    }
                    alt=""
                  />
                  {userData.isVIPMemeber && <img src={VIP_ICON_PNG} className="vip-icon" alt="" />}
                  <span
                    className="avtar-change"
                    type="button"
                    name="profilePic"
                    onClick={() => {
                      props.setTempImage({ ...props.tempImages, type: '' });
                      props.fileUploadRef.current.click();
                    }}
                    style={{ lineHeight: '24px' }}
                  />
                </div>

                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control my-4"
                    placeholder="Enter first name"
                    name="firstName"
                    value={values.firstName && values.firstName.trim()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="error-message">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </div>
                </div>
                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control my-4"
                    placeholder="Enter last name"
                    name="lastName"
                    value={values.lastName && values.lastName.trim()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="error-message">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </div>
                </div>
                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control my-4"
                    name="email"
                    value={userData.email}
                    disabled
                  />
                </div>
                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control my-4"
                    name="phone"
                    value={`${userData.countryCode} ${userData.phone}`}
                    disabled
                  />
                </div>
                <div className="form-group mb-0">
                  <input
                    type="text"
                    className="form-control my-4"
                    name="userName"
                    value={userData.userName}
                    disabled
                  />
                </div>
                <div className="row">
                  <div className="form-group col">
                    <select
                      className="form-control"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="error-message">
                      {errors.gender && touched.gender && errors.gender}
                    </div>
                  </div>
                  <div className="form-group col">
                    <div className="dateinput">
                      <DatePicker
                        className="form-control datetimepicker2"
                        selected={values.dob}
                        name="dob"
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 10))}
                        onChange={date => setFieldValue('dob', date)}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                      />
                      <div className="error-message">
                        {errors.phone && touched.phone && errors.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Model>
          </form>
        </>
      )}
    </Formik>
  );
};

export default EditProfileModal;
