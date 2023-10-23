import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from 'react-easy-infinite-scroll/dist/Spinner/Spinner';
import AddAddressModal from '../Address/AddAddressModal';
import DeliveryAdd from '../DeliveryAdd/DeliveryAdd';
import { NoDataFound, HeaderTitle } from '../../../components';
import {
  getAddressSaga,
  getCoinDetailsSaga,
  resetCoinDetails,
  buyCollectionSaga,
} from '../../../store/actions';

const DeliveryAddress = () => {
  const [disable, setDisable] = useState(true);
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [isPaymentSelectError, setIsPaymentSelectError] = useState(false);
  const [addressId, setAddressId] = useState('');
  const { address } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);
  const { id } = useParams();
  const { collectionDetails } = useSelector(state => state.collection);

  const ConvenienceFee = (collectionDetails?.price || 300) * 0.01;

  const buyCollection = () => {
    dispatch(
      buyCollectionSaga({
        coinId: id,
        userId: userData && userData._id,
        addressId,
      }),
    );
  };
  const selectPayment = data => {
    setPaymentMethod(data);
    setIsPaymentSelectError(false);
  };
  const checkTerms = () => {
    if (paymentMethod === null) {
      setIsPaymentSelectError(true);
    }
    setDisable(!disable);
  };

  useEffect(() => {
    dispatch(getAddressSaga());
    dispatch(getCoinDetailsSaga(id));
    return () => dispatch(resetCoinDetails());
  }, [id]);

  useEffect(() => {
    if (address && address.length) {
      setAddressId(address.filter(item => item.isPrimary)[0]._id);
    }
  }, [address]);

  useEffect(() => {
    if (!openAddAddressModal) {
      setEditRecord(null);
    }
  }, [openAddAddressModal]);

  if (!collectionDetails) return <Spinner />;
  if (collectionDetails.isSold) return <NoDataFound data="Coin Has been Sold" />;
  if (collectionDetails.userId === userData._id)
    return <NoDataFound data="You can't buy your own coin" />;
  if (collectionDetails.isSold) return <NoDataFound data="No Delivery Address Found" />;
  if (collectionDetails.marketPlaceState === 'UNLISTED')
    return <NoDataFound data="Cannot buy this coin" />;
  if (collectionDetails.marketPlaceState === 'ON_AUCTION')
    return <NoDataFound data="Cannot Buy Auctioned Coin" />;

  return collectionDetails.marketPlaceState !== 'ON_SALE' ||
    collectionDetails.transactionStatus === 'approved' ||
    collectionDetails.transactionStatus === 'pending' ? (
    <NoDataFound data="This coin is not for sale" />
  ) : (
    <>
      <HeaderTitle title="Delivery Details" />
      <section className="dilivery mt-5" id="product">
        <div className="container order-track">
          <div className="">
            <div className="row align-items-start no-gutters flex-md-wrap">
              <div
                className="col-md-12 col-lg-12
                d-flex flex-md-wrap flex-sm-wrap flex-wrap  order-right-panel"
              >
                <DeliveryAdd
                  setEditRecord={setEditRecord}
                  setOpenAddAddressModal={setOpenAddAddressModal}
                />
                {/* <div className="d-flex flex-column w-100  ">
                  <div className="">
                    <p className="font-weight-bold blue-color f-18 ">Address 1</p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex  flex-fill align-items-center  flex-row">
                      <i className="fas fa-map-marker-alt text-primary mr-3" />
                      <p>4775 Elsie Drive West Lebanon, USA 03784 </p>
                    </div>
                    <div className="text-lg-right">
                      <img className="img-fluid checked-icon" src={CheckImg} alt="" />
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <hr />
                </div>
                <div className="d-flex flex-column w-100  pb-4 border-bottom-4">
                  <div className="">
                    <p className="font-weight-bold blue-color f-18 ">Address 2</p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex  flex-fill align-items-center  flex-row">
                      <i className="fas fa-map-marker-alt text-primary mr-3" />
                      <p>2875 Hart Street Hartford, CT 06103 </p>
                    </div>
                    <div className="text-lg-right">
                      <img className="img-fluid checked-icon" src={CheckImg} alt="" />
                    </div>
                  </div>
                </div> */}

                {/* <DeliveryPartner />
                <div className="w-100">
                  <hr />
                </div> */}

                <div className="d-flex justify-content-between w-100 flex-fill align-items-center ">
                  <div className=" w-75  ">
                    <div className="home-title">
                      Convenience Charge
                      <br />
                    </div>
                    <p>1% of coin value</p>
                    <p>Note: Delivery charges are included in the price displayed</p>
                  </div>
                  <h4 className="font-weight-bold blue-color">${ConvenienceFee}</h4>
                </div>
                <div className="w-100">
                  <hr />
                </div>

                <div
                  className="d-flex justify-content-between w-100 flex-fill align-items-center pr-3"
                  id="wallet"
                >
                  <div className="home-title w-75  pt-3 w-100mob">
                    Choose a Payment Mode
                    <br />
                    <br />
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="customRadioInline1"
                        name="customRadioInline1"
                        className="custom-control-input mr-5"
                        onClick={() => selectPayment('paypal')}
                      />
                      <label className="custom-control-label" htmlFor="customRadioInline1">
                        Paypal Wallet
                      </label>
                    </div>
                    <div className="error-message">
                      {isPaymentSelectError && 'Please select payment method'}
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <hr />
                </div>
                <div
                  className="d-flex flex-column text-right 
                my-3 w-100 blue-color border-bottom-4"
                >
                  <h5>Total Amount </h5>
                  <h3 className="font-weight-bold my-2">
                    ${(collectionDetails.price || '300') + ConvenienceFee}
                  </h3>
                  <br />
                </div>

                <div className="d-flex align-items-center flex-wrap-a w-100 my-4" id="wallet">
                  <div className="form-check w-100">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      onChange={checkTerms}
                    />
                    <label className="form-check-label text-primary" htmlFor="exampleCheck1">
                      I agree with{' '}
                      <Link to="/cms/terms-and-conditions">
                        <u>terms &amp; conditions</u>
                      </Link>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={
                      disable || isPaymentSelectError || !(address && address.length)
                        ? 'btn btn-primary mt-10 disabled-signup'
                        : 'btn btn-primary mt-10'
                    }
                    disabled={disable || isPaymentSelectError || !(address && address.length)}
                    onClick={() => {
                      buyCollection();
                    }}
                  >
                    Place an Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openAddAddressModal && (
          <AddAddressModal modalOpenClose={setOpenAddAddressModal} editRecord={editRecord} />
        )}
      </section>
    </>
  );
};

export default DeliveryAddress;
