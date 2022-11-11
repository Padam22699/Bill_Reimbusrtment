import {types} from '../actions/types';

export default tokenReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case types.SET_TOKEN:
      return {
        ...state, 
        data: payload,
      };
    default:
      return state;
  }
};
