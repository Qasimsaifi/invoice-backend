const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password, fullName, businessName, address, GSTIN } = req.body;
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        user = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            fullName, 
            businessName, 
            address, 
            GSTIN 
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token with user information
        const token = jwt.sign({ 
            userId: user._id,
            email: user.email,
            fullName : user.fullName,
            businessName : user.businessName,
            address :  user.address,
            GSTIN :  user.GSTIN
        }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};
exports.getCurrentUser = async (req, res, next) => {
    try {
        // Extract the user information from the JWT token
        const user = req.user;
        
        // Respond with the current user information
        res.json(user);
    } catch (error) {
        next(error);
    }
};
