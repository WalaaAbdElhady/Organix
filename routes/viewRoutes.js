const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/signup', viewsController.getSignupForm);

router.use(authController.isLoggedIn);

router.get('/', viewsController.getHome);
router.get('/shop', viewsController.getShop);
router.get('/login', viewsController.getLoginForm);

router.get('/cart', viewsController.getCart);
router.get('/addCart/:id', viewsController.addToCart);

router.get('/my-products', viewsController.getProducts);
router.get('/profile', viewsController.getAccount);
router.get('/dashboard', viewsController.getDashboard);
router.get('/updateProduct/:id', viewsController.updateProduct);
router.get('/addProduct', viewsController.getAddProduct);
router.get('/forgetPass', viewsController.getForgetPass);
router.get('/resetPass', viewsController.getResetPass);
router.get('/setNewPass', viewsController.getSetNewPass);

module.exports = router;
