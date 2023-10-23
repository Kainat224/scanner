/* eslint-disable max-len */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
// import { NoDataFound, Spinner } from '../../../../components';
// import PostSellerReview from './PostSellerReview/PostSellerReview';
// import Trackinghistory from './Trackinghistory/Trackinghistory';
// import AlertMessageModal from '../../../../components/UI/Model/AlertMessageModal';
// import DeliveryAdd from '../../DeliveryAdd/DeliveryAdd';
// import DeliveryPartner from '../../DeliveryPartner/DeliveryPartner';
// import { getOrderDetailSaga } from '../../../../store/actions/order/order';
// import DeliveryAddressSelected from '../../DeliveryAdd/DeliveryAddressSelected';
// import PostTrackingDetail from '../../PostTrackingDetails/PostTrackingDetail';
// import PostTrackingDetailModal from '../../PostTrackingDetails/PostTrackingDetailModal';
// import { getGradeReportSaga } from '../../../../store/actions';
// import renderRating from '../../../../utils/renderRating/renderRating';
import NoDataFound from '../NoDataFound/NoDataFound';
import Spinner from '../Spinner/Spinner';
import DeliveryPartner from '../../../views/user/DeliveryPartner/DeliveryPartner';
import DeliveryAddressSelected from '../../../views/user/DeliveryAdd/DeliveryAddressSelected';
import { renderRating } from '../../../utils';
import { getGradeReportSaga } from '../../../store/actions';
import { CHECK_IMG, COIN_IMG } from '../../../assets/images';
import PostSellerReview from './PostSellerReview/PostSellerReview';

const DetailCard = props => {
  const {
    addressDetail,
    ButtonComponent,
    detailData,
    showRelatedCoinsList,
    // showTrackinghistory,
    showPostSellerReview,
    sellerDetail,
    buyerDetail,
    showDeliveryAddress,
    showDeliveryPartner,
    // postTrackingDetails,
    orderId,
  } = props;
  // const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  // const { isLoading } = useSelector(state => state.collection);
  // const { review, rating } = useSelector(state => state.order);
  // const [auctionModal, setAuctionModal] = useState(false);
  // const [openAndClose, setOpenAndClose] = useState(false);
  // const {
  //   open,
  //   // notifyType
  // } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getOrderDetailSaga(props.id));
  // }, [dispatch]);
  const mathRound = rating => Math.round(rating * 2) / 2;

  return (
    <div className="container order-track">
      <SimpleReactLightbox>
        <div className="">
          {/* {detailData === null || isLoading ? ( */}
          {detailData === null ? (
            <Spinner />
          ) : detailData._id ? (
            <div className="row align-items-start no-gutters flex-md-wrap">
              {/* eslint-disable-next-line max-len */}
              <div className="col-md-12 col-lg-7 d-flex flex-md-wrap flex-sm-wrap flex-wrap no-gutters pt-4 pl-4 pl-mob-0">
                <div className="col-lg-8 col-sm-12 pr-4">
                  <h6 className="home-title">
                    <br /> {detailData.name}
                    {detailData.isGraded && <span> Graded </span>}
                  </h6>
                  <p className="blue-color f-16">
                    {!detailData.isSold && detailData.marketPlaceState === 'UNLISTED'
                      ? detailData.isGraded
                        ? 'Price:'
                        : 'Price Range:'
                      : detailData.marketPlaceState === 'ON_AUCTION' && detailData.isAuctioned
                      ? 'Auctioned amount:'
                      : 'Price:'}
                  </p>
                  {/* <h1 className="fa-4x font-weight-bold blue-color price-wrap my-3"> */}
                  <h1
                    className={`${
                      !detailData.isSold && detailData.marketPlaceState === 'UNLISTED'
                        ? detailData.isGraded
                          ? detailData.price.toString().length > 9
                            ? 'fa-2x'
                            : 'fa-4x'
                          : detailData.priceRange && detailData.priceRange.length > 9
                          ? 'fa-2x'
                          : 'fa-4x'
                        : detailData.marketPlaceState === 'ON_AUCTION' && detailData.isAuctioned
                        ? detailData._auction && detailData._auction.amount.toString().length > 9
                          ? 'fa-2x'
                          : 'fa-4x'
                        : detailData.price.toString().length > 9
                        ? 'fa-2x'
                        : 'fa-4x'
                    } font-weight-bold blue-color price-wrap my-3`}
                  >
                    {/* {detailData.marketPlaceState === 'ON_AUCTION' && detailData.isAuctioned
                      ? detailData._auction && `$${detailData._auction.amount}`
                      : !detailData.isSold && detailData.marketPlaceState === 'UNLISTED'
                      ? detailData.priceRange
                      : `$${detailData.price}`} */}

                    {!detailData.isSold && detailData.marketPlaceState === 'UNLISTED'
                      ? detailData.isGraded
                        ? `$${detailData.price}`
                        : detailData.priceRange
                      : detailData.marketPlaceState === 'ON_AUCTION' && detailData.isAuctioned
                      ? detailData._auction && `$${detailData._auction.amount}`
                      : `$${detailData.price}`}
                  </h1>
                </div>
                <div className="col-lg-4  col-sm-12 pt-2 pr-4 pr-mob-4">
                  <br />
                  {ButtonComponent && <ButtonComponent />}
                </div>
                <div className="col-lg-9">
                  <div className="d-flex justify-content-between  mt-3 flex-wrap">
                    <div className="d-flex mb-4">
                      <div>
                        <img src={CHECK_IMG} width="20" height="" alt="" />
                      </div>
                      <div className="ml-3 font-16 grey-color">
                        Posted by{' '}
                        {sellerDetail ? (
                          <span className="blue-color">
                            {sellerDetail.firstName} {sellerDetail.lastName}
                          </span>
                        ) : (
                          <span className="blue-color">
                            {detailData.userData.firstName} {detailData.userData.lastName}
                          </span>
                        )}
                        <br />
                        <p className="font-14 font-normal">
                          3093 Badger Pond Lane Sharon, USA 16146
                        </p>
                      </div>
                    </div>
                    {/* <div className="rating">
                      <div className="stars">
                        <span className="fas fa-star checked" />
                        <span className="fas fa-star checked" />
                        <span className="fas fa-star checked" />
                        <i className="far fa-star" />
                        <i className="far fa-star" />
                      </div>
                      <span className="review-no">3 Rating</span>
                    </div> */}
                    {sellerDetail ? (
                      <div className="rating">
                        <div className="stars">
                          {renderRating(mathRound(sellerDetail.rating || 0))}
                        </div>
                        {/* <span className="review-no">{detailData.rating || 0} Rating</span> */}
                        {/* <span className="review-no">
                         {mathRound(detailData.userData.rating || 0)} Rating
                       </span> */}
                        <span className="review-no">
                          {mathRound(sellerDetail.rating || 0)} Ratings
                        </span>
                      </div>
                    ) : (
                      <div className="rating">
                        <div className="stars">
                          {renderRating(
                            mathRound((detailData.userData && detailData.userData.rating) || 0),
                          )}
                        </div>
                        {/* <span className="review-no">{detailData.rating || 0} Rating</span> */}
                        {/* <span className="review-no">
                        {mathRound(detailData.userData.rating || 0)} Rating
                      </span> */}
                        <span className="review-no">
                          {mathRound((detailData.userData && detailData.userData.rating) || 0)}{' '}
                          Ratings
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <hr />
                </div>
                <h6 className="home-title w-100">History</h6>
                <div className="col-lg-12">
                  <p
                    className="small-title"
                    style={showMore ? {} : { maxHeight: 66, overflow: 'hidden' }}
                  >
                    {detailData.history}
                  </p>
                </div>
                <button
                  type="button"
                  className="link-button blue-color p-0"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? (
                    <>
                      See less
                      <i className="fas fa-chevron-up font-2x mt-2 ml-2" />
                    </>
                  ) : (
                    <>
                      See more
                      <i className="fas fa-chevron-down font-2x mt-2 ml-2" />
                    </>
                  )}
                </button>
                <div className="col-lg-12">
                  <hr />
                </div>
                <h6 className="home-title w-100">Details</h6>
                <div className="col-lg-4 col-md-6 col-sm-12 ">
                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Coin Age:</p>
                    <span className="col blue-color font-weight-bold">{detailData.age || '-'}</span>
                  </div>
                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Ruler:</p>
                    <span className="col blue-color font-weight-bold">
                      {detailData.ruler || '-'}
                    </span>
                  </div>
                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Material:</p>
                    <span className="col blue-color font-weight-bold">
                      {detailData.material || '-'}
                    </span>
                  </div>
                  {detailData.isGraded && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Grading:</p>
                      <span className="col blue-color font-weight-bold">
                        {(detailData.gradingMetadata && detailData.gradingMetadata.value) || '-'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="row align-items-center">
                    <p className="col max-100  mb-2">Value:</p>
                    <span className="col blue-color font-weight-bold">5</span>
                  </div>
                  {detailData.isCoin && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Weight:</p>
                      <span className="col blue-color font-weight-bold">
                        {detailData.weight || '-'}
                      </span>
                    </div>
                  )}
                  {detailData.isCoin && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Diameter:</p>
                      <span className="col blue-color font-weight-bold">
                        {detailData.diameter || '-'}
                      </span>
                    </div>
                  )}
                  {!detailData.isCoin && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Length:</p>
                      <span className="col blue-color font-weight-bold">
                        {detailData.length || '-'}
                      </span>
                    </div>
                  )}
                  {!detailData.isCoin && (
                    <div className="row align-items-center">
                      <p className="col max-100  mb-2">Breadth:</p>
                      <span className="col blue-color font-weight-bold">
                        {detailData.breadth || '-'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-lg-12">
                  <hr />
                </div>
                {showRelatedCoinsList && (
                  <>
                    <h6 className="home-title w-100">
                      {detailData.isCoin ? 'Related Coins' : 'Related Notes'}
                    </h6>
                    <p className="small-title">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis quo
                      placeat nobis cum quos quas illo laborum sint ipsa quod fugit similique, fuga
                      laboriosam officiis accusamus exercitationem natus cumque quibusdam?
                      <br />
                      <br />
                    </p>
                    <div className="d-flex w-75 d-flex-center">
                      {detailData &&
                        detailData.relatedCoins &&
                        detailData.relatedCoins.length &&
                        detailData.relatedCoins.map(item => (
                          <Link
                            key={item._id}
                            to={`/collection-detail/${item._id}`}
                            className="col-lg-3 col-md-4 col-sm-6 text-center mb-4 "
                          >
                            <img
                              className="img-fluid"
                              src={item.pictures.front.url || COIN_IMG}
                              alt=""
                            />
                            <p className="blue-color font-weight-bold blue-color mt-3">
                              {item.name}
                            </p>
                          </Link>
                        ))}
                    </div>
                  </>
                )}
              </div>
              {/* eslint-disable-next-line max-len */}
              <div
                className="col-md-12 col-lg-5 d-flex flex-md-wrap flex-sm-wrap flex-wrap border-left order-right-panel bor-t-r d-flex-center"
                style={{ paddingLeft: '20px' }}
              >
                <SRLWrapper>
                  <div className="img-a d-flex p-4 ">
                    {detailData.isGraded && <div className="pos-trust">Trust Seal</div>}
                    <div className="text-center blue-color ">
                      <img
                        src={
                          (detailData.pictures &&
                            detailData.pictures.front &&
                            detailData.pictures.front.url) ||
                          COIN_IMG
                        }
                        className="img-fluid cursor-pointer"
                        alt=""
                      />
                      <h5 className="font-weight-bold mt-2">Front View</h5>
                    </div>
                    <div className="text-center blue-color ">
                      <img
                        src={
                          (detailData.pictures &&
                            detailData.pictures.front &&
                            detailData.pictures.back.url) ||
                          COIN_IMG
                        }
                        className="img-fluid cursor-pointer"
                        alt=""
                      />
                      <h5 className="font-weight-bold mt-2">Back View</h5>
                    </div>
                  </div>
                </SRLWrapper>
                <div className="w-100">
                  <hr />
                </div>
                {/* eslint-disable-next-line max-len */}
                {detailData.isGraded && (
                  <>
                    <div className="px-4 d-flex w-75 flex-wrap flex-lg-nowrap flex-md-nowrap d-flex-center">
                      <button
                        type="button"
                        className="btn btn-primary m-2"
                        onClick={() => dispatch(getGradeReportSaga({ coinId: detailData._id }))}
                      >
                        Grading Report
                      </button>
                    </div>
                    <p className="p-4 txt-blue o-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores illum facilis
                      veniam nobis molestiae dicta, vel omnis dolore esse totam fuga natus quibusdam
                      velit hic veritatis assumenda similique! Ma
                    </p>
                    <div className="border-bottom-4">
                      <div className="d-flex px-4 align-items-center mb-3">
                        <img
                          className="img-fluid card-coin max-width-img-60"
                          src={COIN_IMG}
                          alt=""
                        />
                        <div className="mx-4 ">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur
                            magna et, eleifend ex. Nulla facilisi.
                          </p>
                        </div>
                      </div>
                      <div className="d-flex px-4 align-items-center mb-3">
                        <img
                          className="img-fluid card-coin max-width-img-60"
                          src={COIN_IMG}
                          alt=""
                        />
                        <div className="mx-4 ">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur
                            magna et, eleifend ex. Nulla facilisi.
                          </p>
                        </div>
                      </div>
                      <div className="d-flex px-4 align-items-center mb-3">
                        <img
                          className="img-fluid card-coin max-width-img-60"
                          src={COIN_IMG}
                          alt=""
                        />
                        <div className="mx-4 ">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur
                            magna et, eleifend ex. Nulla facilisi.
                          </p>
                        </div>
                      </div>
                      <div className="d-flex px-4 align-items-center mb-3">
                        <img
                          className="img-fluid card-coin max-width-img-60"
                          src={COIN_IMG}
                          alt=""
                        />
                        <div className="mx-4 ">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur
                            magna et, eleifend ex. Nulla facilisi.
                          </p>
                        </div>
                      </div>
                      <div className="d-flex px-4 align-items-center mb-3">
                        <img
                          className="img-fluid card-coin max-width-img-60"
                          src={COIN_IMG}
                          alt=""
                        />
                        <div className="mx-4 ">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur
                            magna et, eleifend ex. Nulla facilisi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <>
                  {showDeliveryAddress && buyerDetail && buyerDetail.address && (
                    <DeliveryAddressSelected item={addressDetail || buyerDetail.address[0]} />
                  )}
                  {/* {postTrackingDetails && <PostTrackingDetail modalOpenClose={setOpenAndClose} />} */}
                  {showDeliveryPartner && <DeliveryPartner />}
                  {/* {showTrackinghistory && <Trackinghistory />} */}
                  {showPostSellerReview && (
                    <PostSellerReview sellerDetail={sellerDetail} orderId={orderId} />
                  )}
                  {/* {detailData.isSold && (
                    <div className="col-lg-12 pl-4 mt-2">
                      <button
                        type="button"
                        className="btn btn-primary w-100 mb-4"
                        // onClick={() => history.push(`/apply-grading`)}
                      >
                        Cancel order
                      </button>
                    </div>
                  )} */}
                </>
              </div>
            </div>
          ) : (
            <NoDataFound data="No Collection Found" />
          )}
        </div>
      </SimpleReactLightbox>
      {/* {openAndClose && <PostTrackingDetailModal modalOpenClose={setOpenAndClose} />} */}
    </div>
  );
};

export default DetailCard;
