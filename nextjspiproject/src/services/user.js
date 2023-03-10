import axios from "axios";

export const submitUser = async (data, operationMode) => {
    
    let user = {
        // 'email' : data.target.email.value,
        'role': data.target.role.value,
        'height': data.target.height.value,
        'weight' : data.target.weight.value, 
        'gender' : data.target.gender.value
    }
    console.log(user)

    operationMode === 'Create'
        ? axios.post(`${process.env.backurl}/api/users/Create`, user)
            .then(res => console.log(" user created succesfuly "))
            .catch(err => console.log(" user created err "+err))
        : axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, user)
            .then(res => console.log(" user updated succesfuly "))
            .catch(err => console.log(" user updated err "+err))
}