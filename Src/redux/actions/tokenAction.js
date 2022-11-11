import {types} from './types';

export function setToken(data) {
  return {
    type: types.SET_TOKEN,
    payload: data,
  };
}
