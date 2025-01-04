import { Schema, model } from 'mongoose';

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  industryType: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  userRole: {
    type: String,
    default: 'client',
  },
  companyDetails: {
    type: Schema.Types.Mixed,
    default: null,
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
});

export default model('Company', companySchema);
