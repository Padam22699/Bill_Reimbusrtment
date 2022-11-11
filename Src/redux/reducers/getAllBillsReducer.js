import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default getAllBillsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SEND_REQUEST_GET_ALL_BILLS:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_GET_ALL_BILLS_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_GET_ALL_BILLS_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };
      case types.CLEAR_REQUEST_GET_ALL_BILLS:
        return {
          ...state,
          data: {},
          loading: false,
        };
    default:
      return state;
  }
};
