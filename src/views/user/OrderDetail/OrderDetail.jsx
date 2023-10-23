import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   addWishlistSaga,
//   deleteWishlistSaga,
//   getCoinDetailsSaga,
//   resetCollection,
// } from '../../../store/actions/collection/collection';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
// import CollectionDetailCard from '../CollectionCard/CollectionDetailCard/CollectionDetailCard';
import { getOrderDetailSaga } from '../../../store/actions/order/order';
import { DetailCard, Spinner } from '../../../components';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const OrderDetail = props => {
  const { id } = props.match.params;
  const { orderDetail } = useSelector(state => state.order);
  const { open } = useSelector(state => state.modal);
  const {
    userData: { _id: userId },
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getOrderDetailSaga(id));
  }, [dispatch]);

  if (!orderDetail) {
    return <Spinner />;
  }
  return (
    <>
      {/* <CollectionDetailCard */}
      <DetailCard
        detailData={orderDetail._coin}
        addressDetail={orderDetail.addressDetails}
        showRelatedCoinsList
        showTrackinghistory={!!(orderDetail && orderDetail._buyer._id === userId)}
        showPostSellerReview={!!(orderDetail && orderDetail._buyer._id === userId)}
        showDeliveryAddress
        isOrderDetail
        sellerDetail={orderDetail && orderDetail._seller}
        buyerDetail={orderDetail && orderDetail._buyer}
        postTrackingDetails={!!(orderDetail && orderDetail._seller._id === userId)}
        orderId={id || null}
      />
      {open && <AlertMessageModal />}
    </>
  );
};
export default withRouter(SetTokenHeader(OrderDetail, axios));
