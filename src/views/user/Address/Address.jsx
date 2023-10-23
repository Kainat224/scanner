import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import AddAddressModal from './AddAddressModal';
import DeleteAddressModal from './DeleteAddressModal';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import { getAddressSaga } from '../../../store/actions';
import { NoDataFound, Spinner } from '../../../components';

const Address = () => {
  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
  const [openDeleteAddressModal, setOpenDeleteAddressModal] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const { address } = useSelector(state => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddressSaga());
  }, [dispatch]);

  useEffect(() => {
    if (!openAddAddressModal && !openDeleteAddressModal) {
      setEditRecord(null);
    }
  }, [openAddAddressModal, openDeleteAddressModal]);

  return (
    <>
      <HeaderTitle title="Shipping Address" />
      <section className="main-wrapper top-60" id="product">
        <div className="container">
          <div className="home-row-wrapper">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-8">
                <div className="text-right">
                  <button
                    type="button"
                    className="  btn btn-secondary mb-5 btn160"
                    onClick={() => {
                      setOpenAddAddressModal(true);
                      setEditRecord(null);
                    }}
                  >
                    Add Address
                  </button>
                </div>

                {address === null ? (
                  <Spinner />
                ) : address && address.length !== 0 ? (
                  address.map(item => (
                    <Fragment key={item._id}>
                      <div className="row align-items-center">
                        <div className="col-md-12 col-lg-9">
                          <h6 className=" home-title">{item.name}</h6>

                          <div className="d-flex justify-content-between  mt-3 flex-wrap">
                            <div className="d-flex mb-4">
                              <div>
                                <i
                                  className="fas fa-map-marker-alt text-primary"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3 font-16 grey-color">
                                {item.addressLine1 ? `${item.addressLine1},` : ''}
                                {item.addressLine2 ? `${item.addressLine2},` : ''}
                                {item.addressLine3 ? `${item.addressLine3},` : ''}
                                {`${item.city}, 
                                  ${item.country}, 
                                  ${item.postalCode}`}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <button
                            type="button"
                            className=" btn btn-defualt mt-2"
                            onClick={() => {
                              setOpenAddAddressModal(true);
                              setEditRecord(item);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className=" btn btn-defualt mt-2"
                            onClick={() => {
                              setOpenDeleteAddressModal(true);
                              setEditRecord(item);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <hr />
                    </Fragment>
                  ))
                ) : (
                  <NoDataFound data="No Address Found" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {openAddAddressModal && (
        <AddAddressModal modalOpenClose={setOpenAddAddressModal} editRecord={editRecord} />
      )}
      {openDeleteAddressModal && (
        <DeleteAddressModal modalOpenClose={setOpenDeleteAddressModal} editRecord={editRecord} />
      )}
    </>
  );
};

export default SetTokenHeader(Address, axios);
