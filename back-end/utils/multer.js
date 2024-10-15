import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinary/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg'],
    folder: 'uploads',
  },
});

const upload = multer({ storage });

export default upload;
