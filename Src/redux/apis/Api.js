import axios from './axiosDeclaration';
import store from '../store';

export const register = async requestJson => {
  try {
    const response = await axios.post('user/register', requestJson);
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE REGISTER=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};
export const addSuperAdmin = async requestJson => {
  try {
    const response = await axios.post('user/admin-register', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE SUPERADMIN=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert(JSON.stringify(err.response));
    }
  }
};

export const login = async requestJson => {
  try {
    const response = await axios.post('user/login', requestJson);
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE LOGIN=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      setTimeout(() => {
        return alert(err.response.data.message);
      }, 100);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const getNotification = async requestJson => {
  try {
    const response = await axios.post('notification/getall', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE GETNOTIFICATION=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const forgotPassword = async requestJson => {
  try {
    const response = await axios.post('user/forgot-password', requestJson);
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE FORGETPASSWORD=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const addBill = async requestJson => {
  try {
    const response = await axios.post(
      'https://reimbursement.wedighq.com/bill',
      requestJson,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: store.getState().tokenReducer.data,
        },
      },
    );
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE ADDBILL=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const getAllBills = async requestJson => {
  try {
    const response = await axios.post('bill/getAll', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE GETBILLS=> ', response.data);
    console.log('Store', store.getState().tokenReducer.data);

    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const getBillDetail = async requestJson => {
  try {
    const response = await axios.post('bill/detail', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE getBillDetail=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const isPhysicallySubmitted = async requestJson => {
  try {
    const response = await axios.post('bill/is-phy-submitted', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE isPhysicallySubmitted=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return console.log(err.response);
    }
  }
};

export const reminder = async requestJson => {
  try {
    const response = await axios.post('bill/is-reminder', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE reminder=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const changeStatus = async requestJson => {
  try {
    const response = await axios.post('bill/change-status', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE changeStatus=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};

export const getDashboardData = async requestJson => {
  try {
    const response = await axios.post('dashboard', requestJson, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: store.getState().tokenReducer.data,
      },
    });
    console.log('REQUEST=> ', requestJson);
    console.log('RESPONSE getDashboardData=> ', response.data);
    return response.data;
  } catch (err) {
    if (err.response.data.statusCode == 400) {
      return alert(err.response.data.message);
    } else {
      return alert('There is an issue in response, please try again later');
    }
  }
};
