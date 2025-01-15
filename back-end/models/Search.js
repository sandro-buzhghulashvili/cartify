import { Schema, model } from 'mongoose';

const searchSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  beingSearched: {
    type: Number,
    required: true,
  },
});

export default model('Search', searchSchema);
