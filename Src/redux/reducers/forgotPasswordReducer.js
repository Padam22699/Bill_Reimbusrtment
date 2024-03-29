import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default forgotPasswordReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SEND_REQUEST_FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };
      case types.CLEAR_REQUEST_FORGOT_PASSWORD:
        return {
          ...state,
          data: {},
          loading: false,
        };
    default:
      return state;
  }
};
