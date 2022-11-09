import defaultAxios from 'axios';

const axios = defaultAxios.create({
  baseURL: 'https://reimbursement.wedighq.com/',
  headers: {'Content-Type': 'application/json'},
});

export default axios;
