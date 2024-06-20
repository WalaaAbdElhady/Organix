/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateProduct = async (id, data) => {
  // console.log(id);
  // console.log(typeof id);
  try {
    const res = await axios({
      method: 'Patch',
      url: `http://localhost:3000/api/v1/products/${id}`,
      data
    });

    if (res.status === 200) {
      showAlert('success', 'Product updated  successfully!');
      window.setTimeout(() => {
        location.assign('/my-products');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

export const addProduct = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:3000/api/v1/products`,
      data
    });
    if (res.status === 201) {
      showAlert('success', 'Product added  successfully!');
      window.setTimeout(() => {
        location.assign('/my-products');
      }, 1500);
    }
  } catch (err) {
    // console.log(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

export const deleteProduct = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/v1/products/${id}`
    });
    if (res.status === 204) {
      showAlert('success', 'Product deleted  successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};
