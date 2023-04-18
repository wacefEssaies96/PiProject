import { Cookies } from 'react-cookie'

const cookies = new Cookies();

const user =  cookies.get('user');


export const calculateCalories = async  (data,event) => {
  let weight= data.weight;
  let height= data.height;
  let age= data.age;
  let gender= data.gender;
  let activity= data.activity;
  
  
  /*let date1 = getDateFromDateTime(user.dateOfBirth)
  // let age= calculateAge(user.dateOfBirth);
  console.log(" age : "+user.weight)*/
  /*
    let weight=data.target.weight.value;
    let height=data.target.height.value;
    let age=data.target.age.value;
    let gender=data.target.gender.value;
    let activity=data.target.activity.value;
*/
    let bmr;
    if (gender === 'Male') {
      // bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);

      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'Female') {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        console.log('Invalid gender');
    }
    // console.log('bmr 1 : '+bmr);

    let calories;
    switch (activity) {
      case 'sedentary':
        calories = bmr * 1.2;
        break;
      case 'lightly active':
        calories = bmr * 1.375;
        break;
      case 'moderately active':
        calories = bmr * 1.55;
        break;
      case 'very active':
        calories = bmr * 1.725;
        break;
      case 'super active':
        calories = bmr * 1.9;
        break;
      default:
        console.log('Invalid activity level');
    }
    // console.log('bmr 2 : '+bmr*1.1);
  
    return calories;
    
  }
  