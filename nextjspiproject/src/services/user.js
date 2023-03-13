import axios from "axios";

export const submitUser = async (data, operationMode) => {

    let formData = new FormData();
    formData.append('email', data.target.email.value);
    formData.append('role', data.target.role.value);
    formData.append('height', data.target.height.value);
    formData.append('weight', data.target.weight.value);
    formData.append('gender', data.target.gender.value);
    if (data.target.image.files[0] !== undefined)
        formData.append('image', data.target.image.files[0]);

    // console.log(data.target.image.files[0]);
    // let user = {
    //     // 'email' : data.target.email.value,
    //     'role': data.target.role.value,
    //     'height': data.target.height.value,
    //     'weight' : data.target.weight.value, 
    //     'gender' : data.target.gender.value
    // }
    // console.log(user)

    operationMode === 'Create'
        ? axios.post(`${process.env.backurl}/api/users/Create`, formData)
            .then(res => console.log(" user created succesfuly "))
            .catch(err => console.log(" user created err "+err))
        : axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, formData)
            .then(res => console.log(" user updated succesfuly "))
            .catch(err => console.log(" user updated err "+err))
}