import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // specify config defaults that will be applied to every request
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
