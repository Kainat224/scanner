import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  getAuctionCreatedListSaga,
  getAuctionParticipatedListSaga,
  resetCollection,
} from '../../../store/actions';
import { NoDataFound, Spinner, ViewCard } from '../../../components';

const Auction = () => {
  const { auctionList, auctionCreatedList } = useSelector(state => state.collection);
  const dispatch = useDispatch();
  const { type } = useParams();
  useEffect(() => {
    if (type === 'participated') {
      dispatch(getAuctionParticipatedListSaga());
    }
    if (type === 'created') {
      dispatch(getAuctionCreatedListSaga());
    }
    return () => dispatch(resetCollection());
  }, [type, dispatch]);

  return (
    <>
      <section className="" id="product">
        <div className="container ">
          <div className="">
            <div className="row align-items-start no-gutters flex-md-wrap">
              <div className="col-lg-12 d-flex flex-wrap justify-content-between">
                <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
                  <div className="home-title w-50 pl-4 pt-4">Participated List</div>

                  <ul className="nav nav-pills mb-3 mt-4 flex-nowrap">
                    <li className="nav-item">
                      <Link to="/auction/participated">
                        <button
                          type="button"
                          className={`link-button nav-link ${
                            type === 'participated' ? 'active' : ' '
                          }`}
                          style={{ color: 'blue' }}
                        >
                          Participated
                        </button>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/auction/created">
                        <button
                          type="button"
                          className={`link-button nav-link ${type === 'created' ? 'active' : ' '}`}
                          style={{ color: 'blue' }}
                        >
                          Created
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-100">
                  <hr />
                </div>
                <div className="tab-content w-100" id="pills-tabContent">
                  <div className="tab-pane fade show active">
                    {type === 'participated' &&
                      (auctionList === null ? (
                        <Spinner />
                      ) : auctionList.list && auctionList.list.length !== 0 ? (
                        auctionList.list.map(item => (
                          <Link
                            to={`/collection-detail/${item.coinDetails._id}`}
                            key={item.coinDetails._id}
                          >
                            <ViewCard item={{ ...item.coinDetails, price: item.amount }} />
                          </Link>
                        ))
                      ) : (
                        <NoDataFound data="No Auction Found" />
                      ))}

                    {type === 'created' &&
                      (auctionCreatedList === null ? (
                        <Spinner />
                      ) : auctionCreatedList.list.length !== 0 ? (
                        auctionCreatedList.list.map(item => (
                          <Link to={`/bid-detail/${item._id}`} key={item._id}>
                            <ViewCard item={{ ...item.coinDetails, price: item.amount }} />
                          </Link>
                        ))
                      ) : (
                        <NoDataFound data="No Auction Found" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auction;
