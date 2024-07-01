/* eslint-disable */
import '@babel/polyfill';
import { showAlert } from './alerts';
import { login, logout } from './login';
import signup from './signup';
import { forgetPass, updatePass, updateProfile, setNewPass } from './account';
import { deleteProduct, updateProduct, addProduct } from './product';
import { addToCart, removeFromCart } from './cart';

// DOM ELEMENTS
const signupForm = document.getElementById('Sign-up-form');
const loginForm = document.getElementById('login-form');
const logOut = document.querySelectorAll('#logoutLink');
const updateProductForm = document.getElementById('update-form');
const addProductForm = document.getElementById('add-form');
const deleteProductButtons = document.querySelectorAll('.btn.red.btn-small');
const forgetPassForm = document.getElementById('forgetPass-form');
const setNewPassForm = document.getElementById('setNewPass-form');
const updatePassForm = document.querySelector('.password-form');
const updateProfileForm = document.querySelector('.profile-form');
const codeForm = document.getElementById('passReset-form');
const addToCartBtn = document.querySelector('.btn-addToCart');
const removeFromCartBtns = document.querySelectorAll('.btn.red.remove-cart');
const bookBtns = document.querySelectorAll('.btn.green.book-cart');

if (codeForm) {
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', e => {
      //e.preventDefault();
      localStorage.setItem('resetCode', document.getElementById('code').value);
      //console.log('Entered code:', code);
    });
  }
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirmpassword').value;
    const role = document.getElementById('role').value;
    signup(username, email, password, passwordConfirm, role);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    login(email, password, rememberMe);
  });
}

if (forgetPassForm) {
  // console.log(forgetPassForm);
  forgetPassForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgetPass(email);
  });
}

if (setNewPassForm) {
  // console.log(setNewPassForm);
  setNewPassForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirmpassword').value;
    const code = localStorage.getItem('resetCode');
    // console.log(code, password, passwordConfirm);
    setNewPass(password, passwordConfirm, code);
  });
}

if (updatePassForm) {
  // console.log(updatePassForm);
  updatePassForm.addEventListener('submit', e => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('currentPassword').value;
    const password = document.getElementById('newPassword').value;
    const passwordConfirm = document.getElementById('confirmPassword').value;
    updatePass(passwordCurrent, password, passwordConfirm);
  });
}

if (updateProfileForm) {
  updateProfileForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateProfile(form);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  //console.log(logOut);
  logOut.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      logout();
    });
  });
});

if (updateProductForm) {
  updateProductForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('price', document.getElementById('price').value);
    form.append('quantity', document.getElementById('quantity').value);
    form.append('photo', document.getElementById('photo').files[0]);
    const productId = document.getElementById('productId').value;

    updateProduct(productId, form);
  });
}

if (addProductForm) {
  //console.log(addProductForm);
  addProductForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('price', document.getElementById('price').value);
    form.append('quantity', document.getElementById('quantity').value);
    form.append('photo', document.getElementById('photo').files[0]);
    form.append(
      'farmer',
      document.querySelector('.btn.btn-add').dataset.userId
    );
    addProduct(form);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  deleteProductButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = button.dataset.productId;
      deleteProduct(productId);
    });
  });
});

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', e => {
    e.preventDefault();
    var product = getIdFromUrl(window.location.href);
    addToCart(product);
  });
}

// Function to extract productId from URL path
function getIdFromUrl(url) {
  var regex = /\/addCart\/([^\/]+)/;
  var match = regex.exec(url);
  if (match && match.length > 1) {
    return match[1];
  } else {
    return null;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  //console.log(removeFromCartBtns);
  removeFromCartBtns.forEach(button => {
    button.addEventListener('click', function() {
      const productId = button.dataset.productId;
      console.log(productId);
      removeFromCart(productId);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  //console.log(bookBtns);
  bookBtns.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      showAlert(
        'success',
        'Please contact the number (0104523398) to confirm the reservation.!'
      );
    });
  });
});
