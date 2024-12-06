const calculateAverage = (reviews) => {
    if (reviews.length === 0) return 0;

    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRatings / reviews.length).toFixed(2);
};

module.exports = calculateAverage;
