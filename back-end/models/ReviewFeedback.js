import { Schema, model } from 'mongoose';

const reviewFeedbackSchema = new Schema({
  reviewId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Review',
  },
  userId: Schema.Types.ObjectId,
  feedback: {
    type: String,
    enum: ['like', 'dislike'],
    required: true,
  },
});

export default model('ReviewFeedback', reviewFeedbackSchema);
