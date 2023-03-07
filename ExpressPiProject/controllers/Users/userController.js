const User = require("../../models/Users/user");

// Retrieve all users from the database.
exports.findAllUsers = (req, res) => {
  User.find()
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

// Create and Save a new user
exports.createUser = (req, res) => {

  // Validate request
  // if (!req.params.fullname || !req.params.email|| !req.params.password|| !req.params.role) {
  //   res.status(400).send({ message: "User field must be provided !" });
  // }
  
  User.find({ email: req.body.email })
    .then(data => {
      if (data[0]) {
        res.status(422).send({
          message: "User already exist with email "+req.body.email
        }); 
      } else {
        // Create a user
        const u = new User({
          fullname : req.body.fullname,
          email : req.body.email,
          password : req.body.password,
          role : req.body.role,
          gender : req.body.gender,
          height : req.body.height,
          weight : req.body.weight,
          phone : req.body.phone,
          address : req.body.address,
          disease : req.body.disease,
        });
        // Save user in the database
        u.save()
          .then(data1 => {
            res.status(200).send(data1);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
          });
      }
    })
    .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


// Find a single user with an Email
exports.findUserByEmail = (req, res) => {
    const email = req.params.email;

    User.find({email: email})
      .then(data => {
        if (!data[0])
          res.status(404).send({ message: "Not found user with email " + email });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with email=" + email });
      });
};

// Find a single user with an id
exports.findUserById = (req, res) => {
    const id = req.params.id;

    User.findById(id)
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
exports.updateUser = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }  
    const id = req.params.id;
    User.find({ email: req.body.email })
    .then(data => {
      if (data[0]) {
        res.status(422).send({
          message: "User already exist with email "+req.body.email
        }); 
      } else {
        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (data) {
            res.send({ message: "user was updated successfully." });
          } else {
            res.status(404).send({
              message: `Cannot update user with id=${id}. Maybe user was not found!`
            });
          }
        }).catch(err => {
          res.status(500).send({
            message: "Error updating user with id=" + id
          });
        });
      }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error finding user with id=" + id
        });
      });
};

// Delete a user with the specified id in the request
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
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
          message: "Could not delete user with id=" + id
        });
      });
};
