const Review = require('../models/Review');
const mongoose = require('mongoose')
const getAllReviewsForAdmin = async (req, res) => {
    try {
        const allReviews = await Review.find({}).populate('user', 'username');

        const totalReviews = allReviews.length;
        let totalRatingSum = 0;
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const categorizedReviews = {
            pending: [],
            approved: [],
            rejected: []
        };

        allReviews.forEach((review) => {
            const roundedRating = Math.round(review.rating);
            totalRatingSum += review.rating;

            if (ratingDistribution[roundedRating] !== undefined) {
                ratingDistribution[roundedRating]++;
            }

            if (categorizedReviews[review.status]) {
                categorizedReviews[review.status].push(review);
            }
        });

        const averageRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(2) : 0;

        const ratingPercentages = {};
        for (const rating in ratingDistribution) {
            ratingPercentages[rating] = totalReviews > 0 ? ((ratingDistribution[rating] / totalReviews) * 100).toFixed(2) : 0;
        }

        res.status(200).json({
            success: true,
            message: 'All reviews fetched successfully with metrics',
            reviews: categorizedReviews,
            metrics: {
                totalReviews,
                averageRating,
                ratingDistribution,
                ratingPercentages
            },
        });
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
        });
    }
};


const updateReviewStatus = async (req, res) => {
    try {
        const { reviewId, status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value',
            });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { status },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        res.status(200).json({
            success: true,
            message: `Review has been ${status}`,
            updatedReview,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating review status',
        });
    }
};


const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ status: 'approved' })
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        const totalReviews = reviews.length;
        let totalRatingSum = 0;
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        reviews.forEach((review) => {
            const roundedRating = Math.round(review.rating);
            totalRatingSum += review.rating;

            if (ratingDistribution[roundedRating] !== undefined) {
                ratingDistribution[roundedRating]++;
            }
        });

        const averageRating = totalReviews > 0 ? (totalRatingSum / totalReviews).toFixed(2) : 0;

        const ratingPercentages = {};
        for (const rating in ratingDistribution) {
            ratingPercentages[rating] = totalReviews > 0 ? ((ratingDistribution[rating] / totalReviews) * 100).toFixed(2) : 0;
        }
        res.status(200).json({
            success: true,
            message: 'Approved reviews fetched successfully with metrics',
            reviews,
            metrics: {
                totalReviews,
                averageRating,
                ratingDistribution,
                ratingPercentages
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
        });
    }
};



const addReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const userId = req.user._id;

        let newReview = await Review.create({ rating, review, user: userId });

        newReview = await newReview.populate('user', 'username');

        res.status(201).json({
            success: true,
            message: 'Review added',
            data: newReview,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error during adding review',
            success: false,
        });
    }
};

const getReviewById = async (req, res) => {
    console.log('Request reached');
    try {
        const { id } = req.params;

        if (!id || !mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or missing Review ID',
            });
        }

        const review = await Review.findById(id).populate('user', 'username');

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review fetched successfully',
            review,
        });
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the review',
        });
    }
};




module.exports = {
    getAllReviews,
    addReview,
    getAllReviewsForAdmin,
    updateReviewStatus,
    getReviewById
};
