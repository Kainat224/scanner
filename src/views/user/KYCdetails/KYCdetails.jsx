import { useSelector } from 'react-redux';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import failedImg from '../../../assets/images/inprocess.png';
import verifiedImg from '../../../assets/images/moresmile.png';
import smileImg from '../../../assets/images/smile.png';
import KycStatus from './KycStatus';

function kycDetails(isKyc) {
  if (isKyc === 'verified')
    return {
      status: 'KYC verified',
      emoji: verifiedImg,
      reApply: false,
    };
  if (isKyc === 'reject')
    return {
      status: 'KYC failed',
      emoji: failedImg,
      reApply: true,
    };
  if (isKyc === 'pending') {
    return {
      status: 'KYC is pending',
      emoji: smileImg,
      reApply: false,
    };
  }
  return {
    status: 'KYC not verified',
    emoji: smileImg,
    reApply: true,
  };
}
const KYCdetails = () => {
  const { userData } = useSelector(state => state.auth);

  return (
    <>
      <HeaderTitle title="KYC Detail" />
      <section className="main-wrapper top-60" id="kyc">
        <div className="container">
          {userData.kyc && <KycStatus kycDetail={kycDetails(userData.kyc.isKyc)} />}
        </div>
      </section>
    </>
  );
};
export default KYCdetails;
