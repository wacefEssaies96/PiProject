import axios from "axios";
import { Cookies } from 'react-cookie'
import { success, errorAlert } from "@/services/alerts"

// get cookies
const cookies = new Cookies();


export const submitRecipe = async (data, operationMode) => {
    
    // console.log("imgRecipe "+data.target.file[0])

    // let imgRecipe;
    // if (data.target.imgRecipe.files[0] !== undefined)
    // {
    //     imgRecipe= data.target.imgRecipe.files[0];
    //     console.log("imgRecipe"+JSON.stringify(data.target))
    // }
    // else
    //     imgRecipe= data.target.pathImg.value;
    

    let formDataRecipe = {
        'name': data.target.name.value.trim(),
        'validated': data.target.validated.value,
        'name': data.target.name.value,
        'description': data.target.description.value,
        'meals': (data.target.meals.value).split(","),
        'quantity': (data.target.quantity.value).split(","),
        // 'imgRecipe' : imgRecipe,
        'user': cookies.get('user')["_id"]
    }

console.log(" formDataRecipe "+JSON.stringify(formDataRecipe))
    operationMode === 'Create'
        ? axios.post(`${process.env.backurl}/api/recipe/Create`, formDataRecipe)
        .then((data) => { if (data.data) { success(data.data.message);
             window.location = "/recipes" 
            } })
        .catch((error) => { if (error.response) { errorAlert(error.response.data.message) } })
        : axios.put(`${process.env.backurl}/api/recipe/Update/${data.target.id.value}`, formDataRecipe)
        .then((data2) => { if (data2.data) { success(data2.data.message);
             window.location = "/recipes" 
            } })
        .catch((error2) => { if (error2.response) { errorAlert(error2.response.data.message) } })
}
