const express = require('express');
const { getAllReviews, addReview, getAllReviewsForAdmin, updateReviewStatus, getReviewById } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddlware');
const { isAdmin } = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', authMiddleware, getAllReviews);
router.post('/', authMiddleware, addReview);
router.get('/admin/:id',authMiddleware, isAdmin, getReviewById);

router.get('/admin',authMiddleware, isAdmin, getAllReviewsForAdmin);

router.put('/admin/:id',authMiddleware, isAdmin, updateReviewStatus);

module.exports = router;
