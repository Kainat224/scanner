import { combineReducers } from 'redux';
import auth from './auth/auth';
import modal from './modal/modal';
import collection from './collection/collection';
import profile from './profile/profile';
import order from './order/order';
import conversation from './conversation/conversation';
import payment from './payment/payment';

const allReducers = combineReducers({
  auth,
  modal,
  collection,
  profile,
  order,
  conversation,
  payment,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
