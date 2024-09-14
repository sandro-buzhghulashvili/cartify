import express from 'express';
import { signupClient } from '../../controllers/Client/clientController.js';
const router = express.Router();

router.post('/client-signup', signupClient);

export default router;
