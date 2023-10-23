/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { giveReviewRatingSaga } from '../../../../store/actions';
import Spinner from '../../Spinner/Spinner';
// import { giveReviewRatingSaga } from '../../../../store/actions/order/order';

const PostSellerReview = props => {
  const { _id, sellerReview } = props.sellerDetail;
  const { orderId } = props;
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);
  const { isLoading } = useSelector(state => state.order);
  const reviewArray = sellerReview.filter(item => item._buyer === userData._id);
  const [reviewData, setReviewData] = useState({
    rating: reviewArray.length ? reviewArray[0].rate : 5,
    review: reviewArray.length ? reviewArray[0].review : '',
  });
  const [showError, setShowError] = useState(false);

  const onChange = event => {
    setShowError(false);
    setReviewData({ ...reviewData, review: event.target.value });
  };

  const [showPostSellerReview, setShowPostSellerReview] = useState(false);

  const userRating = rating => {
    const arr = [];
    let temp = rating;
    for (let i = 0; i < 5; i++) {
      if (temp) {
        arr.push(1);
        temp--;
      } else {
        arr.push(0);
      }
    }
    return arr.map((star, i) => {
      if (star)
        return (
          <i
            className="fas fa-star checked"
            onClick={() => {
              setReviewData({ ...reviewData, rating: i + 1 });
            }}
          />
        );
      return (
        <i
          className="far fa-star "
          color="white"
          onClick={() => {
            setReviewData({ ...reviewData, rating: i + 1 });
          }}
        />
      );
    });
  };

  useEffect(() => {
    userRating(reviewData.rate);
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      {showPostSellerReview && (
        <>
          <div className="home-title w-100 pl-4 pt-3 mt-3">Post seller review</div>
          <div className="w-100">
            <hr />
          </div>

          <div className="d-flex justify-content-between w-100 flex-fill align-items-center pr-3">
            <div className="home-title w-75 pl-4 pt-3 ">Response</div>
            <div>{userRating(reviewData.rating)}</div>
          </div>
          <div className="form-group col-lg-12 mt-3 pl-4">
            <textarea
              className="form-control"
              // id="exampleFormControlTextarea1"
              value={reviewData.review}
              id="text"
              onChange={onChange}
              rows="10"
              placeholder="Type message..."
            />
            {showError && <div className="error-message">Message cannot be empty</div>}
          </div>
          <div className="col-lg-12 pl-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                if (reviewData.review.length <= 0) {
                  setShowError(true);
                } else {
                  dispatch(giveReviewRatingSaga({ data: reviewData, id: orderId, userId: _id }));
                  setShowPostSellerReview(false);
                }
              }}
            >
              Submit
            </button>
          </div>
        </>
      )}
      <div className="col-lg-12 pl-4 mt-3">
        <button
          type="button"
          className={showPostSellerReview ? 'btn btn-defualt' : 'btn btn-primary'}
          onClick={() => setShowPostSellerReview(!showPostSellerReview)}
        >
          {showPostSellerReview ? 'Hide post seller review' : 'Post seller review'}
        </button>
      </div>
      <div className="w-100">
        <hr />
      </div>
    </>
  );
};

export default PostSellerReview;
