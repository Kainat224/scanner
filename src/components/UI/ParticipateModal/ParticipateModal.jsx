/* eslint-disable camelcase */
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Model from '../Model/Model';
import { addBidSaga, sellCoinSaga } from '../../../store/actions';
import {
  BASE_PRICE_REQUIRED,
  BID_PRICE_REQUIRED,
  Sell_PRICE_REQUIRED,
} from '../../../constants/errorConstants';

//  using for  bid and sell
const ParticipateModal = props => {
  const { participateObj, headerTitle, bidAmount, screen, priceObjDetails } = props;
  const {
    userData: { _id: userId },
  } = useSelector(state => state.auth);
  const [bidAmountError, setBidAmountError] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    amount: Yup.string().required(
      !screen ? (headerTitle ? BID_PRICE_REQUIRED : BASE_PRICE_REQUIRED) : Sell_PRICE_REQUIRED,
    ),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </>
  );

  return (
    <Formik
      initialValues={{
        amount: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (screen) {
          if (values.amount >= 0) {
            dispatch(
              sellCoinSaga({
                coinID: priceObjDetails && priceObjDetails.coinId,
                history: priceObjDetails && priceObjDetails.history,
                price: values.amount,
                screen,
                closeModel,
              }),
            );
            setSubmitting(false);
          } else {
            setBidAmountError(true);
          }
          return;
        }
        if (values.amount < bidAmount) {
          setBidAmountError(true);
        } else {
          dispatch(
            addBidSaga({
              data: {
                ...participateObj,
                ...values,
                userId,
              },
              closeModel,
            }),
          );
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        // setFieldError,
        handleSubmit,
        // isSubmitting
      }) => (
        <form onSubmit={handleSubmit} noValidate method="post">
          <Model
            headerTitle={headerTitle || 'Put into auction'}
            closeModel={closeModel}
            FooterComponent={FooterComponent}
          >
            <div className="modal-body pt-0">
              <div className="form-group mb-0">
                {screen ? (
                  <div className="form-group ">
                    <label className="ml-0">{headerTitle}</label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder={headerTitle}
                      name="amount"
                      value={values.amount}
                      onChange={e => {
                        handleChange(e);
                        setBidAmountError(false);
                      }}
                      onBlur={handleBlur}
                      onKeyDown={e => {
                        if (
                          e.which === 38 ||
                          e.which === 40 ||
                          e.which === 69 ||
                          e.which === 189 ||
                          e.which === 187
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <div className="error-message">
                      {errors.amount && touched.amount && errors.amount}
                      {bidAmountError && 'Sell price should be greater or equal to 0'}
                      <div style={{ color: 'blue' }}>
                        Note: Price Range is {priceObjDetails && priceObjDetails.priceRange}
                        <div className="mt-2">
                          Disclaimer: Please enter the price including the delivery charges as per
                          your conveniences
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="form-group ">
                    <label className="ml-0">Base price : ${bidAmount}</label>
                    <br />
                    <label className="ml-0">{headerTitle ? 'Bid price' : 'Base price'}</label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder={headerTitle ? 'Bid price' : 'Base price'}
                      name="amount"
                      value={values.amount}
                      onChange={e => {
                        handleChange(e);
                        setBidAmountError(false);
                      }}
                      onBlur={handleBlur}
                      onKeyDown={e => {
                        if (
                          e.which === 38 ||
                          e.which === 40 ||
                          e.which === 69 ||
                          e.which === 189 ||
                          e.which === 187
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <div className="error-message">
                      {errors.amount && touched.amount && errors.amount}
                      {bidAmountError && 'Bid price should be greater than base price'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Model>
        </form>
      )}
    </Formik>
  );
};

export default ParticipateModal;
