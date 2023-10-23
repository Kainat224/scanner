import { put } from 'redux-saga/effects';
import { errorHandler } from '../../../utils';
import * as actions from '../../actions';

export function* getConversationSaga() {
  yield put(actions.getConversationStart());

  yield errorHandler({
    endpoint: `/conversations?startIndex=1&itemsPerPage=12`,
    successHandler: yield function* (response) {
      yield put(actions.getConversationSuccess({ data: response.data }));
      if (response.data.items.length !== 0) {
        yield put(actions.getConversationMessageSaga(response.data.items[0]));
      }
    },
    failHandler: actions.getConversationFail,
    apiType: 'get',
  });
}

export function* getConversationMessageSaga(action) {
  const { _id, participants } = action.payload;
  yield put(actions.getConversationMessageStart());

  yield errorHandler({
    endpoint: `/conversations/${_id}/messages`,
    successHandler: yield function* (response) {
      yield put(
        actions.getConversationMessageSuccess({
          data: response.data,
          participants,
          _id,
        }),
      );
    },
    failHandler: actions.getConversationMessageFail,
    apiType: 'get',
  });
}

export function* createConversationSaga(action) {
  yield put(actions.createConversationStart());
  const data = action.payload;
  yield errorHandler({
    endpoint: `/conversations`,
    successHandler: yield function* (response) {
      yield put(actions.createConversationSuccess({ data: response.data }));
    },
    failHandler: actions.createConversationFail,
    apiType: 'post',
    payload: data,
  });
}

export function* createConversationMessageSaga(action) {
  yield put(actions.createConversationMessageStart());
  yield errorHandler({
    endpoint: `/conversations/${action.payload.conversationId}/messages`,
    successHandler: yield function* (response) {
      yield put(actions.createConversationMessageSuccess(response.data));
    },
    failHandler: actions.createConversationMessageFail,
    apiType: 'post',
    payload: { message: action.payload.message },
  });
}

export function* addConversationMessageSaga(action) {
  yield put(actions.addConversationMessageSaga(action));
}

export function* addNotificationSaga(action) {
  yield put(actions.addNotificationSaga(action));
}
