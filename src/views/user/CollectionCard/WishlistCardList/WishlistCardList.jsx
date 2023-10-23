import { Link } from 'react-router-dom';
import { CHECK_IMG, COIN_IMG } from '../../../../assets/images';
import renderRating from '../../../../utils/renderRating/renderRating';

const WishlistCardList = props => {
  const { isMyCollection, children, item } = props;
  const mathRound = rating => Math.round(rating * 2) / 2;

  return (
    <>
      <div className="home-row-wrapper">
        <div className="row align-items-center ">
          <div className="col-md-12 col-lg-3">
            <Link to={`/collection-detail/${item.coinId}`}>
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
            <Link to={`/collection-detail/${item.userId}`}>
              <h6 className=" home-title">
                {item.name && item.name} {item.isGraded && <span>Graded</span>}
              </h6>
            </Link>
            <p className="small-title">{item.history}</p>
            {/* <h6 className="price">$ {item.price}</h6> */}
            <h6 className="price">
              {item.isAuctioned ? item._auction && `$${item._auction.amount}` : `$${item.price}`}
            </h6>
            {!isMyCollection && (
              <div className="d-flex  justify-content-between  mt-3 flex-wrap">
                <div className="d-flex mb-4">
                  <div>
                    <img src={CHECK_IMG} width="20" height="" alt="" />
                  </div>
                  <div className="ml-3 font-16 grey-color">
                    Posted by
                    <span className="blue-color">
                      &nbsp; {item.firstName} {item.lastName}
                    </span>
                    <br />
                    {item.address && (
                      <p className="font-14 font-normal">
                        {` ${item.address.city}, 
                      ${item.address.country}, ${item.address.postalCode}`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="rating">
                  {/* <div className="stars">{renderRating(item.rating || 0)}</div> */}
                  <div className="stars">
                    {renderRating(mathRound((item.userDetails && item.userDetails.rating) || 0))}
                  </div>
                  {/* <span className="review-no">{item.review || 0} Review</span> */}
                  <span className="review-no">
                    {mathRound((item.userDetails && item.userDetails.rating) || 0)} Ratings
                  </span>
                </div>
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

export default WishlistCardList;
