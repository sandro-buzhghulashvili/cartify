import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    product_type: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    types: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.every((url) => /^https?:\/\//.test(url)),
        message: 'Each image must be a valid URL.',
      },
    },
    companyDetails: {
      type: Schema.Types.Mixed,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'active',
    },
    discount: {
      type: Schema.Types.Mixed,
      default: 0,
    },
    sells: {
      type: Number,
      default: 0,
    },
    rating: {
      type: {
        total: {
          type: Number,
          default: 0,
        },
        average: {
          type: Number,
          default: 0,
        },
      },
      default: 0,
    },
  },
  { timestamps: true }
);

export default model('Product', productSchema);
