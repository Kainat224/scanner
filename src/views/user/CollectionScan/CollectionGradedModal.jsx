/* eslint-disable dot-notation */
/* eslint-disable no-debugger */
/* eslint-disable prefer-destructuring */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Model from '../../../components/UI/Model/Model';
import { addCoinSaga, createBankNoteSaga } from '../../../store/actions';
// import { priceRange } from '../../../utils';

const CollectionGradedModal = props => {
  const { isBankNote } = props;
  const history = useHistory();
  const [gradingArray, setGradingArray] = useState([]);
  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const { scanResult = '' } = useSelector(state => state.collection);
  const { mlMetadata, _mlReference } = scanResult || '';
  const { mlResponse, images } = mlMetadata || '';
  const result = isBankNote
    ? {
        name: (mlResponse && mlResponse.Name) || '-',
        history: (mlResponse && mlResponse.History) || '-',
        price: (mlResponse && mlResponse.Price && mlResponse.Price.split('$').join('')) || '-',
        // priceRange: priceRange(
        //   (mlResponse && mlResponse.Price && mlResponse.Price.split('$').join('')) || '0',
        // ),
        priceRange: (scanResult && scanResult.priceRange) || '0',
        // && mlResponse.Price.split('$').join('')
        // diameter: (mlResponse && mlResponse.Diameter) || '-',
        // && mlResponse.Diameter.split(' ')[0])
        // weight: (mlResponse && mlResponse.Weight) || '-',
        length: (mlResponse && mlResponse.Length) || '-',
        breadth: (mlResponse && mlResponse.Breadth) || '-',
        ruler: (mlResponse && mlResponse.Ruler) || '-',
        age: (mlResponse && mlMetadata.Age) || '-',
        frontImg: images && images.FRONT_SIDE_IMAGE && images.FRONT_SIDE_IMAGE.url,
        backImg: images && images.BACK_SIDE_IMAGE && images.BACK_SIDE_IMAGE.url,
        // front_image: (mlMetadata && mlMetadata.)
      }
    : {
        name: (mlResponse && mlResponse.Name) || '-',
        history: (mlResponse && mlResponse.History) || '-',
        price: (mlResponse && mlResponse.Price && mlResponse.Price.split('$').join('')) || '-',
        // priceRange: priceRange(
        //   (mlResponse && mlResponse.Price && mlResponse.Price.split('$').join('')) || '0',
        // ),
        priceRange: (scanResult && scanResult.priceRange) || '0',
        // && mlResponse.Price.split('$').join('')
        diameter: (mlResponse && mlResponse.Diameter) || '-',
        // && mlResponse.Diameter.split(' ')[0])
        weight: (mlResponse && mlResponse.Weight) || '-',
        ruler: (mlResponse && mlResponse.Ruler) || '-',
        age: (mlResponse && mlMetadata.Age) || '-',
        frontImg: images && images.FRONT_SIDE_IMAGE && images.FRONT_SIDE_IMAGE.url,
        backImg: images && images.BACK_SIDE_IMAGE && images.BACK_SIDE_IMAGE.url,
        // front_image: (mlMetadata && mlMetadata.)
      };
  const { title } = props;
  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button
        type="button"
        onClick={() => {
          const formData = new FormData();
          formData.append('_mlReference', _mlReference);
          if (isBankNote) {
            formData.append('isCoin', false);
          } else {
            formData.append('isCoin', true);
          }

          Object.keys(result).forEach(key => {
            if (key === 'price') {
              // eslint-disable-next-line radix
              result['price'] = parseInt(result[key].split(',').join(''));
            }
            formData.append(key, result[key]);
          });
          if (isBankNote) {
            dispatch(createBankNoteSaga({ data: formData, closeModel, history }));
          } else {
            dispatch(addCoinSaga({ data: formData, closeModel, history }));
          }
        }}
        // onClick={() => history.push(`/scan-result/${scanResult._mlReference}`)}
        className={
          disable ? 'btn btn-primary width-342 disabled-signup' : 'btn btn-primary width-342'
        }
        disabled={disable}
      >
        ok
      </button>
    </>
  );

  const SelectGradingMethod = event => {
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      setGradingArray(oldData => [...oldData, name]);
      setDisable(false);
    } else {
      setGradingArray(gradingArray.filter(item => item !== name));
    }
  };

  useEffect(() => {
    if (gradingArray.length === 0) {
      setDisable(true);
    }
  }, [gradingArray]);
  return (
    <Model
      headerTitle={`is your ${title} has been graded?`}
      closeModel={closeModel}
      FooterComponent={FooterComponent}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8 col-7">
          <div className="row">
            <div className="col-lg-6 col-6">
              <div className="form-check" id="check-radio">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  name="NCG"
                  onClick={SelectGradingMethod}
                />
                <label className="form-check-label ml-2" htmlFor="exampleCheck1">
                  NCG
                </label>
              </div>
            </div>
            <div className="col-lg-6  col-6">
              <div className="form-check" id="check-radio">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="PCGS"
                  id="exampleCheck1"
                  onClick={SelectGradingMethod}
                />
                <label className="form-check-label ml-2" htmlFor="exampleCheck1">
                  PCGS
                </label>
              </div>
            </div>
            <div className="col-lg-6  col-6 ">
              <div className="form-check" id="check-radio">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="Others"
                  id="exampleCheck1"
                  onClick={SelectGradingMethod}
                />
                <label className="form-check-label ml-2" htmlFor="exampleCheck1">
                  Other
                </label>
              </div>
            </div>

            <div className="col-lg-6  col-6">
              <div className="form-check" id="check-radio">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="No grading"
                  id="exampleCheck1"
                  onClick={SelectGradingMethod}
                />
                <label className="form-check-label ml-2" htmlFor="exampleCheck1">
                  No grading
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Model>
  );
};

export default CollectionGradedModal;
