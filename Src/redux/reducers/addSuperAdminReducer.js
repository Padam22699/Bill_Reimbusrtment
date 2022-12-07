import {types} from '../actions/types';
const initialState = {
  loading: false,
  data: {},
  error: {},
};

export default addSuperAdminReducer = (
  state = initialState,
  {type, payload},
) => {
  switch (type) {
    case types.SEND_REQUEST_ADD_SUPER_ADMIN:
      return {
        ...state,
        loading: true,
      };

    case types.SEND_REQUEST_ADD_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
      };
    case types.SEND_REQUEST_ADD_SUPER_ADMIN_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case types.CLEAR_REQUEST_ADD_SUPER_ADMIN:
      return {
        ...state,
        data: {},
        loading: false,
      };
    default:
      return state;
  }
};
