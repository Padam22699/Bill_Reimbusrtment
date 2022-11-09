import axios from './axiosDeclaration';
import store from '../store'


export const register = async (requestJson) => {
  try {
    const response = await axios.post('user/register', requestJson);
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message)
    } else {
      return alert("There is an issue in response, please try again later")
    }
  }
};

export const login = async (requestJson) => {
  try {
    const response = await axios.post('user/login', requestJson);
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message)
    } else {
      return alert("There is an issue in response, please try again later")
    }
  }
};

export const getNotification = async (requestJson) => {
  try {
    const response = await axios.post('notification/getall', requestJson);
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message)
    } else {
      return alert("There is an issue in response, please try again later")
    }
  }
};
