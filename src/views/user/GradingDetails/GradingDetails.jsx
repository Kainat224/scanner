import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import PutIntoAuctionModal from '../MyCollection/PutIntoAuctionModal';
import { PutIntoAuctionModal, Spinner } from '../../../components';
import { COIN_IMG } from '../../../assets/images';
import { getCoinDetailsSaga, getGradeReportSaga } from '../../../store/actions';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const GradingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { open } = useSelector(state => state.modal);
  const [openPutIntoAuctionModal, setOpenPutIntoAuctionModal] = useState(false);
  const { graderResult, collectionDetails } = useSelector(state => state.collection);

  useEffect(() => {
    if (id) {
      dispatch(getCoinDetailsSaga(id));
    }
  }, [dispatch, id]);

  // if (isLoading) return <Spinner />;
  if (!graderResult) return <Spinner />;
  return (
    <section className="" id="product">
      <div className="container order-track">
        <div className="">
          <div className="row align-items-start no-gutters flex-md-wrap">
            {/* eslint-disable-next-line max-len */}
            <div className="col-md-12 col-lg-7 d-flex flex-md-wrap flex-sm-wrap flex-wrap no-gutters pt-4 pl-0 border-right-0">
              <div className="col-lg-8 col-sm-12 pr-4">
                <h6 className="home-title">
                  <br /> {collectionDetails.name || '-'}
                  <span> Graded</span>
                </h6>
                <h1
                  className={`${
                    collectionDetails.isAuctioned
                      ? collectionDetails._auction &&
                        collectionDetails._auction.amount.toString().length > 10
                        ? 'fa-2x'
                        : 'fa-4x'
                      : collectionDetails.price.toString().length > 10
                      ? 'fa-2x'
                      : 'fa-4x'
                  } font-weight-bold blue-color my-3`}
                >
                  {/* ${collectionDetails.price || '-'} */}
                  {collectionDetails.isAuctioned
                    ? collectionDetails._auction && `$${collectionDetails._auction.amount}`
                    : `$${collectionDetails.price}`}
                </h1>
                <p className="small-title">
                  Coin Age
                  <span className="blue-color font-weight-bold ml-4">
                    {collectionDetails.age || '-'} years old
                  </span>
                </p>
              </div>
              <div className="col-lg-4  col-sm-12 pt-2 pr-4">
                <br />
                {/* <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round" />
                </label> */}
                {!collectionDetails.isAuctioned && (
                  <button
                    type="button"
                    className="btn  btn-primary mt-2"
                    onClick={() => setOpenPutIntoAuctionModal(true)}
                  >
                    Put into Auction
                  </button>
                )}
              </div>
              <div className="col-lg-12">
                <hr />
              </div>
              <h6 className="home-title w-100">History</h6>
              <div className="col-lg-12">
                <p className="small-title">{collectionDetails.history || '-'}</p>
              </div>
              <Link to="#" className="blue-color">
                See More &nbsp;&nbsp;
                <i className="fas fa-chevron-down font-2x mt-2" />
              </Link>
              <div className="col-lg-12">
                <hr />
              </div>
              <h6 className="home-title w-100">Details</h6>
              <div className="col-lg-4 col-md-6 col-sm-12 ">
                <div className="row align-items-center">
                  <p className="col max-100  mb-2">Coin Age:</p>
                  <span className="col blue-color font-weight-bold">
                    {collectionDetails.age || '-'}
                  </span>
                </div>
                <div className="row align-items-center">
                  <p className="col max-100  mb-2">Ruler:</p>
                  <span className="col blue-color font-weight-bold">
                    {collectionDetails.ruler || '-'}
                  </span>
                </div>
                <div className="row align-items-center">
                  <p className="col max-100  mb-2">Material:</p>
                  <span className="col blue-color font-weight-bold">
                    {collectionDetails.materail || '-'}
                  </span>
                </div>
                {collectionDetails.isGraded && (
                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Grading:</p>
                    <span className="col blue-color font-weight-bold">
                      {(collectionDetails.gradingMetadata &&
                        collectionDetails.gradingMetadata.value) ||
                        '-'}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="row align-items-center">
                  <p className="col max-100  mb-2">Value:</p>
                  <span className="col blue-color font-weight-bold">
                    {collectionDetails.value || '-'}
                  </span>
                </div>
                <div className="row align-items-center">
                  <p className="col max-100  mb-2">Weight:</p>
                  <span className="col blue-color font-weight-bold">
                    {collectionDetails.weight || '-'} gm
                  </span>
                </div>
                <div className="row align-items-center">
                  <p className="col max-100  mb-2">Diameter</p>
                  <span className="col blue-color font-weight-bold">
                    {collectionDetails.diameter || '-'} mm
                  </span>
                </div>
              </div>
              <div className="col-lg-12">
                <hr />
              </div>
            </div>
            {/* eslint-disable-next-line max-len */}
            <div className="col-md-12 col-lg-5 d-flex flex-md-wrap flex-sm-wrap flex-wrap border-left order-right-panel bor-t-r d-flex-center">
              <div className="img-a d-flex p-4">
                <div className="pos-trust">Trust Seal</div>
                <div className="text-center blue-color ">
                  <img
                    src={
                      (graderResult.mlMetadata.images &&
                        graderResult.mlMetadata.images.FRONT_SIDE_IMAGE &&
                        graderResult.mlMetadata.images.FRONT_SIDE_IMAGE.url) ||
                      COIN_IMG
                    }
                    className="img-fluid"
                    alt=""
                  />
                  <h5 className="font-weight-bold mt-2">Front View</h5>
                </div>
                <div className="text-center blue-color ">
                  <img
                    src={
                      (graderResult.mlMetadata.images &&
                        graderResult.mlMetadata.images.BACK_SIDE_IMAGE &&
                        graderResult.mlMetadata.images.BACK_SIDE_IMAGE.url) ||
                      COIN_IMG
                    }
                    className="img-fluid"
                    alt=""
                  />
                  <h5 className="font-weight-bold mt-2">Back View</h5>
                </div>
              </div>
              <div className="w-100">
                <hr />
              </div>
              {/* eslint-disable-next-line max-len */}

              <div
                className="px-4 d-flex w-75 flex-wrap 
                        flex-lg-nowrap flex-md-nowrap d-flex-center"
              >
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={() => dispatch(getGradeReportSaga({ coinId: id }))}
                >
                  Grading Report
                </button>
              </div>
              <p className="p-4 txt-blue o-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores illum facilis
                veniam nobis molestiae dicta, vel omnis dolore esse totam fuga natus quibusdam velit
                hic veritatis assumenda similique! Ma
              </p>
              <div className="border-bottom-4">
                <div className="d-flex px-4 align-items-center mb-3">
                  <img className="img-fluid card-coin max-width-img-60" src={COIN_IMG} alt="" />
                  <div className="mx-4 ">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur magna et,
                      eleifend ex. Nulla facilisi.
                    </p>
                  </div>
                </div>
                <div className="d-flex px-4 align-items-center mb-3">
                  <img className="img-fluid card-coin max-width-img-60" src={COIN_IMG} alt="" />
                  <div className="mx-4 ">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur magna et,
                      eleifend ex. Nulla facilisi.
                    </p>
                  </div>
                </div>
                <div className="d-flex px-4 align-items-center mb-3">
                  <img className="img-fluid card-coin max-width-img-60" src={COIN_IMG} alt="" />
                  <div className="mx-4 ">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur magna et,
                      eleifend ex. Nulla facilisi.
                    </p>
                  </div>
                </div>
                <div className="d-flex px-4 align-items-center mb-3">
                  <img className="img-fluid card-coin max-width-img-60" src={COIN_IMG} alt="" />
                  <div className="mx-4 ">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur magna et,
                      eleifend ex. Nulla facilisi.
                    </p>
                  </div>
                </div>
                <div className="d-flex px-4 align-items-center mb-3">
                  <img className="img-fluid card-coin max-width-img-60" src={COIN_IMG} alt="" />
                  <div className="mx-4 ">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur magna et,
                      eleifend ex. Nulla facilisi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPutIntoAuctionModal && (
        <PutIntoAuctionModal
          modalOpenClose={setOpenPutIntoAuctionModal}
          coinId={collectionDetails._id}
          screen="GRADING_DETAILS"
        />
      )}
      {open && <AlertMessageModal />}
    </section>
  );
};

export default GradingDetails;
