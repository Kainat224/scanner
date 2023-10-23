import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CountryChangeModal from './CountryChangeModal';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import CollectionCropModal from '../CollectionScan/CollectionCropModal';
import ConfirmLogoutModal from './ConfirmLogoutModal';
import { renderRating } from '../../../utils';
import { Spinner, AlertMessageModal, ProfileCard } from '../../../components';
import { getUserDetailSaga, showModal } from '../../../store/actions';

import {
  ABOUT_US_SVG,
  ADDRESS_SVG,
  AUCTION_SVG,
  CHECK_IMG,
  CONTACT_US_SVG,
  COUNTRY_SVG,
  GRADED_COIN_BANKNOTE_SVG,
  KYC_SVG,
  LOGOUT_SVG,
  MY_PORTFOLIO_SVG,
  ORDER_SVG,
  PRIVACY_SVG,
  PROFILE_SVG,
  T_C_SVG,
  VIP_ICON_PNG,
  VIP_SVG,
  WALLET_SVG,
} from '../../../assets/images';

const Profile = () => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [openChangeCountryModal, setOpenChangeCountryModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [openCollectionCropModal, setOpenCollectionCropModal] = useState(false);

  // const [openModalOnSubmit, setOpenModalOnSubmit] = useState(false);
  const [images, setImage] = useState({
    profile: null,
  });
  const [tempImages, setTempImage] = useState({
    image: null,
    type: '',
  });
  const [confirmLogout, setConfirmLogout] = useState(false);

  const fileUploadRef = useRef();
  const setImageHandler = payload => {
    setImage({ ...images, profile: payload.image });
  };

  // selectors
  const { userData } = useSelector(state => state.auth);
  const { open } = useSelector(state => state.modal);
  // dispatcher
  const dispatch = useDispatch();
  const id = localStorage.getItem('userid');
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    dispatch(getUserDetailSaga({ data: { id, token }, isCurrentUser: true }));
  }, []);

  const mathRound = rating => Math.round(rating * 2) / 2;

  if (!userData._id) return <Spinner />;
  return (
    <div className="container">
      <div className="row no-gutters myprofile">
        <div className="pl-4 col-md-3 col-sm-12 col-lg-4 pt-4 ">
          <div className="d-flex justify-content-between align-items-start ">
            <div className="pro-img-container flex-grow-1 profile-img-container">
              <img
                className="img-fluid rounded-circle profile-img"
                src={
                  (userData._id && userData.profilePic && userData.profilePic.url) || PROFILE_SVG
                }
                alt=""
              />
              {userData.isVIPMemeber && <img src={VIP_ICON_PNG} className="vip-icon" alt="" />}
            </div>
            <button
              className="btn  btn-primary w-auto min-width-auto mr-4"
              type="button"
              onClick={() => setEditProfileModalOpen(true)}
              style={{ width: 'inherit !important' }}
            >
              Edit
            </button>
          </div>
          <br />

          <div className="text-primary font-16">
            {/* <div className="stars">{renderRating(userData._id && userData.rating)}</div> */}
            <div className="stars">{renderRating(mathRound(userData.rating || 0))}</div>
            <span className="review-no">{mathRound(userData.rating || 0)} Ratings</span>
          </div>
          <br />

          <p className="text-blu o-5 my-2">
            {userData._id && `${userData.firstName} ${userData.lastName}`}
          </p>
          <hr />
          <p className="text-blu o-5 my-2">{userData._id && userData.email}</p>
          <hr />
          <p className="text-blu o-5 my-2">
            {userData._id && `${userData.countryCode} ${userData.phone}`}
          </p>
          <hr />
          <div className="kyc-container my-3">
            <span className="txt-blue">
              {userData.kyc && userData.kyc.isKyc === 'notVerified' && <b>KYC not verified</b>}
              {userData.kyc && userData.kyc.isKyc === 'pending' && <b>KYC is pending</b>}
              {userData.kyc && userData.kyc.isKyc === 'verified' && (
                <>
                  <img className="img-fluid mr-2" src={CHECK_IMG} alt="" />
                  <b>KYC verified</b>
                </>
              )}
              {userData.kyc && userData.kyc.isKyc === 'reject' && <b>KYC rejected</b>}
              {userData.kyc && userData.kyc.isKyc === 'suspend' && <b>KYC suspended</b>}
            </span>
          </div>
          <div className="row align-items-center bottom-detail">
            <div className="col-lg-12">
              <hr />
            </div>
            <div className="col d-flex py-3">
              <div className="mr-4 text-blu o-5">Buy</div>
              <div className="font-weight-bold txt-blue">{`${userData.coin_bought || 0}  Item${
                userData.coin_bought && userData.coin_bought > 1 ? 's' : ''
              }`}</div>
            </div>
            <div className="col d-flex py-3">
              <div className="mr-4 text-blu o-5">Sale</div>
              <div className="font-weight-bold txt-blue">
                {`${userData.coin_sold || 0}  Item${
                  userData.coin_sold && userData.coin_sold > 1 ? 's' : ''
                }`}
              </div>
            </div>
            <div className="col-lg-12">
              <hr />
            </div>
          </div>
        </div>
        <div
          id="big-screen"
          className="col-md-9 col-sm-12 col-lg-8 border-left right-part flex-wrap"
        >
          <div className="d-flex flex-wrap order-0">
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/wallet">
                <ProfileCard
                  src={WALLET_SVG}
                  type="My Wallet"
                  screen="big-screen"
                  expandDiv={
                    <>
                      <b className="font-20 txt-blue">{userData.creditCount || 0}</b>
                      &nbsp;&nbsp;&nbsp;
                      <h5 className="txt-blue o-5">Credits </h5>
                    </>
                  }
                />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left">
              <Link to="/kyc-detail">
                <ProfileCard src={KYC_SVG} type="KYC details" screen="big-screen" />
              </Link>
            </div>
          </div>
          <div className="d-flex flex-wrap order-1">
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/wallet">
                <ProfileCard src={VIP_SVG} type="Update Account with VIP" screen="big-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left ">
              <a
                data-toggle="modal"
                href="#changeCon"
                onClick={() => setOpenChangeCountryModal(true)}
              >
                <ProfileCard
                  src={COUNTRY_SVG}
                  type="Change Country"
                  screen="big-screen"
                  expandDiv={<b className="font-20 txt-blue">{userData.country}</b>}
                />
              </a>
            </div>
          </div>
          <div className="d-flex flex-wrap order-2">
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/graded-collection">
                <ProfileCard
                  src={GRADED_COIN_BANKNOTE_SVG}
                  type="Graded Coin/Bank note"
                  screen="big-screen"
                />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left changeCountry">
              <Link to="/contactus">
                <ProfileCard src={CONTACT_US_SVG} type="Contact Us" screen="big-screen" />
              </Link>
            </div>
          </div>
          <div className="d-flex flex-wrap order-3">
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/address">
                <ProfileCard src={ADDRESS_SVG} type="Shipping Address" screen="big-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left">
              <Link to="/cms/about-us">
                <ProfileCard src={ABOUT_US_SVG} type="About Us" screen="big-screen" />
              </Link>
            </div>
          </div>
          <div className="d-flex flex-wrap order-4">
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/orders/buy">
                <ProfileCard src={ORDER_SVG} type="Orders" screen="big-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left">
              <Link to="/cms/privacy-policy">
                <ProfileCard src={PRIVACY_SVG} type="Privacy" screen="big-screen" />
              </Link>
            </div>
          </div>
          <div className="d-flex flex-wrap order-5">
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="my-collection">
                <ProfileCard src={MY_PORTFOLIO_SVG} type="My Portfolio" screen="big-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left">
              <Link to="/cms/terms-and-conditions">
                <ProfileCard src={T_C_SVG} type="Terms and Conditions" screen="big-screen" />
              </Link>
            </div>
          </div>
          <div className="d-flex flex-wrap order-6 order-sm-7">
            <div className="col-sm-12 col-md-6 border-bottom py-1 order-0">
              <Link to="/auction/participated">
                <ProfileCard src={AUCTION_SVG} type="Auction" screen="big-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left order-1">
              <button
                type="button"
                className="p-0"
                style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
                onClick={() => {
                  // dispatch(
                  //   showModal({
                  //     open: true,
                  //     notifyType: 3,
                  //     message: 'Are you sure you want to logout?',
                  //   }),
                  // );
                  setConfirmLogout(true);
                }}
              >
                <ProfileCard src={LOGOUT_SVG} type="Logout" screen="big-screen" />
              </button>
            </div>
          </div>
        </div>

        <div
          id="small-screen"
          className="col-md-9 col-sm-12 col-lg-8 border-left  right-part flex-wrap"
        >
          <div className="d-flex flex-wrap order-0">
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <ProfileCard
                src={WALLET_SVG}
                type="My Wallet"
                screen="small-screen"
                text="Credits"
                val="$300"
              />
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/wallet">
                <ProfileCard src={VIP_SVG} type="Update Account with VIP" screen="small-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/graded-collection">
                <ProfileCard
                  src={GRADED_COIN_BANKNOTE_SVG}
                  type="Graded Coin/Banknote"
                  screen="small-screen"
                />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/address">
                <ProfileCard src={ADDRESS_SVG} type="Shipping Address" screen="small-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/orders">
                <ProfileCard src={ORDER_SVG} type="Orders" screen="small-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/my-collection">
                <ProfileCard src={MY_PORTFOLIO_SVG} type="My Portfolio" screen="small-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1 order-0">
              <Link to="/auction">
                <ProfileCard src={AUCTION_SVG} type="Auction" screen="small-screen" />
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 border-bottom py-1">
              <Link to="/kyc-detail">
                <ProfileCard src={KYC_SVG} type="KYC details" screen="small-screen" />
              </Link>
            </div>

            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left ">
              <a data-toggle="modal" href="#changeCon">
                <ProfileCard
                  src={COUNTRY_SVG}
                  type="Change Country"
                  screen="small-screen"
                  expandDiv={<b className="font-20 txt-blue">{userData.country}</b>}
                />
              </a>
            </div>

            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left changeCountry">
              <Link to="/contactus">
                <ProfileCard src={CONTACT_US_SVG} type="Contact Us" screen="small-screen" />
              </Link>
            </div>

            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left">
              <Link to="/cms/about-us">
                <ProfileCard src={ABOUT_US_SVG} type="About Us" screen="small-screen" />
              </Link>
            </div>

            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left">
              <Link to="/cms/privacy-policy">
                <ProfileCard src={PRIVACY_SVG} type="Privacy" screen="small-screen" />
              </Link>
            </div>

            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left">
              <Link to="/cms/terms-and-conditions">
                <ProfileCard src={T_C_SVG} type="Terms and Conditions" screen="small-screen" />
              </Link>
            </div>

            <div className="col-sm-12 col-md-6 border-bottom py-1 border-left order-1">
              <button
                type="button"
                className="p-0"
                style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
                onClick={() => {
                  dispatch(
                    showModal({
                      open: true,
                      notifyType: 3,
                      message: 'Are you sure you want to logout?',
                    }),
                  );
                  // dispatch(logout());
                  setConfirmLogout(true);
                }}
              >
                <ProfileCard src={LOGOUT_SVG} type="Logout" screen="small-screen" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {editProfileModalOpen && (
        <EditProfileModal
          modalOpenClose={setEditProfileModalOpen}
          modalPasswordOpenClose={setChangePasswordModal}
          // update profile pic
          tempImages={tempImages}
          setTempImage={setTempImage}
          fileUploadRef={fileUploadRef}
          setOpenCollectionCropModal={setOpenCollectionCropModal}
          images={images}
        />
      )}
      {openChangeCountryModal && <CountryChangeModal modalOpenClose={setOpenChangeCountryModal} />}

      {changePasswordModal && <ChangePasswordModal modalOpenClose={setChangePasswordModal} />}
      {open && <AlertMessageModal />}
      {openCollectionCropModal && (
        <CollectionCropModal
          modalOpenClose={setOpenCollectionCropModal}
          imageData={tempImages}
          setImageHandler={setImageHandler}
        />
      )}
      {confirmLogout && <ConfirmLogoutModal modalOpenClose={setConfirmLogout} />}
    </div>
  );
};

export default Profile;
