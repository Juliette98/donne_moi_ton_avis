const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    pubTitle: { type: String, required: true },
    pubRef: { type: String, required: true },
    pubDescription: { type: String, required: true },
    pubPrice: { type: Number, required: true },
    pubStore: { type: String, required: true },
    pubLink: { type: String, required: true },
});

module.exports = mongoose.model('publications', publicationSchema);
