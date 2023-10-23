import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import AgreeModal from './AgreeModal';
import CoinImg from '../../../assets/images/coin.png';
import { getCoinDetailsSaga } from '../../../store/actions';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
import { Spinner } from '../../../components';

const ApplyGrading = () => {
  const [openAgreeModal, setOpenAgreeModal] = useState(false);
  const { open } = useSelector(state => state.modal);
  const { isLoading } = useSelector(state => state.collection);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;

  useEffect(() => {
    dispatch(getCoinDetailsSaga(id));
  }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="main-wrapper top-60" id="product">
        <div className="container">
          <div className="home-row-wrapper">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-8">
                <h6 className="  text-left title-2 mb-3 txt-blue">Apply Grading</h6>
                {/* eslint-disable-next-line max-len */}
                <div className="d-flex flex-wrap w-100 align-items-center py-3 border-bottom-around">
                  <div className="pl-3 mb-1   position-relative">
                    <img className="img-fluid card-coin mb-2" src={CoinImg} alt="" />
                  </div>
                  <div className="d-flex flex-wrap flex-fill justify-content-between ml-3">
                    <div className="mx-3 mt-2 mx-left">
                      <p className="font-weight-bold blue-color f-18 ">Benefits</p>
                      <p className="">
                        Totam rem aperiam, eaque ipsa quae abillo inventore veritatis totam ipsa
                        quae abillo inventore veritatis.
                      </p>
                    </div>
                  </div>
                </div>
                {/* eslint-disable-next-line max-len */}
                <div className="d-flex flex-wrap w-100 align-items-center py-3 border-bottom-around">
                  <div className="pl-3 mb-1   position-relative">
                    <img className="img-fluid card-coin mb-2" src={CoinImg} alt="" />
                  </div>
                  <div className="d-flex flex-wrap flex-fill justify-content-between ml-3">
                    <div className="mx-3 mt-2 mx-left">
                      <p className="font-weight-bold blue-color f-18 ">Benefits</p>
                      <p className="">
                        Totam rem aperiam, eaque ipsa quae abillo inventore veritatis totam ipsa
                        quae abillo inventore veritatis.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center mt-4">
                  <div className="col-lg-6 text-center mb-3">
                    <button
                      type="button"
                      className="btn btn-width btn-primary"
                      onClick={() => setOpenAgreeModal(true)}
                    >
                      I Agree
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {openAgreeModal && (
        <AgreeModal
          modalOpenClose={setOpenAgreeModal}
          coinId={id}
          isBankNote={pathname.includes('/apply-grading/bank-note')}
        />
      )}
      {open && <AlertMessageModal />}
    </>
  );
};
export default ApplyGrading;
