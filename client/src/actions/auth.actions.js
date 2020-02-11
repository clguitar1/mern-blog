import axios from 'axios';
import { setAlert } from './alert.actions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Get logged in user
export const loadUser = () => async dispatch => {
  // check for token in localStorage
  if (localStorage.token) {
    // set the token in headers?
    setAuthToken(localStorage.token);
  }

  try {
    // Get logged in user (auth.routes.js)
    const res = await axios.get('/api/auth');
    // console.log(res); // logs an object with data, status, statusText, headers, config and request
    dispatch({
      type: USER_LOADED,
      // res. data is from res.json(user) in routes/auth.js get('api/auth')
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    // for each error, call setAlert to display alert messages
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

    dispatch({ type: REGISTER_FAIL });
  }
};

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  const body = JSON.stringify({ email, password });

  try {
    // Authenticate user and get token (auth.routes.js)
    const res = await axios.post('/api/auth', body, config);

    // res.data from res.json({ token }); in POST api/auth
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    // for each error, call setAlert to display alert messages
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout and clear profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
