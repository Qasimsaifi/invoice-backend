const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
    },
    invoiceDate: {
      type: String,
      required: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
