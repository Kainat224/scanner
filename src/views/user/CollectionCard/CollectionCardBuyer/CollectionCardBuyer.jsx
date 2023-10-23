import { PROFILE_SVG } from '../../../../assets/images';

const CollectionCardBuyer = props => {
  const { item } = props;
  return (
    <div className="d-flex justify-content-between border-bottom flex-wrap py-3">
      <div className="d-flex align-items-center my-2 mw-240">
        <div className="position-relative">
          <img
            className="thumbnail mr-3"
            src={item.profilePic && item.profilePic.url ? item.profilePic.url : PROFILE_SVG}
            alt=""
          />
          <span className="active-circle" />
        </div>
        <div>
          <h5 className="font-weight-bold txt-blue">{`${item.firstName} ${item.lastName}`}</h5>
          <h6 className="txt-blue font-14 pt-2">Active</h6>
        </div>
      </div>
      <div className=" d-flex flex-column justify-content-center my-2 mw-240 pr-4">
        <div className="mx-auto circle">{item.index + 1}</div>
        {/* <h6 className="txt-blue o-5 font-10 pt-2">20 min</h6> */}
      </div>
    </div>
  );
};

export default CollectionCardBuyer;
