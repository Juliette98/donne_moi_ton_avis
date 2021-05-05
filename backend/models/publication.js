const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    pubTitle: { type: String, required: true },
    pubDescription: { type: String, required: true },

});

module.exports = mongoose.model('publications', publicationSchema);
