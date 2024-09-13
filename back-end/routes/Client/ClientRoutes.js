import express from 'express';
const router = express.Router();

router.get('/client-signup', (req, res) => {
  res.send('tested');
});

export default router;
