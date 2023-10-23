/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { awardAuctionSaga, getBidSaga } from '../../../store/actions';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import CollectionCardBuyer from '../CollectionCard/CollectionCardBuyer/CollectionCardBuyer';
import { PROFILE_SVG } from '../../../assets/images';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import { NoDataFound, Spinner } from '../../../components';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const BidDetails = () => {
  const { id: actionId } = useParams();
  const { bidListing } = useSelector(state => state.collection);
  const { open } = useSelector(state => state.modal);

  const [currentBidder, setCurrentBidder] = useState('0');
  const [ratingArray, setRatingArray] = useState([]);
  const dispatch = useDispatch();

  const renderStar = rating => {
    // eslint-disable-next-line no-plusplus
    for (let i = rating; i >= 0.1; i--) {
      if (i < 1 && i >= 0) {
        setRatingArray(currentRatingArray => [
          ...currentRatingArray,
          <i className="fas fa-star-half-alt" key={i} />,
        ]);
      } else {
        setRatingArray(currentRatingArray => [
          ...currentRatingArray,
          <i className="fas fa-star checked" key={i} />,
        ]);
      }
    }
    let i = Math.floor(5 - rating);
    while (i > 0) {
      setRatingArray(currentRatingArray => [...currentRatingArray, <i className="far fa-star" />]);
      // eslint-disable-next-line no-plusplus
      i--;
    }
  };
  useEffect(() => {
    if (bidListing && bidListing.list && bidListing.list.length !== 0) {
      renderStar(bidListing.list[currentBidder].rating);
      // renderStar(4.2);
    }
    return () => setRatingArray([]);
  }, [currentBidder, bidListing]);

  useEffect(() => {
    dispatch(getBidSaga({ actionId }));
  }, [actionId, dispatch]);

  const mathRound = rating => Math.round(rating * 2) / 2;

  return (
    <>
      <HeaderTitle title="Award Auction" />

      {bidListing === null ? (
        <Spinner />
      ) : bidListing && bidListing.list && bidListing.list.length !== 0 ? (
        <section className="dilivery mt-4" id="product">
          <div className="container order-track">
            <div className="row no-gutters">
              <div className="col-sm-12 col-md-6 border-bottom py-3">
                <div className="home-title">Buyer Bids</div>

                {bidListing.list.map((item, index) => (
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setCurrentBidder(index)}
                  >
                    <CollectionCardBuyer
                      item={{ ...item, index }}
                      key={item._id}
                      setCurrentBidder={setCurrentBidder}
                    />
                  </button>
                ))}
              </div>
              <div className="col-sm-12 col-md-6 border-left py-3">
                <div className="home-title pl-4">Buyer Bids</div>
                {bidListing && bidListing.list && bidListing.list.length !== 0 ? (
                  <div className="d-flex justify-content-between flex-wrap py-3 pl-4">
                    <div className="d-flex align-items-center my-2 ">
                      <div className="position-relative d-flex flex-column">
                        <img
                          className="thumbnail mr-3 "
                          src={
                            bidListing.list[currentBidder].profilePic &&
                            bidListing.list[currentBidder].profilePic.url
                              ? bidListing.list[currentBidder].profilePic.url
                              : PROFILE_SVG
                          }
                          alt=""
                        />
                        <span className="active-circle" />
                      </div>
                      <div className="">
                        <h5 className="font-weight-bold txt-blue">
                          {`${bidListing.list[currentBidder].firstName} ${bidListing.list[currentBidder].lastName}`}
                        </h5>
                        <h6 className="txt-blue font-14 pt-2">
                          {`${bidListing.list[currentBidder].city}, ${bidListing.list[currentBidder].country}`}
                        </h6>
                      </div>
                    </div>
                    <div className=" d-flex flex-column justify-content-center my-2 mw-240">
                      <p className="text-lmob font-14 font-weight-bold blue-color text-right">
                        {mathRound(bidListing.list[currentBidder].rating || 0)} Ratings
                      </p>
                      {/* <p className="text-lmob font-14 font-weight-bold blue-color text-right">
                        {(bidListing.list[currentBidder].review &&
                          bidListing.list[currentBidder].review.length) ||
                          0}{' '}
                        Reviews
                      </p> */}
                      <div className="text-primary font-16" id="product">
                        {[ratingArray].map(item => item)}
                        {/* <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" /> */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                      <p>Verified</p>
                      <p>Bid Amount: ${bidListing.list[currentBidder].amount}</p>
                    </div>
                  </div>
                ) : (
                  <NoDataFound data="No Bid Found" />
                )}
                <br />
                <br />
                <div className="w-75 mx-auto width-mob">
                  <button
                    className="btn btn-primary w-100"
                    type="button"
                    onClick={() =>
                      dispatch(
                        awardAuctionSaga({
                          auctionId: actionId,
                          buyerId: bidListing.list[currentBidder]._id,
                        }),
                      )
                    }
                  >
                    Award auction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NoDataFound data="No Bidders Found" />
      )}
      {open && <AlertMessageModal />}
    </>
  );
};

export default withRouter(SetTokenHeader(BidDetails, axios));
