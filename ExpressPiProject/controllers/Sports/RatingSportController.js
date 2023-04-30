const RatingModel = require("../../models/Sports/RatingSportModel")
const SportSubTypeModel = require("../../models/Sports/SubTypeSportModel");
const User = require("../../models/Users/user");

// Create and Save a new SportSubType
exports.create = async (req, res) => {

    const { userId, sportSutTypeTitle } = req.params
    let user = null
    let sport = null

    // Validate request
    if (!req.body.rating || !userId || !sportSutTypeTitle) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //find user by id
    try {
        user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    //find sportsubtype by title
    try {
        sport = await SportSubTypeModel.find({ title: sportSutTypeTitle });
        if (!sport) {
            console.log("sportsubtype not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    // Create a Rating
    var newRating = new RatingModel({
        sportSubType: sport[0],
        user: user,
        rating: req.body.rating
    })

    // get a list of all the indexes on the Rating collection
    // RatingModel.collection.listIndexes().toArray((err, indexes) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log(indexes);
    //     }
    // });

    // remove the unique constraint on the email attribute
    // RatingModel.collection.dropIndex('user.email_1', (err, result) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log(result);
    //     }
    // });

    newRating.save()
        .then(data => console.log(data))
        .catch(err => {
            console.log({
                message:
                    err.message || "Some error occurred while creating the Rating!"
            });
        });

    //get all rates
    RatingModel.find({ "sportSubType.title": sportSutTypeTitle })
        .then((ratings) => {
            let total = newRating.rating
            let nbr = ratings.length
            for (let index = 0; index < nbr; index++) {
                total += ratings[index].rating
            }
            let average = 0
            if (nbr) {
                average = total / (nbr + 1)
            }

            console.log(nbr);
            console.log(total);
            console.log(average);
            // update sportsubtype
            try {
                const newSportSubType = sport[0];
                if (average === 0) {
                    newSportSubType.averageRating = newRating.rating
                } else {
                    newSportSubType.averageRating = average
                }

                // Update the SportSubType in the database
                SportSubTypeModel.findByIdAndUpdate(sport[0]._id, newSportSubType, { new: true })
                    .then(sport => res.json({ "newRate": newRating, "updatedSportSubType": sport }))
                    .catch(err => console.log(err))

            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to update SportSubType' });
            }
        })
};

//get all SportSubTypes 
exports.findAll = (req, res) => {
    RatingModel.find()
        .then(ratings => res.json(ratings))
        .catch(err => res.status(400).json('Error: ' + err));
}

//get Rating by id
exports.findRateById = (req, res) => {
    RatingModel.findById(req.params.id)
        .then(rate => res.json(rate))
        .catch(err => res.status(400).json('Error: ' + err));
}

// //delete a SportSubType by id
exports.deleteRate = async (req, res) => {
    RatingModel.findByIdAndDelete(req.params.id)
        .then(async () => {
            res.json('rate deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

// //update a SportSubType
exports.updateRate = async (req, res) => {

    const { userId, sportSutTypeTitle } = req.params
    let user = null
    let sport = null

    // Validate request
    if (!req.body.rating || !userId || !sportSutTypeTitle) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //find user by id
    try {
        user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    //find sportsubtype by title
    try {
        sport = await SportSubTypeModel.find({ title: sportSutTypeTitle });
        if (!sport) {
            console.log("sportsubtype not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    RatingModel.findById(req.params.id)
        .then(async (rate) => {
            rate.sportSubType = sport[0];
            rate.user = user;
            rate.rating = req.body.rating;

            rate.save()
                .then(() => console.log('rate type updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

            //get all rates
            RatingModel.find({ "sportSubType.title": sportSutTypeTitle })
                .then((ratings) => {
                    let total = rate.rating
                    let nbr = ratings.length
                    for (let index = 0; index < nbr; index++) {
                        total += ratings[index].rating
                    }
                    let average = 0
                    if (nbr) {
                        average = total / (nbr + 1)
                    }

                    console.log(nbr);
                    console.log(total);
                    console.log(average);
                    // update sportsubtype
                    try {
                        const newSportSubType = sport[0];
                        if (average === 0) {
                            newSportSubType.averageRating = rate.rating
                        } else {
                            newSportSubType.averageRating = average
                        }

                        // Update the SportSubType in the database
                        SportSubTypeModel.findByIdAndUpdate(sport[0]._id, newSportSubType, { new: true })
                            .then(sport => res.json({ "newRate": rate, "updatedSportSubType": sport }))
                            .catch(err => console.log(err))

                    } catch (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Failed to update SportSubType' });
                    }
                })
        })
        .catch(err => res.status(400).json('Error: ' + err));
}