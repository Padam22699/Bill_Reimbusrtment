import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default getDashboardDataReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SEND_REQUEST_GET_DASHBOARD_DATA:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_GET_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };
      case types.CLEAR_REQUEST_GET_DASHBOARD_DATA:
        return {
          ...state,
          data: {},
          loading: false,
        };
    default:
      return state;
  }
};
