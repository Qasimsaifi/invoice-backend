// Example of authentication service
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
    // Logic for user registration
};

const login = async (credentials) => {
    // Logic for user login
};

module.exports = { register, login };
