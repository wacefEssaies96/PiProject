const mongoose = require('mongoose');
const TypeSportSchema = require('./typeSportSchema')

const Schema = mongoose.Schema;

const SportSchema = new Schema({
    sportType: {
        type: TypeSportSchema,
        required: true,
    },
    demoVideo: {
    type: String,
    required: true,
    },
    advantages: {
    type: String,
    required: true,
    },
    limits: {
    type: String,
    required: true,
    },
    slug: {
    type: String,
    required: true,
    },
}, {
    timestamps: true,
});

const Sport = mongoose.model('sport', SportSchema);

module.exports = Sport;