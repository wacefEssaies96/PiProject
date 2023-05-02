const Recipe = require("../../models/Recipe/recipe");
const User = require("../../models/Users/user");
const Meal = require("../../models/Meals/meal");

// Retrieve all Recipes from the database.
exports.findAllRecipes = (req, res) => {

    Recipe.find()
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Recipes."
    });
  });
  
};


// Find Validated Recipe 
exports.findValidatedRecipes = (req, res) => {
  
  Recipe.find({validated:true}).populate('user')
    .then(data => {
      if (data[0])
        res.send(data);
      else
        res.status(404).send({ message: "Not found validated Recipe "  });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving validated Recipe "+err  });
    });
};

// Find a single Recipe with an id
exports.findOneRecipe = (req, res) => {
  // Validate request
  if (!req.params.id) {
    res.status(400).send({ message: "Id of recipe is empty!" });
  }
  const id = req.params.id;
  Recipe.findById(id).populate('meals').populate('user')
    .then(data => {
      if (data)
        res.send(data);
      else
        res.status(404).send({ message: "Not found Recipe with id " + id });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipe with id=" + id });
    });
};


// Find a single Recipe of  User
exports.findMyRecipe = (req, res) => {
  // Validate request
  if (!req.params.userId) {
    res.status(400).send({ message: "User id is empty!" });
  }
  const userId = req.params.userId;
  Recipe.find({user:userId})
    .then(data => {
      if (data[0])
        res.send(data);
      else
        res.status(404).send({ message: "Not found Recipe for you " + userId });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipe of  User =" + userId +" err "+err});
    });
};

// Find validated recipe and My Recipes
exports.findValidated_MyRecipes = (req, res) => {
  // Validate request
  if (!req.params.userId) {
    res.status(400).send({ message: "User id is empty!" });
  }
  const userId = req.params.userId;
  Recipe.find({
    $or: [
      { user: userId },
      { user: { $ne :userId},validated: true }
    ]
    }).populate('user')
    .then(data => {
      if (data[0])
        res.send(data);
      else
        res.status(404).send({ message: "Not found Recipe for you " + userId });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipe of  User =" + userId +" err "+err});
    });
};
// Find a single Recipe with name
exports.findRecipeByName = (req, res) => {
  // Validate request
  if (!req.params.name) {
    res.status(400).send({ message: "Name of Recipe is empty!" });
  }
  const Name = req.params.name;
  Recipe.find({name:Name})
    .then(data => {
      if (data[0])
        res.send(data);
      else
        res.status(404).send({ message: "Not found Recipe with Name " + Name });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Recipe with Name =" + Name });
    });
};

exports.createRecipe = async (req, res) => {

  
  const mealList =[];
  
  var { name, validated, description, quantity, meals, user } = req.body;
  meals=meals.split(",")
  quantity=quantity.split(",")

  // Validate request
  if (!name ) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  var totalCalorie=0;

  for (let i = 0; i < meals.length; i++) {
    
    var existingMeal = undefined;
    
      try {
        existingMeal = await Meal.findOne({ _id: meals[i] });
      } catch (errm) {
        return res.status(500).send({ message: "Some error find meal." + errm });
      }

      mealList.push(existingMeal._id)
      totalCalorie=totalCalorie+(extractValue(existingMeal.calories_100g)*quantity[i])
  
  };

  
  try {
    
    var existingUser = undefined;
    try {
      existingUser = await User.findById( user );
    } catch (erru) {
      return res.status(500).send({ message: "Some error find user." + erru });
    }

    const existingRecipe = await Recipe.findOne({ name });

    if (existingRecipe) {
      return res.status(302).send({ message: "Recipe already exist with Name = " + name });
    }

    const recipe = new Recipe({
        name,
        validated,
        description,
        quantity,
        totalCalorie,
        imgRecipe: "/"+req.file.path.replace(/\\/g, '/'),
        meals: mealList,
        user : existingUser 
    });

    await recipe.save();
    

    return res.status(200).send({ message: "recipe created successfully." });
  } catch (err) {
    return res.status(500).send({ message: "Some error occurred while creating the recipe."+err });
  }
  
};


// Update a recipe by the id in the request
exports.updateRecipe =async (req, res) => {
  
  var mealList =[];
  var quantity =[];
  var meals =[];
  var totalCalorie=0;
  var recalculer=0;

  const id = req.params.id;
  const existingRecipe = await Recipe.findById( id );
  

  existingRecipe.quantity.forEach(elrq =>{
    quantity.push(elrq);
  })
  existingRecipe.meals.forEach(elr =>{
    meals.push(elr);
  })

  

  var recipe = req.body; 
  
  if(recipe.meals){  
    recipe.meals=recipe.meals.split(",")
    recalculer=1;
    meals=[];
    recipe.meals.forEach(el =>{
      meals.push(el);
    })
  }
  if(recipe.quantity){
    recipe.quantity=recipe.quantity.split(",")
    recalculer=1;
    quantity=[];
    recipe.quantity.forEach(elq =>{
      quantity.push(elq);
    })
  }

  if(recalculer==1){
    for (let i = 0; i < meals.length; i++) {
      var existingMeal1 = undefined
      existingMeal1 = await Meal.findOne({ _id: meals[i] });
    
      if (!existingMeal1) {
        return res.status(500).send({ message: "Error retrieving meal with id=" + meals[i] });
      } else {
        mealList.push(existingMeal1._id);
        totalCalorie += extractValue(existingMeal1.calories_100g) * quantity[i];
      }
    }
    // recipe = {
    //   "name":req.body.name,
    //   "validated":req.body.validated,
    //   "description":req.body.description,
    //   quantity,
    //   totalCalorie,
    //   // "imgRecipe":imgRecipe,
    //   meals: mealList
    // }
    recipe.quantity=quantity
    recipe.totalCalorie=totalCalorie
    recipe.meals=mealList
  }

  if (req.file)
    recipe.imgRecipe = "/"+req.file.path.replace(/\\/g, '/')
  else if(req.body.imgRecipe)
    recipe.imgRecipe =req.body.imgRecipe
    
  // return res.status(500).send({ message: "file "+JSON.stringify(recipe) });

  Recipe.findByIdAndUpdate(id, recipe, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`
        });
      } else res.send({ message: "Recipe was updated successfully."});
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id+" err "+err
      });
    });
    
};
function extractValue(string) {

    let match = string.match(/\d+\.?\d*/g);
    if(match)
        console.log(" extractValue : "+match)
    else
        console.log(" prob extractValue match  ")
    return match ? parseFloat(match[match.length-1]) : null;
  }
// Delete a Recipe with the specified id in the request
exports.deleteRecipe = (req, res) => {
  const id = req.params.id;

  Recipe.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
        });
      } else {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Recipe with id=" + id
      });
    });
};
