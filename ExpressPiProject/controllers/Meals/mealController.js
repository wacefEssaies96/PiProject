const Meal = require("../../models/Meals/meal");
const User = require("../../models/Users/user");
const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');

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
// Find validated Meals
exports.findValidatedMeals = (req, res) => {

  Meal.find({validated:true})
    .then(data => {
      if (data[0])
        res.status(200).send(data);
      else
        res.status(404).send({ message: "No meal is validated " });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving  validated meal " });
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

// Find a single meal with name
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

exports.CreateScapedMeal = async (req, res) => {
  
  const { FoodItem, FoodCategory, serving_size_100g, calories_100g, serving_size_portion, calories_portion, serving_size_oz, calories_oz,validated,imgMeal } = req.body;

  
  if (!FoodItem || !FoodCategory) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  try {

    const existingMeal = await Meal.findOne({ FoodItem });

    if (existingMeal) {
      return res.status(302).send({ message: "Meals already exist with FoodItem = " + FoodItem });
    }

    const meal = new Meal({
      FoodCategory,
      FoodItem,
      serving_size_100g,
      calories_100g,
      serving_size_portion,
      calories_portion,
      serving_size_oz,
      calories_oz,
      validated,
      imgMeal,
      // rate,
      });

    await meal.save();

    return res.status(200).send({ message: "Meal from Scraped data created successfully." });
  } catch (err) {
    return res.status(500).send({ message: "Some error occurred while creating the meal."+err });
  }
  
};

exports.createMeal = async (req, res) => {
  
  const { FoodItem, FoodCategory, serving_size_100g, calories_100g, serving_size_portion, calories_portion, serving_size_oz, calories_oz,validated,rate } = req.body;
  var rateList =[];
  
  // Validate request
  if (!FoodItem || !FoodCategory) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  try {
    // const existingUser = await User.findOne({ _id: userId });

    // if (!existingUser) {
    //   return res.status(500).send({ message: "Error retrieving user with id=" + userId });
    // }

    const existingMeal = await Meal.findOne({ FoodItem });

    if (existingMeal) {
      return res.status(302).send({ message: "Meals already exist with FoodItem = " + FoodItem });
    }
    var existingUser = undefined;
    try {
      existingUser = await User.findById( rate.user );
    } catch (erru) {
      return res.status(500).send({ message: "Some error find user." + erru });
    }

    

    rateList.push({userRate:existingUser,rate:rate.rate})

    const meal = new Meal({
      FoodCategory,
      FoodItem,
      serving_size_100g,
      calories_100g,
      serving_size_portion,
      calories_portion,
      serving_size_oz,
      calories_oz,
      validated,
      imgMeal: "/"+req.file.path.replace(/\\/g, '/'),
      rate:rateList,
      // ,
      // user : existingUser
    });

    await meal.save();

    // existingUser.meals.push(meal._id);
    // await existingUser.save();

    return res.status(200).send({ message: "Meal created successfully." });
  } catch (err) {
    return res.status(500).send({ message: "Some error occurred while creating the meal."+err });
  }
};

// Update a meal by the id in the request
// exports.RateMeal = async (req, res) => {
  
    
//   const id = req.params.id;
//   var meal = null;
//   existingMeal = await Meal.findOne({ _id: id });

  

//   if(req.body.newRate && existingMeal){
//     meal = existingMeal;

//     var rateList =[];

//     for (let i = 0; i < existingMeal.rate; i++) {
//       rateList.push(existingMeal.rate[i]);
//     }

//     var newRate= req.body.newRate
//     var pos =-1;
//     for (let i = 0; i < existingMeal.rate.length; i++) {
//       if(existingMeal.rate[i].userRate == newRate.userRate){
//         pos = i;
//       }
//     }
//     if(pos != -1){
//       rateList[pos]={userRate:newRate.userRate,rate:newRate.rate};
//     }else{
//       rateList.push({userRate:newRate.userRate,rate:newRate.rate})
//     }
//     meal.rate=rateList;
    
//   }else{
//     res.status(500).send({
//       message: "You can't rate"
//     });
//   }

//   // res.status(500).send({
//   //   message: "Meal" + meal
//   // });
//   Meal.findByIdAndUpdate(id, meal, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update meal with id=${id}. Maybe meal was not found!`
//         });
//       } else res.send({ message: "meal was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating meal with id=" + id
//       });
//     });
// };

// Update a meal by the id in the request
exports.updateMeal = async (req, res) => {
  
    
  const id = req.params.id;

  var meal = null;
  existingMeal = await Meal.findOne({ _id: id });

  

  if(req.body.newRate){
    meal = existingMeal;

    var rateList =[];

    for (let i = 0; i < existingMeal.rate.length; i++) {
      rateList.push(existingMeal.rate[i]);
    }

    var newRate= req.body.newRate
    var pos =-1;
    for (let i = 0; i < existingMeal.rate.length; i++) {
      if(existingMeal.rate[i].userRate == newRate.userRate){
        pos = i;
      }
    }
    if(pos != -1){
      rateList[pos]={userRate:newRate.userRate,rate:newRate.rate};
    }else{
      rateList.push({userRate:newRate.userRate,rate:newRate.rate})
    }
    meal.rate=rateList;
    
  }else{
    meal = req.body;
    if (req.file)
      meal.imgMeal = "/"+req.file.path.replace(/\\/g, '/')
    else if(req.body.imgMeal)
      meal.imgMeal =req.body.imgMeal
  }

  // res.status(500).send({
  //   message: "Meal" + meal
  // });
  Meal.findByIdAndUpdate(id, meal, { useFindAndModify: false })
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


exports.scrapCategoryMeals =  (req, res) => {
  const url = 'https://www.calories.info/';


  axios(url)
  .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const resultslinks = $('#menu-calorie-tables');
      const links = [];
      resultslinks.find('a').each((i, link) => {
      const hrefCatMeals = $(link).attr('href');
      const nameCatMeals = $(link).text().trim();
      if (hrefCatMeals && nameCatMeals) {
          links.push({ hrefCatMeals, nameCatMeals });
      }
      });
      res.send(links);
      // fs.writeFile('links.json', JSON.stringify(links, null, 4), (err) => {
      // if (err) {
      //     console.error(err);
      //     return;
      // }
      // console.log('Links saved to links.json');
      // });
  })
  .catch(console.error);
};


exports.scrapMeals =  (req, res) => {
  let foods = [];
  if(req.query.url){
    let foodUrl = req.query.url
    //req.body.url;
    // res.send(foodUrl);
    let url_parts = foodUrl.split("/");
    let cat = url_parts[4];
    // let url = 'https://www.calories.info/food/'+cat;

    request(foodUrl, function(error, response, html) {
      if (!error) {
        let $ = cheerio.load(html);
        let foodresult = $('table tbody tr');

        foodresult.each((i, tr) => {
          let tds = $(tr).find('td');
          let food = tds.eq(0).text().trim();

          let serving_size_100g = tds.eq(1).text().trim();
          let serving_size_100g_Value = extractValue100g(serving_size_100g);

          let calories_100g = tds.eq(4).text().trim();
          let calories_100g_Value = extractValue100g(calories_100g);

          let serving_size_portion = tds.eq(2).text().trim();
          let serving_size_portion_Value = extractValue(serving_size_portion);

          let calories_portion = calculateCalories(
            calories_100g_Value,
            serving_size_100g_Value,
            serving_size_portion_Value
          );
          let serving_size_oz = tds.eq(3).text().trim();
          let serving_size_oz_Value = extractValue(serving_size_oz);

          let calories_oz = calculateCalories(
            calories_100g_Value,
            serving_size_100g_Value,
            serving_size_oz_Value
          );
          // console.log(" food "+food+" serving_size_portion_Value "+serving_size_portion_Value+" serving_size_oz_Value "+serving_size_oz_Value)
          // console.log(" serving_size_100g_Value "+serving_size_100g_Value+" calories_portion "+calories_portion+" calories_oz "+calories_oz)
          let food_dict = {
            FoodCategory: cat,
            FoodItem: food,
            serving_size_100g: serving_size_100g,
            calories_100g: calories_100g,
            serving_size_portion: serving_size_portion,
            calories_portion: calories_portion+" cal",
            serving_size_oz: serving_size_oz,
            calories_oz: calories_oz+" cal",
          };
          foods.push(food_dict);
        });
        res.send(foods);
        // fs.writeFileSync('food.json', JSON.stringify(foods, null, 4));
      } else {
        console.log(error);
      }
    });
  }else{
    res.send(foods);
  }
};

function extractValue100g(string) {
  let match = string.match(/\d+\.?\d*/);
  if (match) {
    return parseFloat(match[0]);
  } else {
    return null;
  }
}

function extractValue(string) {
  // let match = string.match(/\d+\.?\d*/);
  // let match = string.match(/\((\d+\.?\d*)\s*s\)/);
  let match = string.match(/\((\d+(?:\.\d+)?)\s*[a-z\s]*\)/);
  if (match) {
    return parseFloat(match[1]);
  } else {
    return null;
  }
}

function calculateCalories(calories_100g_Value, serving_size_100g_Value, serving_size_Value) {
  let num_float = (calories_100g_Value / serving_size_100g_Value) * serving_size_Value;
  let rounded_num = Math.round(num_float);
  return rounded_num;
}