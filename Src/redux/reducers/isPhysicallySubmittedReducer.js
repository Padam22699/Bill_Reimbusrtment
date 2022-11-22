import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default isPhysicallySubmittedReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED:
      return {
        ...state,
        loading: true,
      };
    case types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_IS_PHYSICALLY_SUBMITTED_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };
      case types.CLEAR_REQUEST_IS_PHYSICALLY_SUBMITTED:
        return {
          ...state,
          data: {},
          loading: false,
        };
    default:
      return state;
  }
};
