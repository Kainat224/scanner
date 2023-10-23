import { Link } from 'react-router-dom';

const KycStatus = props => {
  const { status, emoji, reApply } = props.kycDetail;
  return (
    <div className="home-row-wrapper">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-8 text-center">
          <img src={emoji} className="mt-4 mb-4" alt="" />
          <h6 className="  text-center title-2">{status}</h6>
          {reApply && (
            <Link to="/document-varification">
              <button type="button" className="btn-primary btn btn-sec mt-4">
                {status === 'KYC failed' ? 'Re-apply for KYC' : 'Apply for KYC'}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default KycStatus;
