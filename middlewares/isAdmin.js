module.exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied! Only admins can perform this action.',
        });
    }
    next();
};