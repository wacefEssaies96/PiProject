const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SportSubTypeScrapedTitlesSchema = new Schema({
    titlesScrapped : {
        type: Object
    }
}, {
    timestamps: true,
});

const SportSubTypeScrapedTitles = mongoose.model('SportSubTypeScrapedTitles', SportSubTypeScrapedTitlesSchema);

module.exports = SportSubTypeScrapedTitles;