import { Schema, model } from 'mongoose';

const productTypeSchema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model('product_types', productTypeSchema);
