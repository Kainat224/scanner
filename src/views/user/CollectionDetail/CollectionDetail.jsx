import { Link, withRouter, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWishlistSaga,
  deleteWishlistSaga,
  getCoinDetailsSaga,
  resetCollection,
} from '../../../store/actions';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
// import CollectionDetailCard from '../CollectionCard/CollectionDetailCard/CollectionDetailCard';
// import PutIntoAuctionModal from '../MyCollection/PutIntoAuctionModal';
// import ParticipateModal from '../../../components/UI/ParticipateModal/ParticipateModal';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
import { ParticipateModal, DetailCard, PutIntoAuctionModal } from '../../../components';

const CollectionDetail = props => {
  const { id } = props.match.params;
  const history = useHistory();
  const [participateObj, setParticipateObj] = useState(null);
  const [openParticipateModal, setOpenParticipateModal] = useState(false);
  const [openSellNowParticipateModal, setOpenSellNowParticipateModal] = useState(false);
  const [openPutIntoAuctionModal, setOpenPutIntoAuctionModal] = useState(false);
  const { open } = useSelector(state => state.modal);
  const { collectionDetails } = useSelector(state => state.collection);
  const { isLoading } = useSelector(state => state.collection);
  const {
    userData: { _id: userId },
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoinDetailsSaga(id));

    return () => dispatch(resetCollection());
  }, [dispatch, id]);

  const ButtonComponent = () =>
    collectionDetails.isCoinOfLoggedIn ? (
      <>
        {!collectionDetails.isSold && collectionDetails.marketPlaceState === 'UNLISTED' && (
          <button
            type="button"
            onClick={() => {
              setOpenSellNowParticipateModal(true);
              // setCoinId(item._id);
            }}
            className="btn btn-defualt"
          >
            Sell Now
          </button>
        )}
        {!collectionDetails.isSold && (
          <button
            type="button"
            className="btn btn-defualt mt-2"
            disabled={collectionDetails.isAuctioned}
            onClick={() => setOpenPutIntoAuctionModal(true)}
          >
            {collectionDetails.isAuctioned ? 'Already in Auction' : 'Put into Auction'}
          </button>
        )}
        {!collectionDetails.isSold && !collectionDetails.isGraded && (
          <Link
            type="button"
            className="btn btn-defualt mt-2"
            // to={`/apply-grading/${collectionDetails._id}`}
            to={
              collectionDetails.isCoin
                ? `/apply-grading/coin/${collectionDetails._id}`
                : `/apply-grading/bank-note/${collectionDetails._id}`
            }
          >
            Apply for grading
          </Link>
        )}
        {collectionDetails.isSold && (
          <button
            type="button"
            className="btn btn-defualt mt-2"
            disabled={collectionDetails.isSold}
          >
            {collectionDetails.isCoin ? 'Coin Sold' : 'Note Sold'}
          </button>
        )}
      </>
    ) : (
      <>
        {!collectionDetails.isSold ? (
          <button
            type="button"
            className="btn btn-defualt"
            disabled={
              collectionDetails.transactionStatus === 'approved' ||
              collectionDetails.transactionStatus === 'pending'
            }
            onClick={() => {
              if (collectionDetails.marketPlaceState === 'ON_AUCTION') {
                setParticipateObj({
                  coinId: collectionDetails._id,
                  auctionId: collectionDetails._auction._id,
                });
                setOpenParticipateModal(true);
              } else {
                history.push(`/delivery-details/${collectionDetails._id}`);
              }
            }}
          >
            {collectionDetails.marketPlaceState === 'ON_AUCTION'
              ? 'Participate'
              : collectionDetails.transactionStatus === 'approved' ||
                collectionDetails.transactionStatus === 'pending'
              ? 'Sold'
              : 'Buy Now'}
          </button>
        ) : (
          <button type="button" className="btn btn-defualt" disabled>
            Sold
          </button>
        )}
        {collectionDetails.inWishList ? (
          <button
            type="button"
            className="btn btn-defualt mt-2"
            disabled={!!isLoading}
            onClick={() =>
              dispatch(
                deleteWishlistSaga({
                  data: {
                    id: collectionDetails._id,
                    from: 'collectionDetail',
                  },
                }),
              )
            }
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-defualt mt-2"
            disabled={!!isLoading}
            onClick={() =>
              dispatch(
                addWishlistSaga({
                  userId,
                  coinId: collectionDetails._id,
                  from: 'collectionDetail',
                }),
              )
            }
          >
            Add to Wishlist
          </button>
        )}
        {/* <Link className="btn btn-defualt mt-2">Connect with Seller</Link> */}
      </>
    );

  return (
    <>
      {/* <CollectionDetailCard */}
      <DetailCard
        ButtonComponent={ButtonComponent}
        detailData={collectionDetails}
        showRelatedCoinsList
        // showTrackinghistory={collectionDetails && collectionDetails.isSold ? true : false}
        // showPostSellerReview={collectionDetails && collectionDetails.isSold ? true : false}
        orderId={id}
      />
      {openPutIntoAuctionModal && (
        <PutIntoAuctionModal
          modalOpenClose={setOpenPutIntoAuctionModal}
          coinId={collectionDetails._id}
          screen="COLLLECTION_DETAILS"
        />
      )}
      {openParticipateModal && (
        <ParticipateModal
          headerTitle="Bid Now"
          modalOpenClose={setOpenParticipateModal}
          participateObj={participateObj}
          bidAmount={(collectionDetails._auction && collectionDetails._auction.amount) || 0}
        />
      )}
      {openSellNowParticipateModal && (
        <ParticipateModal
          headerTitle={collectionDetails.isCoin ? 'Sell Coin' : 'Sell Note'}
          modalOpenClose={setOpenSellNowParticipateModal}
          screen="COLLLECTION_DETAILS"
          priceObjDetails={{
            coinId: collectionDetails._id,
            priceRange: collectionDetails.priceRange,
          }}
        />
      )}
      {open && <AlertMessageModal />}
    </>
  );
};
export default withRouter(SetTokenHeader(CollectionDetail, axios));
