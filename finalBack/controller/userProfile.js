const User = require('../model/db');
const jwt = require('jsonwebtoken');

// Fetch User Profile
const getUserProfile = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, 'hello');
        const user = await User.findOne({ email: decoded.email }).select('username email');
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { username, email, currentPassword, newPassword } = req.body;

    // Validate input
    if (!username || !email || !currentPassword) {
        console.log('Validation failed. Missing fields.');
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, 'hello');
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the current password matches
        if (currentPassword !== user.password) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // If new password is provided, update it
        if (newPassword) {
            user.password = newPassword;
        }

        // Update username and email
        user.username = username || user.username;
        user.email = email || user.email;

        // Save the updated user information
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error in updateUserProfile:', error.message);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile
};
