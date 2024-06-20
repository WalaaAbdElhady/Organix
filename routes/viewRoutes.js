const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/signup', viewsController.getSignupForm);

router.use(authController.isLoggedIn);

router.get('/', viewsController.getHome);
router.get('/shop', viewsController.getShop);
router.get('/login', viewsController.getLoginForm);

router.get('/cart', authController.restrictTo('user'), viewsController.getCart);
router.get(
  '/addCart/:id',
  authController.restrictTo('user'),
  viewsController.addToCart
);

router.get(
  '/my-products',
  authController.restrictTo('farmer'),
  viewsController.getProducts
);
router.get(
  '/profile',
  authController.restrictTo('farmer', 'user'),
  viewsController.getAccount
);
router.get(
  '/dashboard',
  authController.restrictTo('admin'),
  viewsController.getDashboard
);
router.get(
  '/updateProduct/:id',
  authController.restrictTo('farmer'),
  viewsController.updateProduct
);
router.get(
  '/addProduct',
  authController.restrictTo('farmer'),
  viewsController.getAddProduct
);
router.get('/forgetPass', viewsController.getForgetPass);
router.get('/resetPass', viewsController.getResetPass);
router.get('/setNewPass', viewsController.getSetNewPass);

module.exports = router;
