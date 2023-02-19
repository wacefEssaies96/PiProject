const user = require("../../models/Users/user");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.password || !req.body.email) {
    res.status(400).send({ message: "email and password can not be empty!" });
    return;
  }

  // Create a user
  const u = new user({
    fullname : req.body.fullname,
    email : req.body.email,
    password : req.body.password,
    role : req.body.role,
    height : req.body.height,
    weight : req.body.weight,
  });

  // Save user in the database
  u.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    user.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving users."
    });
    });
  
};

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    user.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id=" + id });
      });
};

// Update a user by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      user.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update user with id=${id}. Maybe user was not found!`
            });
          } else res.send({ message: "user was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating user with id=" + id
          });
        });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    user.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
          });
        } else {
          res.send({
            message: " user deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not user with id=" + id
        });
      });
};
