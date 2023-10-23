import React from 'react';
import { CHECK_IMG } from '../../../../assets/images';

const ProfileCard = ({
  src = { CHECK_IMG },
  type = 'title',
  screen = 'big-screen',
  text = 'Credit',
  data,
  // val,
  // flag,
  // datas = 'India',
  expandDiv = <i className="fa fa-angle-right" aria-hidden="true" />,
}) => (
  <div
    className={`d-flex justify-content-between
   ${screen === 'big-screen' && 'flex-wrap'} `}
  >
    <div className="d-flex align-items-center my-2 mw-240">
      <img className="right-part-img mr-3" src={src} alt="" />
      <h5 className="font-weight-bold txt-blue">{type}</h5>
    </div>
    <div className="d-flex align-items-center my-2 mw-240">
      <div className="d-flex align-items-center my-2 mw-240">
        {data && (
          <>
            <b className="font-20 txt-blue mr-2">{data}</b>
            <h5
              className={`txt-blue 
                    ${screen === 'big-screen' && 'o-5'}`}
            >
              {text}
            </h5>
          </>
        )}
        {expandDiv}
        {/* {val && (
          <>
            <b className="font-20 txt-blue">{val}</b>&nbsp;&nbsp;&nbsp;
            <h5 className="txt-blue o-5">{text} </h5>{' '}
          </>
        )}
        {!data && !val && flag !== 'country' && (
          <i className="fa fa-angle-right" aria-hidden="true" />
        )}
        {flag === 'country' && screen === 'small-screen' && (
          <b className="font-20 txt-blue">{datas}</b>
        )} */}
      </div>
    </div>
  </div>
);

export default ProfileCard;
