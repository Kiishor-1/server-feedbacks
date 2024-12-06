const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginOrRegister = async (req, res) => {
    console.log('secret', process.env.JWT_SECRET);

    try {
        const { username, password, role } = req.body;

        let user = await User.findOne({ username });

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { username: user.username, id: user._id, role: user.role }, 
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };
                return res
                    .cookie('token', token, options)
                    .status(200)
                    .json({
                        success: true,
                        token,
                        user: { _id: user._id, username: user.username, role: user.role }, 
                        message: `User login successful`,
                    });
            } else {
                return res.status(401).json({
                    success: false,
                    error: `Password is incorrect`,
                });
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 16);

            const newUserRole = role === 'Admin' ? 'Admin' : 'User';

            user = await User.create({
                username,
                password: hashedPassword,
                role: newUserRole, 
            });

            const token = jwt.sign(
                { username: user.username, id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            return res
                .cookie('token', token, options)
                .status(201)
                .json({
                    success: true,
                    token,
                    user: { _id: user._id, username: user.username, role: user.role },
                    message: `User registered successfully`,
                });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: `Operation failed. Please try again.`,
        });
    }
};

