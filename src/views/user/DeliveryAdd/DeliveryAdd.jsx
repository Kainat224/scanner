/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../../components';
import CheckImg from '../../../assets/images/checked.svg';
import AddAddressModal from '../Address/AddAddressModal';
import { getAddressSaga, setPrimaryAddressSaga } from '../../../store/actions';

const DeliveryAdd = props => {
  const { setEditRecord, setOpenAddAddressModal, editRecord, openAddAddressModal } = props;
  const dispatch = useDispatch();
  const { address } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getAddressSaga());
  }, []);
  const changePrimaryAddress = (id, index) => {
    dispatch(setPrimaryAddressSaga({ id, index }));
  };

  return (
    <>
      <div className="home-title w-100  pt-3 mt-3 d-flex justify-content-between">
        Delivery Address
      </div>
      <div className="w-100">
        <hr />
      </div>
      {address === null ? (
        <Spinner />
      ) : address && address.length !== 0 ? (
        address.map((item, index) => (
          <Fragment key={item._id}>
            <div className="d-flex flex-column w-100  ">
              <div className="">
                <div className="font-weight-bold blue-color f-18 ">
                  Address {index + 1}{' '}
                  <div
                    className="fas fa-edit m-2 ml-3"
                    onClick={() => {
                      setOpenAddAddressModal(true);
                      setEditRecord(item);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div className="d-flex  flex-fill align-items-center  flex-row">
                  <i className="fas fa-map-marker-alt text-primary mr-3" />
                  <p>
                    {' '}
                    {item.addressLine1 ? `${item.addressLine1},` : ''}
                    {item.addressLine2 ? `${item.addressLine2},` : ''}
                    {item.addressLine3 ? `${item.addressLine3},` : ''}
                    {`${item.city},
                                ${item.country}, ${item.postalCode}`}{' '}
                  </p>
                </div>

                <div className="text-lg-right">
                  {item.isPrimary ? (
                    <div>
                      <input type="radio" name="address" value={`address ${index}`} />
                      <img className="img-fluid checked-icon" src={CheckImg} alt="" />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '2px solid grey',
                      }}
                      onClick={() => {
                        changePrimaryAddress(item._id, index);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-100">
              <hr />
            </div>
          </Fragment>
        ))
      ) : (
        // <NoDataFound />
        <div className="d-flex flex-column w-100  ">
          <div className="d-flex justify-content-between mt-3">
            <div className="col-lg-2">
              <button
                type="button"
                onClick={() => {
                  setOpenAddAddressModal(true);
                  setEditRecord(null);
                }}
                className="btn btn-defualt"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}
      {openAddAddressModal && (
        <AddAddressModal modalOpenClose={setOpenAddAddressModal} editRecord={editRecord} />
      )}
    </>
  );
};

export default DeliveryAdd;
