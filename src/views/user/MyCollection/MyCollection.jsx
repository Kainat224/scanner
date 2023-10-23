import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactEasyInfiniteScroll from 'react-easy-infinite-scroll';
// import CollectionListCard from '../CollectionCard/CollectionListCard/CollectionListCard';
// import PutIntoAuctionModal from './PutIntoAuctionModal';
import {
  getPortfolioSaga,
  deleteCollectionSaga,
  // sellCoinSaga,
  resetPortfolio,
} from '../../../store/actions';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import {
  Card,
  NoDataFound,
  Spinner,
  ParticipateModal,
  PutIntoAuctionModal,
} from '../../../components';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
// import ParticipateModal from '../Dashboard/ParticipateModal';

const MyCollection = () => {
  const [openPutIntoAuctionModal, setOpenPutIntoAuctionModal] = useState(false);
  const [coinId, setCoinId] = useState('');
  const dispatch = useDispatch();
  const { myCollections, isLoading } = useSelector(state => state.collection);
  const { open } = useSelector(state => state.modal);
  const [openParticipateModal, setOpenParticipateModal] = useState(false);

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
    dispatch(getPortfolioSaga(generateURL(modifiedPayload)));
  };
  useEffect(() => {
    getData({ isNew: true, skip: 0 });
    return dispatch(resetPortfolio());
  }, []);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="container mypad" id="pro-img">
        {myCollections === null ? (
          <Spinner />
        ) : myCollections.list && myCollections.list.length !== 0 ? (
          myCollections.list.map(item => (
            <Card isMyCollection item={item} key={item._id}>
              {/* <CollectionListCard item={item} key={item._id}> */}
              <div className="col-lg-3">
                {!item.isSold && item.marketPlaceState === 'UNLISTED' && (
                  <button
                    type="button"
                    onClick={() => {
                      setOpenParticipateModal(true);
                      setCoinId(item._id);
                    }}
                    className="btn btn-defualt"
                  >
                    Sell Now
                  </button>
                )}
                {!item.isSold && (
                  <button
                    type="button"
                    disabled={item.isAuctioned}
                    onClick={() => {
                      setOpenPutIntoAuctionModal(true);
                      setCoinId(item._id);
                    }}
                    className="btn btn-defualt mt-2"
                  >
                    {item.isAuctioned ? 'Already in Auction' : 'Put into Auction'}
                  </button>
                )}
                {!item.isSold && !item.isGraded && (
                  // <Link to={`/apply-grading/${item._id}`}>
                  <Link
                    to={
                      item.isCoin
                        ? `/apply-grading/coin/${item._id}`
                        : `/apply-grading/bank-note/${item._id}`
                    }
                  >
                    <button type="button" className="btn btn-defualt mt-2">
                      Apply for grading
                    </button>
                  </Link>
                )}
                <button
                  type="button"
                  disabled={!!(isLoading || item.isSold)}
                  onClick={() => {
                    dispatch(
                      deleteCollectionSaga({
                        data: {
                          id: item._id,
                        },
                      }),
                    );
                  }}
                  className="btn btn-defualt mt-2"
                >
                  {item.isSold ? (item.isCoin ? 'Coin Sold' : 'Note Sold') : 'Delete Collection'}
                </button>
              </div>
            </Card>
          ))
        ) : (
          <NoDataFound data="No Collection Found" />
        )}
        <ReactEasyInfiniteScroll
          listLength={myCollections && myCollections.list && myCollections.list.length}
          totalRecords={myCollections && myCollections.totalRecords}
          apiCallBack={getData}
        />
      </div>

      {openPutIntoAuctionModal && coinId && (
        <PutIntoAuctionModal
          modalOpenClose={setOpenPutIntoAuctionModal}
          coinId={coinId}
          screen="MY_COLLECTIONS"
        />
      )}
      {open && <AlertMessageModal />}
      {openParticipateModal && (
        <ParticipateModal
          headerTitle={
            myCollections.list &&
            myCollections.list.filter(item => item._id === coinId).length > 0 &&
            myCollections.list.filter(item => item._id === coinId)[0].isCoin
              ? 'Sell Coin'
              : 'Sell Note'
          }
          modalOpenClose={setOpenParticipateModal}
          screen="MY_COLLECTIONS"
          priceObjDetails={{
            coinId,
            priceRange:
              myCollections.list &&
              myCollections.list.filter(item => item._id === coinId).length > 0 &&
              myCollections.list.filter(item => item._id === coinId)[0].priceRange,
          }}
        />
      )}
    </>
  );
};
export default SetTokenHeader(MyCollection, axios);
