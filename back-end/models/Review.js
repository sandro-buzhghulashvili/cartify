import { model, Schema } from 'mongoose';

const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    count: {
      type: Number,
      required: true,
    },
    average: {
      type: Number,
      required: true,
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  userDetails: {
    name: String,
    reviewedAt: Date,
    userLogo: String,
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model('Review', reviewSchema);
