import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactEasyInfiniteScroll from 'react-easy-infinite-scroll';
// import CollectionListCard from '../CollectionCard/CollectionListCard/CollectionListCard';
import { deleteWishlistSaga, getWishlistSaga, resetWishList } from '../../../store/actions';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import { Card, NoDataFound, ParticipateModal, Spinner } from '../../../components';
// import WishlistCardList from '../CollectionCard/WishlistCardList/WishlistCardList';
// import ParticipateModal from '../Dashboard/ParticipateModal';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.collection);
  const {
    userData: { _id: userId },
  } = useSelector(state => state.auth);
  const [enableBtnArr, setEnableBtnArr] = useState([]);
  const { open } = useSelector(state => state.modal);

  const [openParticipateModal, setOpenParticipateModal] = useState(false);
  const [participateObj, setParticipateObj] = useState(null);
  const history = useHistory();

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

  const getData = payload => {
    const modifiedPayload = {
      ...payload,
      skip: payload.skip || 0,
    };
    dispatch(getWishlistSaga(generateURL(modifiedPayload)));
  };
  useEffect(() => {
    getData({ isNew: true, skip: 0 });
    return () => dispatch(resetWishList());
  }, []);

  const selectedCoin = (coinId, action) => {
    if (action === 'ADD') {
      setEnableBtnArr(oldArr => [...oldArr, coinId]);
    } else {
      setEnableBtnArr(oldArr => [...oldArr.filter(item => item !== coinId)]);
    }
  };
  // if (isLoading) return <Spinner />;

  return (
    <div className="container mypad" id="pro-img">
      {wishlist === null ? (
        <Spinner />
      ) : wishlist.list && wishlist.list.length !== 0 ? (
        wishlist.list.map(item => (
          <Card isMyWishlist item={item} key={item.coinId}>
            <div className="col-lg-3">
              {userId !== item.userId && (
                <button
                  type="button"
                  className="btn btn-defualt"
                  disabled={
                    item.isSold ||
                    item.transactionStatus === 'approved' ||
                    item.transactionStatus === 'pending'
                  }
                  onClick={() => {
                    if (item.isAuctioned) {
                      setParticipateObj({
                        coinId: item.coinId,
                        auctionId: item._auction._id,
                        amount: item._auction.amount,
                      });
                      setOpenParticipateModal(true);
                    } else {
                      history.push(`/delivery-details/${item.coinId}`);
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
                  {/* {item.isAuctioned
                    ? 'Participate'
                    : !item.isSold
                    ? item.transactionStatus === 'approved' || item.transactionStatus === 'pending'
                      ? 'Sold'
                      : 'Buy Now'
                    : 'Sold'} */}
                  {/* {item.marketPlaceState === 'ON_AUCTION' ? 'Participate' : 'Buy Now'} */}
                </button>
              )}
              <button
                type="button"
                className="btn btn-defualt mt-2"
                // disabled={isLoading ? true : false}
                disabled={enableBtnArr.indexOf(item.coinId) > -1}
                onClick={() => {
                  selectedCoin(item.coinId, 'ADD');
                  dispatch(
                    deleteWishlistSaga({
                      data: {
                        id: item.coinId,
                        from: 'wishlist',
                      },
                      selectedCoin,
                    }),
                  );
                }}
              >
                Remove from Wishlist
              </button>
            </div>
          </Card>
        ))
      ) : (
        <NoDataFound data="No Wishlist Data Found" />
      )}
      <ReactEasyInfiniteScroll
        listLength={wishlist && wishlist.list && wishlist.list.length}
        totalRecords={wishlist && wishlist.totalRecords}
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
  );
};
export default SetTokenHeader(Wishlist, axios);
