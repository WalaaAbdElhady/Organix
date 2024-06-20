/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const forgetPass = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/forgotPassword',
      data: {
        email
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Code sent to email!');
      window.setTimeout(() => {
        location.assign('/resetPass');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const setNewPass = async (password, passwordConfirm, code) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/resetPassword/${code}`,
      data: {
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'password reset sucessfully!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updatePass = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMyPassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password Updated Successfully!');
      window.setTimeout(() => {
        location.assign('/profile');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateProfile = async data => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMe',
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Profile Updated Successfully!');
      window.setTimeout(() => {
        location.assign('/profile');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
