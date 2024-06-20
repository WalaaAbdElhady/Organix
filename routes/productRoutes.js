const express = require('express');
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('farmer'));

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productController.setUserId,
    productController.uploadProductPhoto,
    productController.resizeUserPhoto,
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    productController.uploadProductPhoto,
    productController.resizeUserPhoto,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

module.exports = router;
