const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is requerid']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarImage: {
        type: String,
        default: 'https://res.cloudinary.com/journalappgetest/image/upload/v1645029949/ols6gj42tqfgorsfsm5m.png'
    },
    state: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = model('User', userSchema);