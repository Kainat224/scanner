import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootReducer from './store/reducer';
import {
  watchAuthentication,
  watchCollection,
  watchProfile,
  watchConversation,
  watchOrder,
  watchCredit,
} from './store/sagas';
import App from './App';
import reportWebVitals from './reportWebVitals';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const sagaMiddleware = createSagaMiddleware();
const store = composeEnhancers
  ? createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
  : createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuthentication);
sagaMiddleware.run(watchCollection);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchConversation);
sagaMiddleware.run(watchOrder);
sagaMiddleware.run(watchCredit);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
