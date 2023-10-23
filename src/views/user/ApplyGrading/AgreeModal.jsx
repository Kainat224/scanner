import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Model from '../../../components/UI/Model/Model';
import { bankNoteGradeSaga, coinGradeSaga } from '../../../store/actions';

const AgreeModal = props => {
  const { coinId, modalOpenClose, isBankNote } = props;
  const { userData } = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const closeModel = () => {
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      {userData.creditCount && userData.creditCount >= 2 ? (
        <button
          type="button"
          onClick={() => {
            if (isBankNote) {
              dispatch(bankNoteGradeSaga({ coinId, closeModel, history }));
            } else {
              // history.push(`/grading-details`);
              dispatch(coinGradeSaga({ coinId, closeModel, history }));
            }
          }}
          className="btn btn-primary mb-2 mr-0 width-100"
        >
          Continue
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            history.push(`/wallet`);
            modalOpenClose(false);
          }}
          className="btn btn-secondary width-100"
        >
          Recharge
        </button>
      )}
    </>
  );

  return (
    <Model closeModel={closeModel} FooterComponent={FooterComponent}>
      <div className=" text-center mb-2">
        <h2 className=" font-weight-bold blue-color f-60">2</h2>
        <p className="title-2 f-24">Credits Required</p>
        <p className="f-18">{userData.creditCount || 0} Credit Available</p>
      </div>
    </Model>
  );
};

export default AgreeModal;
