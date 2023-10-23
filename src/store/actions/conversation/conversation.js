import * as actionLabels from '../../actionLabels';

export const getConversationStart = payload => ({
  type: actionLabels.GET_CONVERSATION_START,
  payload,
});

export const getConversationSaga = payload => ({
  type: actionLabels.GET_CONVERSATION_SAGA,
  payload,
});

export const getConversationSuccess = payload => ({
  type: actionLabels.GET_CONVERSATION_SUCCESS,
  payload,
});

export const getConversationFail = payload => ({
  type: actionLabels.GET_CONVERSATION_FAIL,
  payload,
});

export const getConversationMessageStart = payload => ({
  type: actionLabels.GET_CONVERSATION_MESSAGE_START,
  payload,
});

export const getConversationMessageSaga = payload => ({
  type: actionLabels.GET_CONVERSATION_MESSAGE_SAGA,
  payload,
});

export const getConversationMessageSuccess = payload => ({
  type: actionLabels.GET_CONVERSATION_MESSAGE_SUCCESS,
  payload,
});

export const getConversationMessageFail = payload => ({
  type: actionLabels.GET_CONVERSATION_MESSAGE_FAIL,
  payload,
});

export const createConversationStart = payload => ({
  type: actionLabels.CREATE_CONVERSATION_START,
  payload,
});

export const createConversationSaga = payload => ({
  type: actionLabels.CREATE_CONVERSATION_SAGA,
  payload,
});

export const createConversationSuccess = payload => ({
  type: actionLabels.CREATE_CONVERSATION_SUCCESS,
  payload,
});

export const createConversationFail = payload => ({
  type: actionLabels.CREATE_CONVERSATION_FAIL,
  payload,
});

// messaging directly

export const createConversationMessageStart = payload => ({
  type: actionLabels.CREATE_CONVERSATION_MESSAGE_START,
  payload,
});

export const createConversationMessageSaga = payload => ({
  type: actionLabels.CREATE_CONVERSATION_MESSAGE_SAGA,
  payload,
});

export const createConversationMessageSuccess = payload => ({
  type: actionLabels.CREATE_CONVERSATION_MESSAGE_SUCCESS,
  payload,
});

export const createConversationMessageFail = payload => ({
  type: actionLabels.CREATE_CONVERSATION_MESSAGE_FAIL,
  payload,
});

export const addConversationMessageSaga = payload => ({
  type: actionLabels.ADD_CONVERSATION_MESSAGE_SAGA,
  payload,
});

export const addNotificationSaga = payload => ({
  type: actionLabels.CREATE_NOTIFICATION_SAGA,
  payload,
});
