import { COIN_IMG } from '../../../../assets/images';

const ViewCard = props => {
  const { item } = props;
  if (!item) return '';
  return (
    <div className="d-flex flex-wrap w-100 align-items-center pb-3 border-bottom">
      <div className="pl-4 position-relative">
        <img
          className="img-fluid card-coin mb-2"
          src={(item.pictures && item.pictures.front.url) || COIN_IMG}
          alt=""
        />
        {item.isGraded && <span className="img-graded">Graded</span>}
      </div>
      <div className="d-flex flex-wrap flex-fill justify-content-between ml-3">
        <div className="mx-3 mt-1">
          <p className="font-weight-bold blue-color f-18 ">{item.name && item.name}</p>
          <p>Coin Age: {`${item.age} years` || '--'}</p>
        </div>
        <div className="text-lg-right m-3">
          <h4 className="font-weight-bold blue-color">$ {item.price}</h4>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
