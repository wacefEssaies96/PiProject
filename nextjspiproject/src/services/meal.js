import axios from "axios";
import { Cookies } from 'react-cookie'
import { success, errorAlert } from "@/services/alerts"
import { fetchData } from "./mix";

// get cookies
const cookies = new Cookies();


export const submitMeal = async (data, operationMode) => {
    
    function extractValue(string) {

        let match = string.match(/\d+\.?\d*/g);
        // if(match)
        //     console.log(" extractValue : "+match)
        // else
        //     console.log(" prob extractValue match  ")
        return match ? parseFloat(match[match.length-1]) : null;
      }
    function calculateCalories(calories_100g_Value, serving_size_100g_Value, serving_size_Value) {
        // console.log(
        //     "calories_100g_Value "
        //     +calories_100g_Value
        //     +
        //     " serving_size_100g_Value "
        //     + serving_size_100g_Value
        //     +
        //     "  serving_size_Value "
        //     + serving_size_Value
        // )
        let num_float = (calories_100g_Value / serving_size_100g_Value) * serving_size_Value;
        let rounded_num = Math.round(num_float);
        return rounded_num;
    }
    
    let serving_size_100g = data.target.serving_size_100g.value;
    let serving_size_100g_Value = extractValue(serving_size_100g);
    
    let  calories_100g = data.target.calories_100g.value;
    let calories_100g_Value = extractValue(calories_100g);

    let serving_size_portion=data.target.serving_size_portion.value;
    let serving_size_oz=data.target.serving_size_oz.value;

    let serving_size_portion_Value = extractValue(serving_size_portion);

    let calories_portion = calculateCalories(
        calories_100g_Value,
        serving_size_100g_Value,
        serving_size_portion_Value
    );

    let serving_size_oz_Value = extractValue(serving_size_oz);

    let calories_oz = calculateCalories(
        calories_100g_Value,
        serving_size_100g_Value,
        serving_size_oz_Value
    );
    let formDataMeal = new FormData();
    formDataMeal.append('FoodCategory', data.target.FoodCategory.value.trim());
    formDataMeal.append('FoodItem', data.target.FoodItem.value.trim());
    formDataMeal.append('serving_size_100g', serving_size_100g);
    formDataMeal.append('calories_100g', calories_100g);
    formDataMeal.append('serving_size_portion', serving_size_portion);
    formDataMeal.append('calories_portion',  calories_portion+" cal");
    formDataMeal.append('serving_size_oz', serving_size_oz);
    formDataMeal.append('calories_oz', calories_oz+" cal");
    formDataMeal.append('validated', data.target.validated.value);
    // formDataMeal.append('rate',data.target.rate.value);
    
    // let meal = {
    //     'FoodCategory': data.target.FoodCategory.value.trim(),
    //     'FoodItem': data.target.FoodItem.value.trim(),
    //     'serving_size_100g' : serving_size_100g, 
    //     'calories_100g' : calories_100g,
    //     'serving_size_portion' : serving_size_portion,
    //     'calories_portion' : calories_portion+" cal",
    //     'serving_size_oz' : serving_size_oz,
    //     'calories_oz' : calories_oz+" cal",
    //     'validated' :  data.target.validated.value
    //     // ,
    //     // 'userId': cookies.get('user')["_id"]
    // }

    if (data.target.imgMeal.files[0] !== undefined)
        formDataMeal.append('imgMeal', data.target.imgMeal.files[0]);
    else
        formDataMeal.append('imgMeal', data.target.pathImg.value.replace(/^http:\/\/localhost:3030\//, ""));
        
        
        for (const [name, value] of formDataMeal.entries()) {
            console.log("name "+name+"value "+value);
          }
    operationMode === 'Create'
        ? axios.post(`${process.env.backurl}/api/meal/Create`, formDataMeal)
        .then((data) => { if (data.data) { success(data.data.message);
             window.location = "/admin/meals" 
            } })
        .catch((error) => { if (error.response) { errorAlert(error.response.data.message) } })
        : axios.put(`${process.env.backurl}/api/meal/Update/${data.target.id.value}`, formDataMeal)
        .then((data2) => { if (data2.data) { success(data2.data.message);
             window.location = "/admin/meals" 
            } })
        .catch((error2) => { if (error2.response) { errorAlert(error2.response.data.message) } })
}
//add Meal From Scrapping data
export const addMealScrap = async (data) => {
    
    
    let meal = {
        'FoodCategory': data.FoodCategory.trim(),
        'FoodItem': data.FoodItem.trim(),
        'serving_size_100g' : data.serving_size_100g, 
        'calories_100g' : data.calories_100g,
        'serving_size_portion' : data.serving_size_portion,
        'calories_portion' : data.calories_portion,
        'serving_size_oz' : data.serving_size_oz,
        'calories_oz' : data.calories_oz,
        'validated' : false,
        // 'rate' : [],
        'imgMeal': undefined
    }
    // let formDataMeal = new FormData();
    // formDataMeal.append('FoodCategory', data.FoodCategory);
    // formDataMeal.append('FoodItem', data.FoodItem);
    // formDataMeal.append('serving_size_100g', data.serving_size_100g);
    // formDataMeal.append('calories_100g',  data.calories_100g);
    // formDataMeal.append('serving_size_portion', data.serving_size_portion);
    // formDataMeal.append('calories_portion',  data.calories_portion);
    // formDataMeal.append('serving_size_oz', data.serving_size_oz);
    // formDataMeal.append('calories_oz', data.calories_oz);
    // formDataMeal.append('validated', false);
    // formDataMeal.append('imgMeal', "undefined");

    axios.post(`${process.env.backurl}/api/meal/CreateScaped`, meal)
        .then((data) => { if (data.data) { success(data.data.message) } })
        .catch((error) => { if (error.response) { errorAlert(error.response.data.message) } })
}