const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BodyShapesScrapedSchema = new Schema({
    description : {
        type: [Object]
    }, 
    image : {
        type: [Object]
    }
}, {
    timestamps: true,
});

const BodyShapesScraped = mongoose.model('BodyShapesScraped', BodyShapesScrapedSchema);

module.exports = BodyShapesScraped;