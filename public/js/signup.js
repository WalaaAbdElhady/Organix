/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const signup = async (name, email, password, passwordConfirm, role) => {
  try {
    const validRoles = ['user', 'farmer'];
    if (!validRoles.includes(role.toLowerCase())) {
      showAlert('error', 'Invalid role. Please enter "farmer" or "user".');
      return;
    }

    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
        role
      },
      withCredentials: true
    });
    // console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'Account created successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export default signup;
