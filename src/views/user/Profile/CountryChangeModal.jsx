import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserDetailSaga, getCountrySaga } from '../../../store/actions';
import Model from '../../../components/UI/Model/Model';

const CountryChangeModal = props => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState('');
  const [showCountry, setShowCountry] = useState(true);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const { countryCode } = useSelector(state => state.profile);
  const { userData } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountrySaga());
  }, [dispatch]);

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const handleInputChange = event => {
    event.preventDefault();
    if (!showCountry) setShowCountry(true);
    const query = event.target.value;
    setCountry(query);
    setCountries(
      countryCode.filter(
        e => query.toLowerCase() === e.name.toLowerCase().substring(0, query.length),
      ),
    );
  };

  const FooterComponent = () => (
    <>
      <button
        type="button"
        id="submitPwdBtn"
        className="btn btn-primary"
        onClick={() => {
          const { modalOpenClose } = props;
          let valideCountryName = false;

          if (countries) {
            // eslint-disable-next-line array-callback-return
            countries.map(item => {
              if (item.name === country) {
                valideCountryName = true;
              }
            });
          }
          if (valideCountryName) {
            setShowErrorMsg(false);
            const data = {
              ...userData,
              country,
            };
            const modalClose = false;
            dispatch(editUserDetailSaga({ data, modalClose }));
            modalOpenClose(false);
          } else {
            setShowErrorMsg(true);
          }
        }}
      >
        Submit
      </button>
    </>
  );

  const handleSubmit = () => {};

  return (
    <Model closeModel={closeModel} FooterComponent={FooterComponent}>
      <form onSubmit={handleSubmit}>
        <br />
        <div className="form-group mb-0 position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            value={country}
            onChange={e => {
              handleInputChange(e);
              setShowErrorMsg(false);
            }}
          />
          <i className="fas fa-search txt-light" />
          <div className="error-message">
            {showErrorMsg && 'Please choose the country from given list'}
          </div>
          {showCountry && (
            <div>
              {countries &&
                country &&
                countries.map(e => (
                  <button
                    key={e._id}
                    className="dropdown-item
                  link-button"
                    onClick={() => {
                      setCountry(e.name);
                      setShowCountry(false);
                    }}
                    type="button"
                  >
                    {e.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </form>
    </Model>
  );
};

export default CountryChangeModal;
