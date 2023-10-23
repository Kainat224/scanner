import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactEasyInfiniteScroll from 'react-easy-infinite-scroll';

import { getOrderBoughtSaga, getOrderSoldSaga } from '../../../store/actions/order/order';
import { NoDataFound, Spinner, ViewCard } from '../../../components';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';

const Orders = () => {
  const dispatch = useDispatch();
  const {
    mySales,
    myPurchases,
    // isLoading
  } = useSelector(state => state.order);
  const { type } = useParams();
  const generateURL = payload => {
    const payloadObj = {};
    let url = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(payload)) {
      if (key === 'isNew') {
        payloadObj[key] = value;
      } else if (key === 'skip' && value !== 0) url = `&${key}=${value}`;
    }
    return { URL: url, ...payloadObj };
  };

  const getSaleData = payload => {
    const modifiedPayload = {
      ...payload,
      skip: payload.skip || 0,
    };
    dispatch(getOrderSoldSaga(generateURL(modifiedPayload)));
  };

  const getBuyData = payload => {
    const modifiedPayload = {
      ...payload,
      skip: payload.skip || 0,
    };
    dispatch(getOrderBoughtSaga(generateURL(modifiedPayload)));
  };

  useEffect(() => {
    if (type === 'buy') {
      getBuyData({ isNew: true, skip: 0 });
    }
    if (type === 'sell') {
      getSaleData({ isNew: true, skip: 0 });
    }
  }, [type]);

  return (
    <section className="" id="product">
      <div className="container p-144">
        <div className="">
          <div className="row align-items-start no-gutters flex-md-wrap">
            <div className="col-lg-12 d-flex flex-wrap justify-content-between">
              <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
                <div className="home-title w-50 pl-4 pt-4">Orders</div>
                <ul className="nav nav-pills mb-3 mt-4 flex-nowrap">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${type === 'buy' ? 'active' : ' '}`}
                      to="/orders/buy"
                    >
                      Buy
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${type === 'sell' ? 'active' : ' '}`}
                      to="/orders/sell"
                    >
                      Sell
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-100">
                <hr />
              </div>

              <div className="tab-content w-100">
                {type === 'buy' && (
                  <div className="tab-pane fade show active">
                    {myPurchases ? (
                      myPurchases === null ? (
                        <Spinner />
                      ) : myPurchases.items && myPurchases.items.length !== 0 ? (
                        myPurchases.items.map(item => (
                          <Link to={item._coin ? `/order-detail/${item._id}` : '/order-detail/'}>
                            <ViewCard item={item._coin} />
                          </Link>
                        ))
                      ) : (
                        <NoDataFound data="No Orders Found" />
                      )
                    ) : null}
                    <ReactEasyInfiniteScroll
                      listLength={myPurchases && myPurchases.items && myPurchases.items.length}
                      totalRecords={myPurchases && myPurchases.totalItems}
                      apiCallBack={getBuyData}
                    />
                  </div>
                )}
                {type === 'sell' && (
                  <div className="tab-pane fade show active">
                    {mySales ? (
                      mySales === null ? (
                        <Spinner />
                      ) : mySales.items && mySales.items.length !== 0 ? (
                        mySales.items.map(item => (
                          <Link to={item._coin ? `/order-detail/${item._id}` : '/order-detail/'}>
                            <ViewCard item={item._coin} />
                          </Link>
                        ))
                      ) : (
                        <NoDataFound data="No Orders Found" />
                      )
                    ) : null}
                    <ReactEasyInfiniteScroll
                      listLength={mySales && mySales.items && mySales.items.length}
                      totalRecords={mySales && mySales.totalItems}
                      apiCallBack={getSaleData}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetTokenHeader(Orders, axios);
