/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addToCart = async product => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/carts/add-to-cart',
      data: {
        product
      }
    });
    // console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'Product Added to Cart successfully!');
      window.setTimeout(() => {
        location.assign('/cart');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const removeFromCart = async product => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/carts/remove-from-cart',
      data: {
        product
      }
    });
    // console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', 'Product Removed From Cart successfully!');
      window.setTimeout(() => {
        location.assign('/cart');
      }, 1500);
    }
  } catch (err) {
    // console.log(err);
    showAlert('error', err.response.data.message);
  }
};
