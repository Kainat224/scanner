import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Model from '../../../components/UI/Model/Model';
import { TRACK_ID_REQUIRED, TRACK_WEBSITE_REQUIRED } from '../../../constants/errorConstants';
import { postTrackingDetailSaga } from '../../../store/actions';

const PostTrackingDetailModal = props => {
  const dispatch = useDispatch();

  const { orderDetail } = useSelector(state => state.order);
  const { trackId, website, name } = orderDetail.trackMeta;
  const validationSchema = Yup.object({
    trackId: Yup.string().required(TRACK_ID_REQUIRED),
    website: Yup.string().required(TRACK_WEBSITE_REQUIRED),
    name: Yup.string(),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </>
  );

  return (
    <Formik
      initialValues={{
        trackId: trackId || '',
        website: website || '',
        name: name || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(postTrackingDetailSaga({ data: values, orderId: orderDetail._id }));
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
            // headerTitle={`${editRecord ? 'Edit' : 'Add'} Address`}
            closeModel={closeModel}
            FooterComponent={FooterComponent}
          >
            <div className="modal-body pt-0">
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Courier partner's name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">{errors.name && touched.name && errors.name}</div>
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tracking id"
                  name="trackId"
                  value={values.trackId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">
                  {errors.trackId && touched.trackId && errors.trackId}
                </div>
              </div>
              <div className="form-group mb-2">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Tracking website URL"
                  name="website"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="error-message">
                  {errors.website && touched.website && errors.website}
                </div>
              </div>
            </div>
          </Model>
        </form>
      )}
    </Formik>
  );
};

export default PostTrackingDetailModal;
