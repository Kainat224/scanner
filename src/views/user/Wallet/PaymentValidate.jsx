import Model from '../../../components/UI/Model/Model';

const PaymentValidate = props => {
  const { closeModel, msg } = props;
  return (
    <Model
      closeModel={closeModel}
      headerTitle="Payment Status"
      modalId="paymentStatus"
      //   FooterComponent={FooterComponent}
      //   submitBtnText="Cancel"
    >
      <div className="modal-body pt-0">
        <div className="form-group mb-0">
          <h3 style={{ textAlign: 'center' }}>{msg}</h3>
        </div>
      </div>
    </Model>
  );
};

export default PaymentValidate;
