import CheckImg from '../../../assets/images/checked.svg';

// eslint-disable-next-line consistent-return
const DeliveryAddressSelected = props => {
  const { item } = props;
  if (item)
    return (
      <>
        <div className="d-flex flex-column w-100  ">
          <div className="home-title w-100  pt-3 mt-3 d-flex justify-content-between">
            <p className="font-weight-bold blue-color f-18">Delivery Address</p>
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
              <div>
                <img className="img-fluid checked-icon" src={CheckImg} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100">
          <hr />
        </div>
      </>
    );
};

export default DeliveryAddressSelected;
