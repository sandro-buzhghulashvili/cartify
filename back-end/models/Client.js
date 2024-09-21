import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
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
  },
  { timestamps: true } // by that we get createdAt and updatedAt props into document
);

const Client = mongoose.model('Client', clientSchema);

export default Client;
