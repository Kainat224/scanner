import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, NoDataFound, PutIntoAuctionModal, Spinner } from '../../../components';
import { gradeListSaga } from '../../../store/actions';
// import CollectionListCard from '../CollectionCard/CollectionListCard/CollectionListCard';
// import PutIntoAuctionModal from '../MyCollection/PutIntoAuctionModal';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const GradedCollection = () => {
  const [openPutIntoAuctionModal, setOpenPutIntoAuctionModal] = useState(false);
  const [selectedCoinIndex, setSelectedCoinIndex] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState('');
  const { open } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const { isLoading, gradeList } = useSelector(state => state.collection);

  useEffect(() => {
    dispatch(gradeListSaga());
  }, []);

  if (isLoading) return <Spinner />;
  if (!gradeList.length) return <NoDataFound data="No Graded Collection Found" />;

  return (
    <>
      <div className="container mypad" id="pro-img">
        {gradeList === null ? (
          <Spinner />
        ) : gradeList && gradeList.length !== 0 ? (
          gradeList.map((item, idx) => (
            <Card item={item} key={item._id}>
              <div className="col-lg-3">
                <button
                  type="button"
                  disabled={item.marketPlaceState === 'ON_AUCTION'}
                  onClick={() => {
                    setSelectedCoinIndex(idx);
                    setSelectedCoinId(item._id);
                    setOpenPutIntoAuctionModal(true);
                  }}
                  className="btn btn-defualt"
                >
                  {item.marketPlaceState === 'ON_AUCTION'
                    ? 'Already in Auction'
                    : 'Put into Auction'}
                </button>
              </div>
            </Card>
          ))
        ) : (
          <NoDataFound data="No Graded Collection Found" />
        )}
      </div>
      {openPutIntoAuctionModal && (
        <PutIntoAuctionModal
          modalOpenClose={setOpenPutIntoAuctionModal}
          coinId={selectedCoinId}
          selectedCoinIndex={selectedCoinIndex}
          screen="GRADED_COLLECTION"
        />
      )}
      {open && <AlertMessageModal />}
    </>
  );
};

export default GradedCollection;
