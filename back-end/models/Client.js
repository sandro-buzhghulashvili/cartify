import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
