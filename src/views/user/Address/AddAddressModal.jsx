import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Model from '../../../components/UI/Model/Model';
import {
  NAME_REQUIRED,
  ADDRESS_REQUIRED,
  COUNTRY_REQUIRED,
  CITY_REQUIRED,
  POSTAL_CODE_REQUIRED,
} from '../../../constants/errorConstants';
import { addAddressSaga, editAddressSaga } from '../../../store/actions';

const AddAddressModal = props => {
  const { editRecord } = props;
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(NAME_REQUIRED),
    addressLine1: Yup.string().trim().required(ADDRESS_REQUIRED),
    addressLine2: Yup.string().trim(),
    addressLine3: Yup.string().trim(),
    country: Yup.string().trim().required(COUNTRY_REQUIRED),
    city: Yup.string().trim().required(CITY_REQUIRED),
    postalCode: Yup.number().required(POSTAL_CODE_REQUIRED),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button type="submit" className="btn btn-primary">
        {`${editRecord ? 'Edit' : 'Add'} Address`}
      </button>
    </>
  );

  return (
    <Formik
      initialValues={{
        name: (editRecord && editRecord.name) || '',
        addressLine1: (editRecord && editRecord.addressLine1) || '',
        addressLine2: (editRecord && editRecord.addressLine2) || '',
        addressLine3: (editRecord && editRecord.addressLine3) || '',
        country: (editRecord && editRecord.country) || '',
        city: (editRecord && editRecord.city) || '',
        postalCode: (editRecord && editRecord.postalCode) || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (editRecord) {
          dispatch(editAddressSaga({ data: { ...values, id: editRecord._id }, closeModel }));
        } else {
          dispatch(addAddressSaga({ data: values, closeModel }));
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
        handleSubmit,
        // isSubmitting
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Model
            headerTitle={`${editRecord ? 'Edit' : 'Add'} Address`}
            closeModel={closeModel}
            FooterComponent={FooterComponent}
          >
            <div className="modal-body pt-0">
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">{errors.name && touched.name && errors.name}</div>
              </div>
              <div className="form-group mb-2">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Address line 1"
                  name="addressLine1"
                  value={values.addressLine1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">
                  {errors.addressLine1 && touched.addressLine1 && errors.addressLine1}
                </div>
              </div>
              <div className="form-group mb-2">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Address line 2 (optional)"
                  name="addressLine2"
                  value={values.addressLine2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">
                  {errors.addressLine2 && touched.addressLine2 && errors.addressLine2}
                </div>
              </div>
              <div className="form-group mb-2">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Address line 3 (optional)"
                  name="addressLine3"
                  value={values.addressLine3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">
                  {errors.addressLine3 && touched.address && errors.address}
                </div>
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">
                  {errors.country && touched.country && errors.country}
                </div>
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">{errors.city && touched.city && errors.city}</div>
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={values.postalCode.replace(/\D/g, '')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={6}
                />
                <div className="error-message">
                  {errors.postalCode && touched.postalCode && errors.postalCode}
                </div>
              </div>
            </div>
          </Model>
        </form>
      )}
    </Formik>
  );
};

export default AddAddressModal;
