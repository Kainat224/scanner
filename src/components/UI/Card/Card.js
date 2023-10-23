import { Link } from 'react-router-dom';
import { renderRating } from '../../../utils';
import { CHECK_IMG, COIN_IMG } from '../../../assets/images';

const Card = props => {
  const { isMyWishlist, isMyCollection, children, item } = props;
  const mathRound = rating => Math.round(rating * 2) / 2;

  if (!isMyWishlist && !item.userId) return '';
  return (
    <>
      <div className="home-row-wrapper">
        <div className="row align-items-center ">
          <div className="col-md-12 col-lg-3">
            <Link to={`/collection-detail/${isMyWishlist ? item.coinId : item._id}`}>
              <div className="img-a d-flex">
                {item.isGraded && <div className="pos-trust">Trust Seal</div>}
                <div>
                  <img
                    src={
                      (item.pictures && item.pictures.front && item.pictures.front.url) || COIN_IMG
                    }
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src={
                      (item.pictures && item.pictures.back && item.pictures.back.url) || COIN_IMG
                    }
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-12 col-lg-6">
            <Link to={`/collection-detail/${isMyWishlist ? item.coinId : item._id}`}>
              <h6 className=" home-title">
                {item.name && item.name} {item.isGraded && <span>Graded</span>}
              </h6>
            </Link>
            <p className="small-title">{item.history}</p>
            {isMyWishlist ? (
              <h6 className="price">
                {item.isAuctioned ? item._auction && `$${item._auction.amount}` : `$${item.price}`}
              </h6>
            ) : (
              <h6 className="price">
                {item.marketPlaceState === 'ON_AUCTION' && item.isAuctioned
                  ? item._auction && `$${item._auction.amount}`
                  : !item.isSold && item.marketPlaceState === 'UNLISTED'
                  ? item.isGraded
                    ? `$${item.price}`
                    : item.priceRange
                  : `$${item.price}`}
                {/* {item.isGraded
                  ? `$${item.price}`
                  : item.marketPlaceState === 'ON_AUCTION' && item.isAuctioned
                  ? item._auction && `$${item._auction.amount}`
                  : !item.isSold && item.marketPlaceState === 'UNLISTED'
                  ? item.priceRange
                  : `$${item.price}`} */}
              </h6>
            )}
            {!isMyCollection && (
              <div className="d-flex  justify-content-between  mt-3 flex-wrap">
                <div className="d-flex mb-4">
                  <div>
                    <img src={CHECK_IMG} width="20" height="" alt="" />
                  </div>
                  <div className="ml-3 font-16 grey-color">
                    Posted by
                    {isMyWishlist ? (
                      <span className="blue-color">
                        &nbsp; {item.firstName} {item.lastName}
                      </span>
                    ) : (
                      <span className="blue-color">
                        &nbsp; {item.userId && item.userId.firstName}{' '}
                        {item.userId && item.userId.lastName}
                      </span>
                    )}
                    <br />
                    {item.address && (
                      <p className="font-14 font-normal">
                        {`${item.address.address}, ${item.address.city}, 
                      ${item.address.country}, ${item.address.postalCode}`}
                      </p>
                    )}
                  </div>
                </div>
                {isMyWishlist ? (
                  <div className="rating">
                    <div className="stars">
                      {renderRating(mathRound((item.userDetails && item.userDetails.rating) || 0))}
                    </div>
                    <span className="review-no">
                      {mathRound((item.userDetails && item.userDetails.rating) || 0)} Ratings
                    </span>
                  </div>
                ) : (
                  <div className="rating">
                    <div className="stars">
                      {renderRating(mathRound((item.userId && item.userId.rating) || 0))}
                    </div>
                    <span className="review-no">
                      {mathRound((item.userId && item.userId.rating) || 0)} Ratings
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Card;
