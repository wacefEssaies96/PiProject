
const fs = require('fs');
const path = require('path');

exports.Verif = (req, res) => {
    const url = req.query.url;
    const imagePath = path.join( process.cwd(), url);

    if (fs.existsSync(imagePath)) {
    console.log('Image exists!');
    res.status(200).send({message:true});
    // res.status(200).send(true);

    } else {
    console.log('Image does not exist!');
    res.status(200).send({message:false});
    // res.status(200).send(false);

    }
};