import { Router } from 'express';
import { companySignup } from '../../../controllers/Company/companyController.js';

const router = Router();

router.post('/company-signup', companySignup);

export default router;
