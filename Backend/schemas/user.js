const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    current_class: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    board: {
        type: String,
        required: true
    },
    subjects: {
        type: Array,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;