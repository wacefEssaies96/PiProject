const User = require("../../models/Users/user");

// Retrieve all users from the database.
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  }
};

// Create and Save a new user
exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(422).send({
        message: "User already exists with email " + req.body.email
      });
    }

    const newUser = new User({
      fullname : req.body.fullname,
      email : req.body.email,
      password : req.body.password,
      role : req.body.role,
      gender : req.body.gender,
      phone : req.body.phone,
      address : req.body.address,
      height : req.body.height,
      weight : req.body.weight,
      disease : req.body.disease,
      image: req.file.path,
      account_Verified:req.body.account_Verified,
      speciality:req.body.speciality,
    });

    const savedUser = await newUser.save();

    res.status(200).send(savedUser);
  } catch (err) {
    res.status(500).send({
      message:
         "Some error occurred while creating the user."
    });
  }
};


// Find a single user with an Email
exports.findUserByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({ message: "Not found user with email " + email });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving user with email=" + email });
  }
};

// Find a single user with an id
exports.findUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

// Update a user by the id in the request
exports.updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  const email = req.body.email;

  const SameUser = await User.findOne({ _id: id, email: email });
  const existingUser = await User.findOne({ email: req.body.email });

  if(SameUser || (!existingUser) ){
    try {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
      if (updatedUser) {
        return res.send({ message: "User was updated successfully." });
      }
      res.status(404).send({
        message: `Cannot update user with id=${id}. Maybe user was not found!`
      });
    } catch (err) {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    }
  }else{
    res.status(422).send({
      message: `Email Exist ${email} !`
    });
  }
};

// Delete a user with the specified id in the request
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send({
        message: `Cannot delete user with id=${id}. Maybe user was not found!`
      });
    } else {
      res.send({
        message: "User deleted successfully!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete user with id=" + id
    });
  }
};



