/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { axios } from '../../../http';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import CoinImg from '../../../assets/images/coin.png';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import { NoDataFound, Spinner, ParticipateModal, PutIntoAuctionModal } from '../../../components';
// import PutIntoAuctionModal from '../MyCollection/PutIntoAuctionModal';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
// import { sellCoinSaga } from '../../../store/actions';
// import ParticipateModal from '../Dashboard/ParticipateModal';
import { NOTE_IMG } from '../../../assets/images';

const ScanResult = () => {
  const { isLoading } = useSelector(state => state.collection);
  const { open } = useSelector(state => state.modal);
  const routerHistory = useHistory();
  // const dispatch = useDispatch();
  const { id } = useParams();
  const [openPutIntoAuctionModal, setOpenPutIntoAuctionModal] = useState(false);
  const [openParticipateModal, setOpenParticipateModal] = useState(false);

  // const { scanResult = '' } = useSelector(state => state.collection);
  const { addCoinData = '' } = useSelector(state => state.collection);
  // const { mlMetadata } = scanResult || '';
  // const { mlResponse, images } = mlMetadata || '';
  const [isOnSale, setIsOnSale] = useState(false);
  const result =
    addCoinData && addCoinData.isCoin
      ? {
          name: (addCoinData && addCoinData.name) || '-',
          history: (addCoinData && addCoinData.history) || '-',
          price: (addCoinData && addCoinData.price) || '-',
          priceRange: (addCoinData && addCoinData.priceRange) || '-',
          // && mlResponse.Price.split('$').join('')
          diameter: (addCoinData && addCoinData.diameter) || '-',
          // && mlResponse.Diameter.split(' ')[0])
          weight: (addCoinData && addCoinData.weight) || '-',
          ruler: (addCoinData && addCoinData.ruler) || '-',
          age: (addCoinData && addCoinData.age) || '-',
          frontImg:
            addCoinData &&
            addCoinData.pictures &&
            addCoinData.pictures.front &&
            addCoinData.pictures.front.url,
          backImg:
            addCoinData &&
            addCoinData.pictures &&
            addCoinData.pictures.back &&
            addCoinData.pictures.back.url,
          // front_image: (mlMetadata && mlMetadata.)
        }
      : {
          name: (addCoinData && addCoinData.name) || '-',
          history: (addCoinData && addCoinData.history) || '-',
          price: (addCoinData && addCoinData.price) || '-',
          priceRange: (addCoinData && addCoinData.priceRange) || '-',
          // && mlResponse.Price.split('$').join('')
          length: (addCoinData && addCoinData.Length) || '-',
          breadth: (addCoinData && addCoinData.Breadth) || '-',

          ruler: (addCoinData && addCoinData.ruler) || '-',
          age: (addCoinData && addCoinData.age) || '-',
          frontImg:
            addCoinData &&
            addCoinData.pictures &&
            addCoinData.pictures.front &&
            addCoinData.pictures.front.url,
          backImg:
            addCoinData &&
            addCoinData.pictures &&
            addCoinData.pictures.back &&
            addCoinData.pictures.back.url,
          // front_image: (mlMetadata && mlMetadata.)
        };
  const handleContinue = () => {
    if (isOnSale) {
      // dispatch(sellCoinSaga({ coinID: id, history: routerHistory }));
      setOpenParticipateModal(true);
    } else {
      routerHistory.push('/my-collection');
    }
  };

  if (!addCoinData) return <NoDataFound data="No Scan Data Found" />;
  if (isLoading) return <Spinner />;

  return (
    <>
      <HeaderTitle title="Scan Result" />
      <section className="mt-5" id="product">
        <div className="container order-track">
          <div className="">
            <div className="row align-items-start no-gutters flex-md-wrap">
              {/* eslint-disable-next-line max-len */}
              <div className="col-md-12 col-lg-7 d-flex flex-md-wrap flex-sm-wrap flex-wrap no-gutters pt-4 pl-4 pl-mob-0">
                <div className="col-lg-9 col-sm-12 pr-4">
                  <h6 className="home-title">
                    <br /> {result.name}
                  </h6>
                  <p className="blue-color f-16">Price Range: </p>
                  <h1
                    className={`${
                      result.priceRange && result.priceRange.length > 11 ? 'fa-2x' : 'fa-4x'
                    } font-weight-bold blue-color price-wrap my-3`}
                  >
                    {result.priceRange}
                  </h1>
                  <p className="small-title">
                    {addCoinData.isCoin ? 'Coin Age:' : 'Note Age:'}
                    <span className="blue-color font-weight-bold ml-4">{result.age || '-'}</span>
                  </p>
                </div>

                <div className="col-lg-12">
                  <hr />
                </div>
                <h6 className="home-title w-100 pt-0">History</h6>
                <div className="col-lg-12">
                  <p className="small-title">{result.history}</p>
                </div>
                <Link to="#" className="blue-color">
                  See More &nbsp;&nbsp;
                  <i className="fas fa-chevron-down font-2x mt-2" />
                </Link>
                <div className="col-lg-12">
                  <hr />
                </div>
                <h6 className="home-title w-100 pt-0">Details</h6>
                <div className="col-lg-4 col-md-6 col-sm-12 ">
                  <div className="row align-items-center">
                    {addCoinData.isCoin ? (
                      <p className="col max-100  mb-2">Coin Age:</p>
                    ) : (
                      <p className="col max-100  mb-2">Note Age:</p>
                    )}
                    <span className="col blue-color font-weight-bold">{result.age || '-'}</span>
                  </div>

                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Ruler:</p>
                    <span className="col blue-color font-weight-bold">{result.ruler}</span>
                  </div>
                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Material:</p>
                    <span className="col blue-color font-weight-bold">
                      {result.material || '-'}
                    </span>
                  </div>
                  {result.isGraded && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Grading:</p>
                      <span className="col blue-color font-weight-bold">
                        {(result.gradingMetadata && result.gradingMetadata.value) || '-'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Value:</p>
                    <span className="col blue-color font-weight-bold">{result.value || '-'}</span>
                  </div>
                  {addCoinData.isCoin && result.weight && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Weight:</p>
                      <span className="col blue-color font-weight-bold">{result.weight}</span>
                    </div>
                  )}
                  {addCoinData.isCoin && result.diameter && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Diameter:</p>
                      <span className="col blue-color font-weight-bold">{result.diameter}</span>
                    </div>
                  )}
                  {!addCoinData.isCoin && result.length && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Length:</p>
                      <span className="col blue-color font-weight-bold">{result.length}</span>
                    </div>
                  )}
                  {!addCoinData.isCoin && result.breadth && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Breadth:</p>
                      <span className="col blue-color font-weight-bold">{result.breadth}</span>
                    </div>
                  )}
                </div>
                <div className="col-lg-12">
                  <hr />
                </div>
              </div>
              {/* eslint-disable-next-line max-len */}
              <div className="col-md-12 col-lg-5 d-flex flex-md-wrap flex-sm-wrap flex-wrap border-left order-right-panel bor-t-r">
                <div className="img-a d-flex p-4 d-flex-center  ">
                  <div className="text-center blue-color ">
                    <img
                      src={result.frontImg || (addCoinData.isCoin ? CoinImg : NOTE_IMG)}
                      className="img-fluid"
                      alt=""
                    />
                    <h5 className="font-weight-bold mt-2">Front View</h5>
                  </div>
                  <div className="text-center blue-color ">
                    <img
                      src={result.backImg || (addCoinData.isCoin ? CoinImg : NOTE_IMG)}
                      className="img-fluid"
                      alt=""
                    />
                    <h5 className="font-weight-bold mt-2">Back View</h5>
                  </div>
                </div>
                <div className="w-100">
                  <hr />
                </div>
                <div className="d-flex flex-wrap justify-content-between w-100 px-4">
                  <p className="blue-color f-16">Price Range: </p>
                </div>
                <div className="text-center w-80 mx-auto p-3 pt-0">
                  <h2
                    className={`${
                      result.priceRange && result.priceRange.length > 11 ? 'fa-2x' : 'fa-3x'
                    } font-weight-bold blue-color price-wrap my-3`}
                  >
                    {result.priceRange}
                  </h2>
                  <div className="d-flex justify-content-center align-items-center">
                    <div type="button" className="btn mr-2" onClick={() => setIsOnSale(!isOnSale)}>
                      Put into sale
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isOnSale}
                        onChange={() => setIsOnSale(!isOnSale)}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                  <Link
                    to={
                      addCoinData.isCoin
                        ? `/apply-grading/coin/${id}`
                        : `/apply-grading/bank-note/${id}`
                    }
                  >
                    <button type="button" className="btn btn-primary w-100 mb-2">
                      Apply for grading
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mb-2"
                    onClick={() => setOpenPutIntoAuctionModal(true)}
                  >
                    Put into Auction
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary w-100 mb-2"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {open && <AlertMessageModal />}
        {openPutIntoAuctionModal && (
          <PutIntoAuctionModal
            modalOpenClose={setOpenPutIntoAuctionModal}
            coinId={id}
            history={routerHistory}
          />
        )}
        {openParticipateModal && (
          <ParticipateModal
            headerTitle={addCoinData.isCoin ? 'Sell Coin' : 'Sell Note'}
            modalOpenClose={setOpenParticipateModal}
            screen="SCAN_RESULT"
            priceObjDetails={{
              price: result.price,
              priceRange: result.priceRange,
              coinId: id,
              history: routerHistory,
            }}
            // bidAmount={participateObj.amount}
          />
        )}
      </section>
    </>
  );
};

export default SetTokenHeader(ScanResult, axios);
