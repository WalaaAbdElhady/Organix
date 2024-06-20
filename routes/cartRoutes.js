const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post(
  '/add-to-cart',
  authController.restrictTo('user'),
  cartController.addToCart
);

router.post(
  '/remove-from-cart',
  authController.restrictTo('user'),
  cartController.removeFromCart
);

// router.post(
//   '/book-cart',
//   authController.restrictTo('user'),
//   cartController.bookCart
// );
router.get(
  '/my-cart',
  authController.restrictTo('user'),
  cartController.getCart
);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(cartController.getAllcarts)
  .post(cartController.createCart);

router
  .route('/:id')
  .get(cartController.getCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

module.exports = router;
