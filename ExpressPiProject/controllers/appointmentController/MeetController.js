const MeetModel = require("../../models/appointment/MeetModel")
const User = require("../../models/Users/user");

exports.create = async (req, res) => {
    let user = null
    //find user by id
    try {
        if(req.body.mode=="JOIN"){
            res.status(200).send({ message: " You can join" });
        }else if(req.body.mode=="CREATE"){
        
            MeetModel.find({code:req.body.code})
            .then( async data => {
                if (data[0])
                    res.status(500).send({ message: " Code exist" });
                else{

                    user = await User.findById(req.params.id);
                    if (!user) {
                        res.status(500).send({ message: " User not found" });
                    }
                    MeetModel.collection.dropIndex('user.email_1', (err, result) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(result);
                            }
                        });
                    var newMeet = new MeetModel({
                        code: req.body.code,
                        user: user
                    })

                    newMeet.save()
                    .then(data => res.send(data))
                    .catch(err => {
                        console.log({
                            message:
                                err.message || "Some error occurred while creating the Meet!"
                        });
                    });
                }
            })
            .catch(err => {
                res
                .status(500)
                .send({ message: " Problem create meet " + err });
            });
        }

    } catch (err) {
        console.log("Internal server error");
    }
}

//get all Meets 
exports.findAll = (req, res) => {
    MeetModel.find()
        .then(meets => res.json(meets))
        .catch(err => res.status(400).json('Error: ' + err));
}

//get all Meets of a single user by userId
exports.findAllByUser = (req, res) => {
    MeetModel.find({ "user._id": req.params.id })
        .then(meets => res.json(meets))
        .catch(err => res.status(400).json('Error: ' + err));
}

//delete a meet by id
exports.deleteMeet = async (req, res) => {
    MeetModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send('Meet deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err));
}