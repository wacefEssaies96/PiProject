const mongoose = require('mongoose');
const SubTypeSportSchema = require('./SubTypeSportSchema')

const Schema = mongoose.Schema;

const SportTypeSchema = new Schema({
    title : {
        type: String,
        // required:true,
    },
    sportSubType: {
        type: [SubTypeSportSchema],
        // required: true,
    },
    slug: {
    type: String,
    // required: true,
    },
}, {
    timestamps: true,
});

const SportType = mongoose.model('sportType', SportTypeSchema);

module.exports = SportType;