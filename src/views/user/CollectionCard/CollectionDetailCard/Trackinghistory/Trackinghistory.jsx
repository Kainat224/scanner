import { useSelector } from 'react-redux';

const Trackinghistory = () => {
  const { orderDetail } = useSelector(state => state.order);
  const { trackId, website, name } = orderDetail.trackMeta || '';
  return (
    <div className="d-flex flex-column w-100  pb-4 border-bottom-4">
      <br />
      <div className="px-4">
        <p className="font-weight-bold blue-color f-18 "> Tracking history</p>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex flex-wrap flex-fill align-items-center px-4 flex-row">
          <p>Tracking ID: {trackId || '-'}</p>
        </div>
        <div className="d-flex text-lg-right">
          <p>{name || '-'}</p>
        </div>
      </div>
      <br />
      <div className="d-flex flex-wrap flex-fill align-items-center px-4 flex-row">
        <p>Tracking URL: {website ? <a href={website}>{website}</a> : '-'}</p>
      </div>
      {/* <div className="order-track mt-4">
      <div className="card1">
        <ul id="progressbar" className="text-center ">
          <li className="active step0" />
          <li className="step0" />
          <li className="step0" />
          <li className="step0" />
        </ul>
        <h6 className="mb-4">
          <b className="blue-color">Order Placed</b>
          <p className="small">Order received from buyer name</p>
        </h6>
        <h6 className="mb-4">
          <b className="blue-color">Order Confirmed</b>
          <p className="small">Order is confirmed and getting packed</p>
        </h6>
        <h6 className="mb-4">
          <b className="blue-color">Shipped</b>
          <p className="small">
            Order picked-up by shipping partners
            <br />
            Reached nearest hub 1
            <br />
            Reached nearest hub 2
          </p>
        </h6>
        <h6 className="mb-4">
          <b className="blue-color">Delivered</b>
        </h6>
      </div>
    </div> */}
    </div>
  );
};

export default Trackinghistory;
