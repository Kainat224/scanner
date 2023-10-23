import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactEasyInfiniteScroll from 'react-easy-infinite-scroll';
import { useHistory } from 'react-router-dom';
// import CollectionListCard from '../CollectionCard/CollectionListCard/CollectionListCard';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import {
  addWishlistSaga,
  // createConversationSaga,
  deleteWishlistSaga,
  getDashboardCollectionSaga,
  resetCollection,
} from '../../../store/actions';
import { Card, NoDataFound, Spinner, ParticipateModal } from '../../../components';
import FilterComponent from './FilterComponent';
// import ParticipateModal from './ParticipateModal';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const Dashboard = () => {
  const history = useHistory();
  const [participateObj, setParticipateObj] = useState(null);
  const [openParticipateModal, setOpenParticipateModal] = useState(false);
  const { open } = useSelector(state => state.modal);
  const [enableBtnArr, setEnableBtnArr] = useState([]);

  const [sortObj, setSortObj] = useState({
    country: '',
    grading: '',
    shape: '',
    material: '',
    fromYear: null,
    toYear: null,
    fromPrice: 0,
    toPrice: 0,
    sortPrice: 0,
    marketPlaceState: 'ON_SALE',
    isCoin: null,
  });
  const [option, setOption] = useState({
    isCoinSelected: true,
    isNoteSelected: true,
  });

  const { dashboardCollections } = useSelector(state => state.collection);
  const {
    userData: { _id: userId },
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const generateURL = payload => {
    const payloadObj = {};
    let url = '';
    let selected = '';
    const { isCoinSelected, isNoteSelected } = option;
    if ((isCoinSelected && isNoteSelected) || (!isNoteSelected && !isCoinSelected)) {
      selected = null;
    } else if (isCoinSelected) {
      selected = 'true';
    } else {
      selected = 'false';
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(payload)) {
      if (key !== 'isNew') {
        url += `&${key}=${value}`;
      } else {
        payloadObj[key] = value;
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    if (sortObj.isCoin === null) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries({
        ...sortObj,
        isCoin: selected,
      })) {
        if (value) {
          url += `&${key}=${value}`;
        }
      }
    }
    return { URL: url, ...payloadObj };
  };

  const getData = payload => {
    const modifiedPayload = {
      ...payload,
      startIndex: payload.skip + 1 || 1,
    };
    dispatch(getDashboardCollectionSaga(generateURL(modifiedPayload)));
  };

  useEffect(() => {
    // getData({ isNew: true, skip: 0 });
    getData({ isNew: true, startIndex: 0 });

    // return () => resetCollection();
    return () => dispatch(resetCollection());
  }, [sortObj, option]);

  const selectedCoin = (coinId, action) => {
    if (action === 'ADD') {
      setEnableBtnArr(oldArr => [...oldArr, coinId]);
    } else {
      setEnableBtnArr(oldArr => [...oldArr.filter(item => item !== coinId)]);
    }
  };
  // if (isLoading) return <Spinner />;

  return (
    <>
      <FilterComponent
        sortObj={sortObj}
        setSortObj={setSortObj}
        option={option}
        setOption={setOption}
      />
      <div className="container mypad" id="pro-img">
        {dashboardCollections === null ? (
          <Spinner />
        ) : dashboardCollections.list && dashboardCollections.list.length !== 0 ? (
          dashboardCollections.list.map(item => (
            // eslint-disable-next-line react/no-array-index-key
            // <Card item={item} key={index}>
            <Card item={item} key={item._id}>
              <div className="col-lg-3">
                {userId !== item.userId?._id && (
                  <button
                    type="button"
                    className="btn btn-defualt"
                    disabled={
                      item.isSold ||
                      item.transactionStatus === 'approved' ||
                      item.transactionStatus === 'pending'
                    }
                    onClick={() => {
                      if (item.marketPlaceState === 'ON_AUCTION') {
                        setParticipateObj({
                          coinId: item._id,
                          auctionId: item._auction._id,
                          amount: item._auction.amount,
                        });
                        setOpenParticipateModal(true);
                      } else {
                        // buy
                        history.push(`/delivery-details/${item._id}`);
                      }
                    }}
                  >
                    {!item.isSold
                      ? item.isAuctioned
                        ? 'Participate'
                        : item.transactionStatus === 'approved' ||
                          item.transactionStatus === 'pending'
                        ? 'Sold'
                        : 'Buy Now'
                      : 'Sold'}
                  </button>
                )}
                {item.isWishlist ? (
                  <button
                    type="button"
                    className="btn btn-defualt mt-2"
                    disabled={enableBtnArr.indexOf(item._id) > -1}
                    onClick={() => {
                      selectedCoin(item._id, 'ADD');
                      dispatch(
                        deleteWishlistSaga({
                          data: {
                            id: item._id,
                            from: 'dashboard',
                          },
                          selectedCoin,
                        }),
                      );
                    }}
                  >
                    Remove from Wishlist
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-defualt mt-2"
                    disabled={enableBtnArr.indexOf(item._id) > -1}
                    onClick={() => {
                      selectedCoin(item._id, 'ADD');
                      dispatch(
                        addWishlistSaga({
                          userId,
                          coinId: item._id,
                          from: 'dashboard',
                          selectedCoin,
                        }),
                      );
                    }}
                  >
                    Add to Wishlist
                  </button>
                )}
              </div>
            </Card>
          ))
        ) : (
          <NoDataFound data="No Coin/Bank Note Found" />
        )}
        <ReactEasyInfiniteScroll
          listLength={
            dashboardCollections && dashboardCollections.list && dashboardCollections.list.length
          }
          totalRecords={dashboardCollections && dashboardCollections.totalItems}
          apiCallBack={getData}
        />
        {openParticipateModal && (
          <ParticipateModal
            headerTitle="Bid Now"
            modalOpenClose={setOpenParticipateModal}
            participateObj={participateObj}
            bidAmount={participateObj.amount}
          />
        )}
        {open && <AlertMessageModal />}
      </div>
    </>
  );
};

export default SetTokenHeader(Dashboard, axios);
