import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import DatePicker from 'react-datepicker';
// import { PROFILE_SVG } from '../../../assets/images';
import Model from '../../../components/UI/Model/Model';

// import {
//   FIRSTNAME_REQUIRED,
//   GENDER_REQUIRED,
//   LASTNAME_REQUIRED,
// } from '../../../constants/errorConstants';
import { addCoinSaga } from '../../../store/actions';

const CollectionInformationModal = props => {
  // eslint-disable-next-line no-debugger
  // debugger;
  const {
    scanResult: { coin },
  } = useSelector(state => state.collection);
  const { mlMetadata, _mlReference } = coin;
  // const mlMetadata = {
  //   name: 'coin name',
  //   history: 'coin history',
  //   price: 'coin name',
  //   diameter: 'coin diameter',
  //   ruler: 'coin ruler',
  //   age: 'coin age',
  //   isCoin: '',
  // };
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string(),
    history: Yup.string(),
    price: Yup.string(),
    diameter: Yup.string(),
    ruler: Yup.string(),
    age: Yup.string(),
    isCoin: Yup.string(),
  });

  const closeModel = () => {
    const { modalOpenClose } = props;
    modalOpenClose(false);
  };

  const FooterComponent = () => (
    <>
      <button type="submit" className="btn btn-primary" data-dismiss="modal" data-toggle="modal">
        Update
      </button>
    </>
  );
  return (
    <Formik
      initialValues={{
        name: mlMetadata.Name || '',
        history: mlMetadata.History || '',
        price: (mlMetadata.Price && mlMetadata.Price.split('$').join('')) || '',
        // && mlMetadata.Price.split('$').join('')
        diameter: mlMetadata.Diameter || '',
        // && mlMetadata.Diameter.split(' ')[0])
        ruler: mlMetadata.Ruler || '',
        age: mlMetadata.Age || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // const { name, history, price, diameter, ruler, age } = values;
        // const data = { ...values, _mlReference, isCoin: 'true' };
        const formData = new FormData();
        formData.append('_mlReference', _mlReference);
        formData.append('isCoin', true);

        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });
        dispatch(addCoinSaga({ data: formData, closeModel }));
        setSubmitting(false);
      }}
    >
      {({
        values,
        // errors,
        // touched,
        // handleChange,
        // handleBlur,
        setFieldValue,
        handleSubmit,
        // isSubmitting
      }) => (
        <>
          <form onSubmit={handleSubmit} noValidate>
            <Model
              closeModel={closeModel}
              headerTitle="Collection Informations"
              modalId="editProfile"
              FooterComponent={FooterComponent}
              //   submitBtnText="Cancel"
            >
              <div className="modal-body pt-0">
                <div className="form-group mb-0">
                  <label>Name</label>

                  <input
                    type="text"
                    className="form-control my-2"
                    name="name"
                    value={values.name}
                    onChange={e => {
                      setFieldValue('name', e.target.value);
                    }}
                  />
                </div>
                <div className="form-group mb-0">
                  <label>History</label>

                  <textarea
                    type="text"
                    className="form-control my-2"
                    name="history"
                    value={values.history}
                    rows="2"
                    onChange={e => {
                      setFieldValue('history', e.target.value);
                    }}
                  />
                </div>
                <div className="form-group mb-0">
                  <label>Price</label>

                  <input
                    type="text"
                    className="form-control my-2"
                    name="price"
                    value={values.price}
                    onChange={e => {
                      setFieldValue('price', e.target.value);
                    }}
                  />
                </div>
                <div className="form-group mb-0">
                  <label>Diameter</label>

                  <input
                    type="text"
                    className="form-control my-2"
                    name="diameter"
                    value={values.diameter}
                    onChange={e => {
                      setFieldValue('diameter', e.target.value);
                    }}
                  />
                </div>
                <div className="form-group mb-0">
                  <label>Ruler</label>

                  <input
                    type="text"
                    className="form-control my-2"
                    name="ruler"
                    value={values.ruler}
                    onChange={e => {
                      setFieldValue('ruler', e.target.value);
                    }}
                  />
                </div>
                <div className="form-group mb-0">
                  <label>Age</label>
                  <input
                    type="text"
                    className="form-control my-2"
                    name="age"
                    value={values.age}
                    onChange={e => {
                      setFieldValue('age', e.target.value);
                    }}
                  />
                </div>
                {/* <div className="form-group mb-0">
                  <label>Age</label>

                  <input
                    type="text"
                    className="form-control my-2"
                    name="isCoin"
                    value={mlMetadata.isCoin}
                  />
                </div> */}
              </div>
            </Model>
          </form>
        </>
      )}
    </Formik>
  );
};

export default CollectionInformationModal;
