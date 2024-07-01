const catchAsync = require('./../utils/catchAsync');
const Product = require('./../models/productModel');
const Cart = require('./../models/cartModel');
//const User = require('./../models/userModel');
//const AppError = require('./../utils/appError');

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render('home', {
    pageClass: 'home-page'
  });
});

exports.getShop = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).render('shop', {
    title: 'Shop',
    pageClass: 'shop-page',
    products
  });
});

exports.getSignupForm = async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Create New account'
  });
};

exports.getLoginForm = async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getForgetPass = async (req, res, next) => {
  res.status(200).render('forgetPass', {
    title: 'Forget Password'
  });
};

exports.getResetPass = async (req, res, next) => {
  res.status(200).render('resetPass', {
    title: 'Reset Password'
  });
};

exports.getSetNewPass = async (req, res, next) => {
  res.status(200).render('setNewPass', {
    title: 'Set New Password'
  });
};

exports.getAccount = async (req, res, next) => {
  res.status(200).render('profile', {
    title: 'My Profile',
    pageClass: 'profile-page'
  });
};

exports.getDashboard = catchAsync(async (req, res, next) => {
  res.status(200).render('dashboard');
});

exports.getProducts = async (req, res, next) => {
  //console.log(res.locals.user.id);
  const products = await Product.find({ farmer: res.locals.user.id });
  res.status(200).render('products', {
    title: 'My Products',
    pageClass: 'products-page',
    products
  });
};

exports.getCart = catchAsync(async (req, res, next) => {
  const myCart = await Cart.find({ user: res.locals.user.id }).populate(
    'products.product'
  );
  let totalPrice = 0;
  if (myCart && myCart.length > 0) {
    myCart.forEach(function(cartItem) {
      cartItem.products.forEach(function(product) {
        totalPrice += product.product.price * product.quantity;
      });
    });
  }
  //console.log(total);
  res.status(200).render('cart', {
    title: 'My Cart',
    pageClass: 'cart-page',
    myCart,
    totalPrice
  });
});

exports.addToCart = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).render('addCart', {
    tiltle: 'Add To Cart',
    product
  });
});

exports.getAddProduct = catchAsync(async (req, res, next) => {
  res.status(200).render('addProduct');
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
    new: true,
    runValidators: true
  });

  res.status(200).render('updateProduct', {
    title: `update ${updatedProduct.name}`,
    updatedProduct
  });
});
