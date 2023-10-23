import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
// import Model from '../../UI/Model/Model';
import Model from '../Model/Model';
import { addAuctionSaga } from '../../../store/actions';
import {
  BASE_PRICE_REQUIRED,
  END_DATE_TIME_REQUIRED,
  START_DATE_TIME_REQUIRED,
  START_DATE_TIME_VALID,
} from '../../../constants/errorConstants';
// import AlertMessageModal from '../../../components/UI/Model/AlertMessageModal';

const PutIntoAuctionModal = props => {
  const { coinId, screen, selectedCoinIndex, history } = props;
  const {
    userData: { _id: userId },
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    startDateTime: Yup.date().required(START_DATE_TIME_REQUIRED),
    endDateTime: Yup.date()
      .min(Yup.ref('startDateTime'), START_DATE_TIME_VALID)
      .required(END_DATE_TIME_REQUIRED),
    amount: Yup.string().required(BASE_PRICE_REQUIRED),
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
        startDateTime: '',
        endDateTime: '',
        amount: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          addAuctionSaga({
            data: {
              ...values,
              userId,
              coinId,
            },
            closeModel,
            screen,
            selectedCoinIndex,
            history,
          }),
        );
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        // setFieldError,
        handleSubmit,
        // isSubmitting
      }) => (
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <Model
              headerTitle="Put into auction"
              closeModel={closeModel}
              FooterComponent={FooterComponent}
            >
              <div className="modal-body pt-0">
                <div className="form-group mb-0">
                  <div className="form-group ">
                    <label className="ml-0">Start date-time</label>
                    <div className="dateinput">
                      <DatePicker
                        className="form-control datetimepicker2"
                        selected={values.startDateTime}
                        name="startDateTime"
                        showTimeSelect
                        timeIntervals={15}
                        timeFormat="HH:mm"
                        dateFormat="MM/dd/yyyy HH:mm"
                        minDate={new Date()}
                        onFocus={e => e.target.blur()}
                        onChange={date => {
                          // if (values.endDateTime !== '') {
                          //   if (
                          //     // new Date(values.startDateTime.toLocaleDateString()) >
                          //     //   new Date(date.toLocaleDateString()) &&
                          // new Date(values.startDateTime).getTime() > new Date(date).getTime()
                          //     date > values.endDateTime
                          //   ) {
                          //     setFieldError('endDateTime', START_DATE_TIME_VALID);
                          //   }
                          // }
                          setFieldValue('startDateTime', date);
                        }}
                      />
                    </div>
                    <div className="error-message">
                      {errors.startDateTime && touched.startDateTime && errors.startDateTime}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label className="ml-0">End date-time</label>
                    <div className="dateinput">
                      <DatePicker
                        className="form-control datetimepicker2"
                        selected={values.endDateTime}
                        name="endDateTime"
                        showTimeSelect
                        timeIntervals={15}
                        timeFormat="HH:mm"
                        dateFormat="MM/dd/yyyy HH:mm"
                        minDate={new Date(values.startDateTime)}
                        disabled={!values.startDateTime}
                        onFocus={e => e.target.blur()}
                        onChange={date => {
                          // if (
                          //   new Date(values.startDateTime.toLocaleDateString()) >
                          //     new Date(date.toLocaleDateString()) &&
                          //   values.startDateTime.getTime() > date.getTime()
                          // ) {
                          //   setFieldError('endDateTime', 'test');
                          // }
                          setFieldValue('endDateTime', date);
                        }}
                      />
                    </div>
                    <div className="error-message">
                      {errors.endDateTime && touched.endDateTime && errors.endDateTime}
                    </div>
                  </div>
                  <div className="form-group ">
                    <label className="ml-0">Base price</label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Base price"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
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
                    </div>
                  </div>
                </div>
              </div>
            </Model>
          </form>
          {/* {open && <AlertMessageModal />} */}
        </div>
      )}
    </Formik>
  );
};

export default PutIntoAuctionModal;
