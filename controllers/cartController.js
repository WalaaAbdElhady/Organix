const Cart = require('./../models/cartModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  //console.log('Id is :', req.user);
  next();
};

exports.addToCart = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  const product = req.body.product;
  // eslint-disable-next-line prefer-destructuring
  let quantity = req.body.quantity;
  const userId = req.user._id;
  //console.log(product, quantity);
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      products: []
    });
  }
  // Check if the product already exists in the cart
  const productInCart = cart.products.find(
    item => item.product.toString() === product.toString()
  );
  if (!quantity) quantity = 1;
  console.log(quantity);
  if (productInCart) {
    // eslint-disable-next-line radix
    productInCart.quantity += parseInt(quantity);
  } else {
    cart.products.push({
      product: product,
      // eslint-disable-next-line radix
      quantity: parseInt(quantity)
    });
  }

  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart
    }
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { product } = req.body;
  const userId = req.user._id;

  // Find the user's cart
  const cart = await Cart.findOne({ user: userId });

  // Check if the cart exists
  if (!cart) {
    return next(new AppError('No cart found for this user', 404));
  }

  // Check if the product exists in the cart
  const productIndex = cart.products.findIndex(
    item => item.product.toString() === product.toString()
  );

  if (productIndex === -1) {
    return next(new AppError('Product not found in cart', 404));
  }

  // Remove the product from the cart
  cart.products.splice(productIndex, 1);

  // Save the updated cart
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Product removed from Cart Successfully!'
  });
});

exports.getAllcarts = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();

  res.status(200).json({
    status: 'success',
    results: carts.length,
    data: {
      carts
    }
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  let userId;
  if (!req.params.id) userId = req.user._id;
  else userId = req.params.id;
  const cart = await Cart.findOne({ user: userId }).populate(
    'products.product'
  );
  if (!cart) {
    return next(new AppError('No cart found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      cart
    }
  });
});

exports.createCart = catchAsync(async (req, res, next) => {
  //console.log(req.user.id);
  const newCart = await Cart.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      cart: newCart
    }
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new AppError('No cart found with that ID', 404));
  }

  const { productId, quantity } = req.body;

  // Find the product in the cart and update its quantity
  const productToUpdate = cart.products.find(
    product => product.product.toString() === productId
  );
  if (productToUpdate) {
    productToUpdate.quantity = quantity;
  } else {
    return next(new AppError('Product not found in cart', 404));
  }

  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart
    }
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new AppError('No Cart found with that ID', 404));
  }

  await Cart.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
