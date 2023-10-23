import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Model from '../../../components/UI/Model/Model';
import { PHONE_REQUIRED, PHONE_VALID } from '../../../constants/errorConstants';
import { forgotPasswordSaga } from '../../../store/actions';
import check from '../../../assets/images/check.png';

const DocumentVarificationModal = props => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  // const { userData } = useSelector(state => state.auth);
  // const { kycUploadAddressProof, KycUploadIdProof, KycUploadWithSelfiePhoto } = userData;
  const validationSchema = Yup.object({
    phone: Yup.string().min(5, PHONE_VALID).max(10, PHONE_VALID).required(PHONE_REQUIRED),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  );

  const modalHandler = () => {
    closeModel();
    props.setOTPModalOpen(true);
  };

  return (
    <Formik
      initialValues={{
        phone: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(forgotPasswordSaga({ modalHandler, phone: String(values.phone) }));
        setSubmitting(false);
      }}
    >
      {({
        // values,
        // errors,
        // touched,
        // handleChange,
        // handleBlur,
        handleSubmit,
        // isSubmitting
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Model
            closeModel={closeModel}
            headerTitle="Verification Detail"
            modalId="verificationDetailModal"
            FooterComponent={FooterComponent}
            //   submitBtnText="Cancel"
          >
            <div
              className="modal-body pt-0"
              id="docver"
              style={{
                margin: '0 auto',
                width: '100%',
              }}
            >
              <br />
              <div className="form-group top-custom-select">
                <label htmlFor="" />
                <select className="form-control" id="">
                  <option selected>Select ID Proof</option>
                  <option>Driving</option>
                </select>
              </div>
              <img src={check} className="mt-4 mb-4" alt="Verfied" />

              <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" />
                <label className="custom-file-label" htmlFor="customFile">
                  Upload Docu
                </label>
              </div>
              <div className="form-group top-custom-select">
                <label htmlFor="" />
                <select className="form-control" id="">
                  <option>Select ID Proof</option>
                  <option>Driving</option>
                </select>
              </div>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile1" />
                <label className="custom-file-label" htmlFor="customFile1">
                  Upload Document
                </label>
              </div>
              <div className="form-group  top-custom-select">
                <label htmlFor="" />
                <select className="form-control" id="">
                  <option>Select ID Proof</option>
                  <option>Driving</option>
                </select>
              </div>
              <div className="custom-file border-0">
                <input type="file" className="custom-file-input" id="customFile2" />
                <label className="custom-file-label" htmlFor="customFile2">
                  Upload Document
                </label>
              </div>
            </div>
          </Model>
        </form>
      )}
    </Formik>
  );
};

export default DocumentVarificationModal;
