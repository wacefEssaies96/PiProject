const ProgressModel = require("../../models/Sports/ProgressSportVideoModel")
const User = require("../../models/Users/user");
const { google } = require('googleapis');

// actual API key
const apiKey = 'AIzaSyC8zRRDe5qseKnGUrfLI2b3lAafbllMFNg';

// Create a new instance of the YouTube Data API client
const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
});

// Function to convert the duration string (e.g. "PT5M23S") to seconds
function convertDurationToSeconds(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);

    return (hours * 3600) + (minutes * 60) + seconds;
}

exports.insertAndUpdateProgress = async (req, res) => {
    const { videoId, userId, progress } = req.body;
    let totalDuration = 0

    let user = null
    //find user by id
    try {
        user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    ProgressModel.find({ "user._id": req.params.userId })
        .then(progresses => {
            let totalprog = 0
            for (let index = 0; index < progresses.length; index++) {
                totalprog += progresses[index].progress
            }
            if (totalprog < 100) {
                // Call the videos.list method of the YouTube Data API to get the duration of the video
                youtube.videos.list(
                    {
                        part: 'contentDetails',
                        id: videoId,
                    },
                    (err, response) => {
                        if (err) {
                            console.log(`Error getting video details: ${err}`);
                            return;
                        }

                        // Extract the duration from the response
                        const duration = response.data.items[0].contentDetails.duration;

                        // Convert the duration to seconds
                        totalDuration = convertDurationToSeconds(duration);

                        console.log(`Total duration of the video: ${totalDuration} seconds`);

                        var newProgress = new ProgressModel({
                            user: user,
                            video: videoId,
                            progress: progress,
                            totalDuration: totalDuration
                        })

                        newProgress.save()
                            .then(data => res.send(data))
                            .catch(err => {
                                console.log({
                                    message:
                                        err.message || "Some error occurred while creating the Progress!"
                                });
                            });
                    }
                );
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

//get all Progress 
exports.findAll = (req, res) => {
    ProgressModel.find()
        .then(progresses => res.json(progresses))
        .catch(err => res.status(400).json('Error: ' + err));
}

//get all Progress of a single user by userId
exports.findAllByUser = (req, res) => {
    ProgressModel.find({ "user._id": req.params.userId })
        .then(progresses => res.json(progresses))
        .catch(err => res.status(400).json('Error: ' + err));
}

//update a progress 
exports.updateProgress = async (req, res) => {
    const { videoId, userId, progress } = req.body;

    let user = null
    //find user by id
    try {
        user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    // remove the unique constraint on the email attribute
    // ProgressModel.collection.dropIndex('user.email_1', (err, result) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log(result);
    //     }
    // });

    // find the progress record for the current user and video
    let progressRecord = await ProgressModel.findOne({
        'user._id': user._id,
        'video': videoId,
    });

    if (progressRecord) {
        // update the progress and total duration
        progressRecord.progress = progress;

        // save the progress record to the database
        try {
            await progressRecord.save();
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Could not update progress' });
        }
    }
}

//delete a progress by id
exports.deleteProgress = async (req, res) => {
    ProgressModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send('Progress deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err));
}