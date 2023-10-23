import { NO_DATA_FOUND_SVG } from '../../../assets/images';

const NoDataFound = ({ data }) => (
  <div className="center-msg-text">
    <img src={NO_DATA_FOUND_SVG} alt="" />
    <h4>{data}</h4>
  </div>
);

export default NoDataFound;
