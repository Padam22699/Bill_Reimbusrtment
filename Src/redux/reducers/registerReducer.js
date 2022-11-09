import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default registerReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SEND_REQUEST_REGISTER:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_REGISTER_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_REGISTER_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };
      case types.CLEAR_REQUEST_REGISTER:
        return {
          ...state,
          data: {},
          loading: false,
        };
    default:
      return state;
  }
};
