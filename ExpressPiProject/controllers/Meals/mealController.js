const meal = require("../../models/Meals/meal");

// Create and Save a new meal
exports.create = (req, res) => {
  // Validate request
  if (!req.body.FoodCategory) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a meal
  const m = new meal({
    FoodCategory: req.body.FoodCategory,
    FoodItem: req.body.FoodItem,
  });

  // Save meal in the database
  m
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the meal."
      });
    });
};

// Retrieve all meals from the database.
exports.findAll = (req, res) => {
    const FoodCategory = req.query.FoodCategory;
    var condition = FoodCategory ? { FoodCategory: { $regex: new RegExp(FoodCategory), $options: "i" } } : {};

    meal.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving meals."
    });
    });
  
};

// Find a single meal with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    meal.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found meal with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving meal with id=" + id });
      });
};

// Update a meal by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      meal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update meal with id=${id}. Maybe meal was not found!`
            });
          } else res.send({ message: "meal was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating meal with id=" + id
          });
        });
};

// Delete a meal with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    meal.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete meal with id=${id}. Maybe meal was not found!`
          });
        } else {
          res.send({
            message: "meal was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete meal with id=" + id
        });
      });
};

// Delete all meal from the database.
exports.deleteAll = (req, res) => {
    meal.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} meals were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all meals."
      });
    });
};