import CheckImg from '../../../assets/images/checked.svg';

const DeliveryPartner = () => (
  <>
    <div className="home-title w-100  pt-3 mt-3">Delivery Partner</div>
    <div className="w-100">
      <hr />
    </div>
    <div className="d-flex flex-column w-100 ">
      <div className="">
        <p className="font-weight-bold blue-color f-18 ">Company name 1</p>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex  align-items-center flex-row">
          <i className="fas fa-calendar-alt text-primary mr-3" />
          <p>Estimated Delivery date </p>
        </div>
        <div className="d-flex text-lg-right">
          <h4 className="font-weight-bold blue-color mx-4">$50</h4>
          <img className="img-fluid checked-icon" src={CheckImg} alt="" />
        </div>
      </div>
    </div>
    <div className="w-100">
      <hr />
    </div>
    <div className="d-flex flex-column w-100  pb-4 border-bottom-4">
      <div className="">
        <p className="font-weight-bold blue-color f-18 ">Company name 2</p>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <div className="d-flex  align-items-center flex-row">
          <i className="fas fa-calendar-alt text-primary mr-3" />
          <p>Estimated Delivery date </p>
        </div>
        <div className="d-flex text-lg-right">
          <h4 className="font-weight-bold blue-color mx-4">$50</h4>
          <img className="img-fluid checked-icon" src={CheckImg} alt="" />
        </div>
      </div>
    </div>

    <div className="d-flex justify-content-between w-100 flex-fill align-items-center ">
      <div className="home-title w-75  pt-4 ">Coin Price</div>
      <h4 className="font-weight-bold blue-color">$50</h4>
    </div>
  </>
);

export default DeliveryPartner;
