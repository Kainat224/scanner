import { useDispatch } from 'react-redux';

import { logout } from '../../../store/actions';
import Model from '../../../components/UI/Model/Model';

const ConfirmLogout = props => {
  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };
  const dispatch = useDispatch();

  const FooterComponent = () => (
    <>
      <button
        type="button"
        className="btn  btn-primary w-auto min-width-auto mr-2"
        data-dismiss="modal"
        data-toggle="modal"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </>
  );
  return (
    <>
      <Model
        closeModel={closeModel}
        headerTitle="Are you sure you want to logout?"
        modalId="confirmLogout"
        FooterComponent={FooterComponent}
      />
    </>
  );
};

export default ConfirmLogout;
