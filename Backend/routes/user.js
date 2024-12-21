const express = require('express')
const User = require('../schemas/user')
const router = express.Router()


router.post('/getStandard', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email }); // Find user by email
        if (user) {
            const currentClass = user.current_class;
            return res.json({ success: true, currentClass });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;