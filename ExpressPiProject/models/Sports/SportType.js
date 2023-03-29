const mongoose = require('mongoose');
const SubTypeSportSchema = require('./SubTypeSportSchema')

const Schema = mongoose.Schema;

const SportTypeSchema = new Schema({
    title: {
        type: String,
    },
    sportSubType: {
        type: [SubTypeSportSchema],
    },
    advantages: {
        type: [String],
    },
    slug: {
        type: String,
    },
}, {
    timestamps: true,
});

const SportType = mongoose.model('sportType', SportTypeSchema);

module.exports = SportType;