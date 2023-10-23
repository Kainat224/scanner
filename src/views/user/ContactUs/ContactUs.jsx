import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { postQuerySaga } from '../../../store/actions/auth/auth';
import { axios } from '../../../http';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import { getCmsSaga, resetCms, resetErrorMsg, showModal } from '../../../store/actions';
import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';
import { Spinner } from '../../../components';

const ContactUs = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { cms } = useSelector(state => state.profile);
  const { open } = useSelector(state => state.modal);
  const {
    // isLoading,
    errorMsg,
    //  errorType
  } = useSelector(state => state.auth);
  const onUpdate = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const postQuery = () => {
    if (query.length > 0) {
      dispatch(postQuerySaga({ message: query, setQuery }));
    } else {
      dispatch(
        showModal({
          open: true,
          notifyType: 1,
          message: 'Message cannot be empty',
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getCmsSaga({ screen: 'Contact Us' }));
    return () => dispatch(resetCms());
  }, []);

  if (!cms) return <Spinner />;

  return (
    <>
      <HeaderTitle title="Contact us" />

      <section className="main-wrapper " id="product">
        <div className="txt-black f-18 mt-4">{ReactHtmlParser(cms.pageDescription)}</div>
        <div className="container">
          <div className="home-row-wrapper" id="contact-us">
            <div className="row align-items-center justify-content-center ">
              <div className="col-md-12 col-lg-6">
                <textarea
                  value={query}
                  className="form-control"
                  placeholder=" Post query"
                  onChange={onUpdate}
                  onClick={() => {
                    if (errorMsg) dispatch(resetErrorMsg());
                  }}
                />
                {errorMsg && <div className="error-message">{errorMsg}</div>}
                <button
                  type="button"
                  className="btn-primary btn mt-4"
                  onClick={() => {
                    postQuery();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {open && <AlertMessageModal />}
    </>
  );
};

export default SetTokenHeader(ContactUs, axios);
