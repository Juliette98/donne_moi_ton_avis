const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    pubTitle: { type: String, required: true },
    pubRef: { type: String, required: false },
    pubDescription: { type: String, required: true },
    pubPrice: { type: Number, required: false },
    pubStore: { type: String, required: true },
    pubSize: { type: String, required: true },
    pubLink: { type: String, required: false },
});

module.exports = mongoose.model('publications', publicationSchema);