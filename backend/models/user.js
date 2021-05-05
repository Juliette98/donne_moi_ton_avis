const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    birthday: { type: String, required: true }
});

module.exports = mongoose.model('User', loginSchema);
