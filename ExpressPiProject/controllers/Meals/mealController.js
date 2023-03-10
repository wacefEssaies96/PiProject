const Meal = require("../../models/Meals/meal");
const User = require("../../models/Users/user");

// Retrieve all meals from the database.
exports.findAllMeals = (req, res) => {

  Meal.find()
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving meals."
    });
  });
  
};

// Find a single meal with an id
exports.findOneMeal = (req, res) => {
  // Validate request
  if (!req.params.id) {
    res.status(400).send({ message: "Id of meal is empty!" });
  }
  const id = req.params.id;
  Meal.findById(id)
    .then(data => {
      if (data)
        res.send(data);
      else
        res.status(404).send({ message: "Not found meal with id " + id });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving meal with id=" + id });
    });
};

// Find a Category and meals 
exports.findMealsOfCategory = (req, res) => {
  // Validate request
  if (!req.params.cat) {
    res.status(400).send({ message: "FoodCategory (cat) of meal is empty!" });
  }
  const FoodCategory = req.params.cat;
  Meal.find({FoodCategory:FoodCategory})
    .then(data => {
      if (data[0])
        res.send(data);
      else
        res.status(404).send({ message: "Not found meal with FoodCategory  " + FoodCategory });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving meal with FoodCategory =" + FoodCategory });
    });
};

// Find a single meal with an id
exports.findMealByName = (req, res) => {
  // Validate request
  if (!req.params.food) {
    res.status(400).send({ message: "FoodItem (food) of meal is empty!" });
  }
  const FoodItem = req.params.food;
  Meal.find({FoodItem:FoodItem})
    .then(data => {
      if (data[0])
        res.send(data);
      else
        res.status(404).send({ message: "Not found meal with FoodItem " + FoodItem });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving meal with FoodItem =" + FoodItem });
    });
};

// Create and Save a new meal
exports.createMeal = (req1, res) => {

  const FoodItem = req1.body.FoodItem;
  
  // Validate request
  if (!req1.body.FoodItem || !req1.body.FoodCategory) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  Meal.find({FoodItem: FoodItem})
    .then(dataFood => {
      if (dataFood[0]){
        res.status(200).send({ message: " Meals already exist with FoodItem = " + req1.body.FoodItem });
      }else{
        const id =req1.body.userId;
        User.findById(id).then( dataUser => {
          if (!dataUser)
            res.status(404).send({ message: "Not found user with id " + id });
          else {
            const u = dataUser;
            
            // Créer un nouveau produit
            const m = new Meal({
              FoodCategory: req1.body.FoodCategory,
              FoodItem: req1.body.FoodItem,
              serving_size_100g : req1.body.serving_size_100g,
              calories_100g  : req1.body.calories_100g,
              serving_size_portion : req1.body.serving_size_portion, 
              calories_portion  : req1.body.calories_portion,
              serving_size_oz  : req1.body.serving_size_oz,
              calories_oz    : req1.body.calories_oz
            });
            
            m.save()
            .then(data => {
              u.meals.push(m["_id"]);
              u.save();
              res.status(200).send({"user" : u," m ":data});
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the meal."
              });
            });
              
          }
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: "Error retrieving user with id=" + id });
        });
      

      } 

    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error create meals with FoodItem = " + req1.body.FoodItem });
    });
};

// Update a meal by the id in the request
exports.updateMeal = (req, res) => {
  
    
  const id = req.params.id;

  Meal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
exports.deleteMeal = (req, res) => {
  const id = req.params.id;

  Meal.findByIdAndRemove(id)
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