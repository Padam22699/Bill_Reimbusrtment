import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default notificationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SEND_REQUEST_NOTIFICATION:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_NOTIFICATION_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };
      case types.CLEAR_REQUEST_NOTIFICATION:
        return {
          ...state,
          data: {},
          loading: false,
        };
    default:
      return state;
  }
};
