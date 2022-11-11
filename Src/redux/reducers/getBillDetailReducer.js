import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default getBillDetailReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SEND_REQUEST_GET_BILL_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_GET_BILL_DETAIL_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_GET_BILL_DETAIL_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };
      case types.CLEAR_REQUEST_GET_BILL_DETAIL:
        return {
          ...state,
          data: {},
          loading: false,
        };
    default:
      return state;
  }
};
