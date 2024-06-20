const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required']
    },
    photo: {
      type: String,
      required: [true, 'A Product must have an image']
    },
    price: {
      type: Number,
      required: [true, 'Price is Required']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is Required']
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Farmer is Required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
