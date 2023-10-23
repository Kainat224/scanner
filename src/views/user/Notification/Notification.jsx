import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactEasyInfiniteScroll from 'react-easy-infinite-scroll';

import HeaderTitle from '../../../components/UI/HeaderTitle/HeaderTitle';
import { getNotificationSaga } from '../../../store/actions/profile/profile';
import SetTokenHeader from '../../../hoc/SetTokenHeader/SetTokenHeader';
import { axios } from '../../../http';
import { NoDataFound, Spinner } from '../../../components';

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(state => state.profile);

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
    dispatch(getNotificationSaga(generateURL(modifiedPayload)));
  };
  useEffect(() => {
    getData({ isNew: true, skip: 0 });
  }, []);

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  return (
    <>
      <HeaderTitle title="Notifications" />
      <section className="main-wrapper top-60" id="notification">
        {!notifications ? (
          <Spinner />
        ) : notifications.items.length ? (
          notifications.items.map(notification => {
            const d = new Date(notification.created);
            const newDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${formatAMPM(
              d,
            )}`;

            return (
              <div className="container" key={notification._id}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex">
                      <i className="fa  fa-bell mr-2 txt-blue mt-1" aria-hidden="true" />
                      <div>
                        <h1>{notification.metadata.body}</h1>
                        <p>{newDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <hr />
                </div>
              </div>
            );
          })
        ) : (
          <NoDataFound data="No Notification Found" />
        )}
      </section>
      <ReactEasyInfiniteScroll
        listLength={notifications && notifications.items && notifications.items.length}
        totalRecords={notifications && notifications.totalItems}
        apiCallBack={getData}
      />
    </>
  );
};

export default SetTokenHeader(Notification, axios);
