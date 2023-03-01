var Mongoose= require('mongoose');
//const diseaseSchema= require('./diseasesSchema');
var  servicesschema= new Mongoose.Schema({
    category: {
        type: String,
        required: true
    },

    /*disease: {
        type:[diseaseSchema],
        required: true,
}*/}, {
    timestamps: true,
})

module.exports= servicesschema;