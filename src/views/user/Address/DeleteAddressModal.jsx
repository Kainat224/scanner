import { useDispatch } from 'react-redux';
import Model from '../../../components/UI/Model/Model';
import { deleteAddressSaga } from '../../../store/actions';

const DeleteAddressModal = props => {
  const { editRecord } = props;
  const dispatch = useDispatch();

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          dispatch(deleteAddressSaga({ data: { id: editRecord._id }, closeModel }));
        }}
      >
        Yes
      </button>
      <br />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          closeModel();
        }}
      >
        No
      </button>
    </>
  );

  return (
    <>
      <Model
        headerTitle="Are you sure, you want to Delete Address?"
        closeModel={closeModel}
        FooterComponent={FooterComponent}
      />
    </>
  );
};

export default DeleteAddressModal;
