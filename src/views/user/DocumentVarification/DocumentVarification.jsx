import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailSaga, uploadKycSaga } from '../../../store/actions';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const DocumentVarification = () => {
  const { userData, isUserLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(false);
  const { open } = useSelector(state => state.modal);
  // consist of document type and document itself

  const [kycIdProofDoc, setKycIdProofDoc] = useState({
    name: 'Passport',
    doc: userData.kycUploadIdProof ? userData.kycUploadIdProof.kycDocument : null,
  });
  const [kycAddressProofDoc, setKycAddressProofDoc] = useState({
    name: 'Driving Licence',
    doc: userData.KycUploadAddressProof ? userData.KycUploadAddressProof.kycDocument : null,
  });
  const [kycPhotoIdDoc, setKycPhotoIdDoc] = useState({
    name: 'Election Card',
    doc: userData.KycUploadWithSelfiePhoto ? userData.KycUploadWithSelfiePhoto.kycDocument : null,
  });

  const id = localStorage.getItem('userid');
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    dispatch(getUserDetailSaga({ data: { id, token }, isCurrentUser: true }));
  }, []);

  if (isUserLoading) return <Spinner />;
  return (
    <>
      <div className="row mid-box justify-content-center">
        <div className="col col-sm-12 col-lg-6 p-7">
          <h3 className="signinTitle text-center">Verification Detail</h3>
          <br />
          <form>
            <div className="form-group  top-custom-select">
              <label>Id Proof</label>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept="image/png, image/jpeg"
                onChange={e => {
                  if (e.target.files[0].type.includes('image')) {
                    setKycIdProofDoc({ ...kycIdProofDoc, doc: e.target.files[0] });
                    setErrorMsg(false);
                  }
                }}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {kycIdProofDoc.doc ? kycIdProofDoc.doc.name : 'Upload document'}
              </label>
            </div>
            <div className="form-group top-custom-select">
              <label>Address Proof</label>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile1"
                accept="image/png, image/jpeg"
                onChange={e => {
                  if (e.target.files[0].type.includes('image')) {
                    setKycAddressProofDoc({ ...kycAddressProofDoc, doc: e.target.files[0] });
                    setErrorMsg(false);
                  }
                }}
              />
              <label className="custom-file-label" htmlFor="customFile1">
                {kycAddressProofDoc.doc ? kycAddressProofDoc.doc.name : 'Upload document'}
              </label>
            </div>
            <div className="form-group  top-custom-select">
              <label htmlFor="">Selfie with Holding Document </label>
            </div>
            <div className="custom-file border-0">
              <input
                type="file"
                className="custom-file-input"
                id="customFile2"
                accept="image/png, image/jpeg"
                onChange={e => {
                  if (e.target.files[0].type.includes('image')) {
                    setKycPhotoIdDoc({ ...kycPhotoIdDoc, doc: e.target.files[0] });
                    setErrorMsg(false);
                  }
                }}
              />
              <label className="custom-file-label" htmlFor="customFile2">
                {kycPhotoIdDoc.doc ? kycPhotoIdDoc.doc.name : 'Upload document'}
              </label>
            </div>
            <br />
            {errorMsg && (
              <div className="error-message">
                Please select all the documents before applying for KYC
              </div>
            )}
            <br />
            <button
              type="button"
              className="btn btn-primary w-100"
              data-toggle="modal"
              data-target="#docVerified"
              onClick={() => {
                const formData = new FormData();
                if (kycIdProofDoc.doc && kycAddressProofDoc.doc && kycPhotoIdDoc.doc) {
                  formData.append('documentOneType', kycIdProofDoc.name);
                  formData.append('documentOne', kycIdProofDoc.doc);
                  formData.append('documentTwoType', kycAddressProofDoc.name);
                  formData.append('documentTwo', kycAddressProofDoc.doc);
                  formData.append('documentThreeType', kycPhotoIdDoc.name);
                  formData.append('documentThree', kycPhotoIdDoc.doc);
                  dispatch(uploadKycSaga({ data: formData }));
                } else {
                  setErrorMsg(true);
                }
              }}
            >
              Submit
            </button>
          </form>
          <br />
        </div>
      </div>
      {open && <AlertMessageModal />}
    </>
  );
};

export default SetTokenHeader(DocumentVarification, axios);
