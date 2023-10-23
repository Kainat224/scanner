const PaymentHistory = ({ item }) => {
  const date = new Date(item.createdAt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return (
    <div className="box-card m-4">
      <div className="box-card-title d-flex justify-content-between align-items-center">
        <span>{`${day}/${month}/${year}`}</span>
        <h4 className="font-weight-bold">${item.amount}</h4>
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <p className="txt-blue f-12 my-1">{item.description} </p>
        <p className="txt-blue f-12 my-1">{item.BUY_CREDIT ? 'Credit' : 'Debit'} </p>
      </div>
    </div>
  );
};

export default PaymentHistory;
