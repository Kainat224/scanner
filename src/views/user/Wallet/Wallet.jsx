import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import WalletImg from '../../../assets/images/wallet.svg';
import ProfilePicImg from '../../../assets/images/profilepic.jpg';
import {
  buyCreditSaga,
  buyVIPMembershipSaga,
  paymentHistorySaga,
  validatePaymentSaga,
} from '../../../store/actions';
import { Spinner } from '../../../components';

import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import axiosMain from '../../../http/axios/axios_main';
import PaymentValidate from './PaymentValidate';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
import PaymentHistory from './PaymentHistory';
// import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const Wallet = () => {
  const [selectedCredit, setSelectedCredit] = useState(250);
  const [isAgreed, setIsAgreed] = useState(true);
  // const [handleModal, setHandleModal] = useState(false);
  const history = useHistory();
  const { open } = useSelector(state => state.modal);
  const {
    userData: { _id: userId, isVIPMemeber: isVIPMember, creditCount },
    isLoading,
  } = useSelector(state => state.auth);
  const { paymentHistory } = useSelector(state => state.payment);

  const [paymentModel, setPaymentModel] = useState({ isOpen: false, msg: '' });

  const dispatch = useDispatch();

  const urlSearchParams = new URLSearchParams(window.location.search);

  const { transactionId } = Object.fromEntries(urlSearchParams.entries());
  useEffect(() => {
    if (transactionId) {
      dispatch(validatePaymentSaga({ setPaymentModel, transactionId }));
    }
  }, [transactionId]);

  useEffect(() => {
    if (userId) {
      dispatch(paymentHistorySaga({ userId }));
    }
  }, [userId, dispatch]);

  if (isLoading) return <Spinner />;
  return (
    <div className="container" id="walleta" style={{ marginTop: -7 }}>
      <div className="row align-items-start">
        <div className="col-md-6 col-lg-6 col-sm-12 text-white p-0">
          <div className="bg-dark-blue pl-4 pt-4">
            <div className="pl-4">
              <h3 className="font-weight-bold">My Wallet</h3>
              <p className=" w-75  pt-3 pb-4">Ded do eiusmod te mpor incidid.</p>
            </div>
            <div className="d-flex w-100 pl-4">
              <div className="white-circle mr-3">
                <img className="img-fluid" src={WalletImg} alt="wallet" />
              </div>
              <div className="mb-2">
                <h2 className="font-weight-bold">{creditCount || 0}</h2>
                <p className="">Credits Available </p>
              </div>
            </div>
            <br />
            <br />
            <nav className="pl-4">
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  className="nav-item nav-link active "
                  id="nav-home-tab"
                  data-toggle="tab"
                  href="#nav-Recharge"
                >
                  Recharge
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-profile-tab"
                  data-toggle="tab"
                  href="#nav-History"
                >
                  History
                </a>
              </div>
            </nav>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active pl-4" id="nav-Recharge">
              <p className="txt-blue o-5 font-14 w-75 py-3 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel eros ,
                consectetur magna et, eleifend ex. Nulla facilisi.
              </p>
              <div className="d-flex justify-content-between pr-4">
                <p className="txt-blue">Select your Requirement </p>
                <div className="d-flex txt-blue align-items-center">
                  <h3 className="mr-2 font-weight-bold txt-blue range-slider__value">
                    {selectedCredit}
                  </h3>
                  <p>Credits</p>
                </div>
              </div>

              <div className="range-slider txt-blue">
                <Slider
                  dots
                  startPoint={0}
                  step={50}
                  min={0}
                  max={500}
                  value={selectedCredit}
                  onChange={value => {
                    setSelectedCredit(value);
                  }}
                />
                <div className="d-flex justify-content-between pr-4">
                  <p>0</p>
                  <p>100</p>
                  <p>200</p>
                  <p>300</p>
                  <p>400</p>
                  <p>500</p>
                </div>
              </div>
              <br />
              <br />
              <p className="txt-blue mb-3">Payment Getway</p>
              <div className="gatway-status d-flex flex-wrap mr-4 ">
                <div className="box-card mr-3 mb-3 ">
                  <div className="box-card-title d-flex justify-content-between align-items-center">
                    <span>
                      <i className="fab fa-paypal" style={{ color: '#003087' }} /> Paypal
                    </span>
                    <i className="fas fa-check-circle" />
                  </div>
                  <p className="txt-blue f-12 my-1">Totam rem aperiam eaque</p>
                  <h4 className="font-weight-bold">${selectedCredit}</h4>
                </div>
                <div className="box-card mr-3 mb-3 ">
                  <div className="box-card-title d-flex justify-content-between align-items-center">
                    <span>Crypto Wallet</span>
                    <i className="fas fa-check-circle disabled" />
                  </div>
                  <p className="txt-blue f-12 my-1">Totam rem aperiam eaque </p>
                  {/* <h4 className="font-weight-bold">${selectedCredit}</h4> */}
                </div>
                <div className="box-card  mb-3 ">
                  <div className="box-card-title d-flex justify-content-between align-items-center">
                    <span>Other Wallet</span>
                    <i className="fas fa-check-circle disabled" />
                  </div>
                  <p className="txt-blue f-12 my-1">Totam rem aperiam eaque </p>
                  {/* <h4 className="font-weight-bold">${selectedCredit}</h4> */}
                </div>
              </div>
              <div className="d-flex flex-wrap-a-mob align-items-center w-100 my-4 ">
                <div className="form-check w-100">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={isAgreed}
                    onChange={() => {
                      setIsAgreed(!isAgreed);
                    }}
                  />
                  <label className="form-check-label ml-2 text-primary" htmlFor="exampleCheck1">
                    <Link to="/cms/terms-and-conditions">I agree with terms and conditions</Link>
                  </label>
                </div>
                <button
                  type="button"
                  className={
                    isAgreed
                      ? 'btn btn-primary widthnew mr-4 '
                      : 'btn  widthnew mr-4 disabled-signup'
                  }
                  onClick={() => {
                    dispatch(buyCreditSaga({ userId, creditCount: selectedCredit }));
                  }}
                >
                  Recharge
                </button>
              </div>
            </div>

            <div className="tab-pane fade" id="nav-History">
              {paymentHistory &&
                paymentHistory.length &&
                paymentHistory.map(item => <PaymentHistory item={item} key={item._id} />)}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 border-left right-part flex-wrap ">
          {!isVIPMember ? (
            <div className="history bg-light-blue p-4 br-10 m-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="font-weight-bold blue-color">Become a VIP</h4>
                <button
                  type="button"
                  className="btn btn-primary btn-small w-auto"
                  onClick={() => {
                    dispatch(buyVIPMembershipSaga({ userId }));
                  }}
                >
                  Upgrade
                </button>
              </div>
              <div className="d-flex justify-content-between flex-wrap">
                <p className="txt-blue w-75">Lorem ipsum dolor sit amet.</p>
                <div className="d-flex txt-blue align-items-center  mt-3">
                  <h4 className="mr-2 font-weight-bold txt-blue">20</h4>
                  <p>Credits</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="history bg-light-blue p-4 br-10 m-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="font-weight-bold blue-color">You are a VIP member</h4>
              </div>
            </div>
          )}
          <div className="mt-4" id="mob-design">
            <div className="d-flex mx-4 blue-color align-items-center pb-3 border-bottom mb-3">
              <img
                className="mr-3 max-width-img-60 rounded-circle max-height-img-60 min-width-60"
                src={ProfilePicImg}
                alt=""
              />
              <div>
                <h4 className="font-weight-bold">Get 200 Credits Monthly</h4>
                <p className="o-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="d-flex mx-4 blue-color align-items-center pb-3 border-bottom mb-3">
              <img
                className="mr-3 max-width-img-60 rounded-circle max-height-img-60 min-width-60"
                src={ProfilePicImg}
                alt=""
              />
              <div>
                <h4 className="font-weight-bold">Become a Collectors</h4>
                <p className="o-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="d-flex mx-4 blue-color align-items-center pb-3 border-bottom mb-3">
              <img
                className="mr-3 max-width-img-60 rounded-circle max-height-img-60 min-width-60"
                src={ProfilePicImg}
                alt=""
              />
              <div>
                <h4 className="font-weight-bold">Get 200 Credits Monthly</h4>
                <p className="o-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="d-flex mx-4 blue-color align-items-center pb-3 border-bottom mb-3">
              <img
                className="mr-3 max-width-img-60 rounded-circle max-height-img-60 min-width-60"
                src={ProfilePicImg}
                alt=""
              />
              <div>
                <h4 className="font-weight-bold">Get 200 Credits Monthly</h4>
                <p className="o-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="d-flex mx-4 blue-color align-items-center pb-3 border-bottom mb-3">
              <img
                className="mr-3 max-width-img-60 rounded-circle max-height-img-60 min-width-60"
                src={ProfilePicImg}
                alt=""
              />
              <div>
                <h4 className="font-weight-bold">Get 200 Credits Monthly</h4>
                <p className="o-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="d-flex mx-4 blue-color align-items-center pb-3 border-bottom mb-3">
              <img
                className="mr-3 max-width-img-60 rounded-circle max-height-img-60 min-width-60"
                src={ProfilePicImg}
                alt=""
              />
              <div>
                <h4 className="font-weight-bold">Become a Collectors</h4>
                <p className="o-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && <AlertMessageModal />}
      {paymentModel.isOpen && (
        <PaymentValidate
          closeModel={() => {
            setPaymentModel({ isOpen: false, msg: '' });
            history.push('/wallet');
          }}
          msg={paymentModel.msg}
        />
      )}
    </div>
  );
};

export default SetTokenHeader(Wallet, axiosMain);
