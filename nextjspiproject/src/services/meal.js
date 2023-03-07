import axios from "axios";
import { Cookies } from 'react-cookie'

// get cookies
const cookies = new Cookies();


export const submitMeal = async (data, operationMode) => {
    
    function extractValue(string) {
        let match = string.match(/\d+\.?\d*/);
        return match ? parseFloat(match[0]) : null;
      }
      
    function calculateCalories(calories_100g_Value, serving_size_100g_Value, serving_size_Value) {
        let num_float = (calories_100g_Value / serving_size_100g_Value) * serving_size_Value;
        let rounded_num = Math.round(num_float);
        return rounded_num;
    }
    
    let serving_size_100g = '100g';
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
    let meal = {
        'FoodCategory': data.target.FoodCategory.value,
        'FoodItem': data.target.FoodItem.value,
        'serving_size_100g' : serving_size_100g, 
        'calories_100g' : calories_100g,
        'serving_size_portion' : serving_size_portion,
        'calories_portion' : calories_portion,
        'serving_size_oz' : data.target.serving_size_oz.value,
        'calories_oz' : calories_oz,
        'userId': cookies.get('user')
    }

    operationMode === 'Create'
        ? axios.post(`${process.env.backurl}/api/meal`, meal)
            .then(res => console.log(" meal created succesfuly "))
            .catch(err => console.log(" meal created err "+err))
        : axios.put(`${process.env.backurl}/api/meal/${data.target.id.value}`, meal)
            .then(res => console.log(" meal updated succesfuly "))
            .catch(err => console.log(" meal updated err "+err))
}