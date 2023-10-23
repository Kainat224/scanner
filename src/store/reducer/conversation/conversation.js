import * as actionLabels from '../../actionLabels';

export const initialState = {
  conversationDetails: null,
  currentConversation: null,
  notification: [],
  errMsg: '',
  isLoading: false,
  unread: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionLabels.GET_CONVERSATION_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_CONVERSATION_SUCCESS: {
      const newItems = payload.data.items.map(item => ({
        ...item,
        unread: 0,
      }));
      return {
        ...state,
        conversationDetails: {
          list: [...newItems],
          totalItems: payload.data.totalItems,
        },
        isLoading: false,
      };
    }
    case actionLabels.GET_CONVERSATION_FAIL:
      return {
        ...state,
        errMsg: payload,
        conversationDetails: [],
        isLoading: false,
      };

    case actionLabels.GET_CONVERSATION_MESSAGE_START:
      return { ...state, isLoading: true };
    case actionLabels.GET_CONVERSATION_MESSAGE_SUCCESS:
      return {
        ...state,
        currentConversation: {
          ...payload,
          participants: payload.participants.find(
            /* eslint no-underscore-dangle: 0 */
            person => person._user._id !== localStorage.getItem('userid'),
          ),
        },
        conversationDetails: {
          ...state.conversationDetails,
          unread: 0,
        },
        isLoading: false,
      };
    case actionLabels.GET_CONVERSATION_MESSAGE_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };

    case actionLabels.CREATE_CONVERSATION_MESSAGE_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionLabels.CREATE_CONVERSATION_MESSAGE_SUCCESS:
      return {
        ...state,
        currentConversation: {
          ...state.currentConversation,
          data: {
            items: [...state.currentConversation.data.items, payload],
            totalItems: state.currentConversation.data.items.length,
          },
        },
        isLoading: false,
      };
    case actionLabels.CREATE_CONVERSATION_MESSAGE_FAIL:
      return {
        ...state,
        errMsg: payload,
        isLoading: false,
      };
    case actionLabels.ADD_CONVERSATION_MESSAGE_SAGA: {
      // const conversationIndex =
      //   state.conversationDetails &&
      //   state.conversationDetails.list.findIndex(e => e._id === payload.conversation._id);
      // let conversationDetails = null;
      // if (conversationIndex === -1 && state.conversationDetails) {
      //   conversationDetails = {
      //     ...state.conversationDetails,
      //     list: [...state.conversationDetails.list, payload.conversation],
      //     totalItems: state.conversationDetails.totalItems + 1,
      //   };
      // } else if (state.conversationDetails && conversationIndex !== -1) {
      //   conversationDetails = {
      //     ...state.conversationDetails,
      //   };
      // }

      let notification = {
        ...state.notification,
      };
      let currentConversation = {
        ...state.currentConversation,
      };
      let conversationDetails = {
        ...state.conversationDetails,
      };
      if (!state.conversationDetails) {
        notification = {
          ...payload.conversation,
        };
      }
      if (state.currentConversation && state.currentConversation._id === payload.conversation._id) {
        currentConversation = {
          ...state.currentConversation,
          data: {
            items: [...state.currentConversation.data.items, payload.message],
            totalItems: state.currentConversation.data.totalItems + 1,
          },
        };
      } else {
        conversationDetails =
          state.conversationDetails &&
          state.conversationDetails.list.map(e => {
            if (e._id === payload.conversation._id) {
              return {
                ...state.conversationDetails,
                _lastMessage: {
                  ...payload.message,
                },
                // unread: state.conversationDetails.unread + 1,
              };
            }
            return e;
          });
      }
      return {
        ...state,
        conversationDetails,
        currentConversation,
        notification: [...state.notification, notification],
      };
    }

    case actionLabels.CREATE_NOTIFICATION_SAGA:
      return {
        ...state,
        notification: {
          ...state.notification,
          ...payload.conversation,
        },
        isLoading: false,
      };

    default:
      return state;
  }
};
