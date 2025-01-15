import { Router } from 'express';
const router = Router();

import {
  addSearch,
  getPopularSearches,
  searchProduct,
} from '../../controllers/Searches/Searches.js';

router.get('/popular-searches', getPopularSearches);
router.get('/search-product', searchProduct);
router.post('/add-search', addSearch);

export default router;
