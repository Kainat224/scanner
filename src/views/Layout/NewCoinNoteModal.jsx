import { useHistory } from 'react-router-dom';
import Model from '../../components/UI/Model/Model';

const NewCoinNoteModal = props => {
  const history = useHistory();

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button
        type="button"
        onClick={() => {
          history.push(`/coin-scan`);
          const { modalOpenClose } = props;
          modalOpenClose(false);
        }}
        className="btn btn-primary"
      >
        Coin
      </button>
      <br />
      <button
        type="button"
        onClick={() => {
          history.push(`/note-scan`);
          const { modalOpenClose } = props;
          modalOpenClose(false);
        }}
        className="btn btn-secondary"
      >
        Bank Note
      </button>
    </>
  );

  return (
    <Model
      closeModel={closeModel}
      headerTitle="What you want to scan?"
      FooterComponent={FooterComponent}
    />
  );
};

export default NewCoinNoteModal;
