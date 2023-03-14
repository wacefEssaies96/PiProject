import { success, errorAlert } from "@/components/layouts/Alerts"
import axios from "axios";

export const submitUser = async (data, operationMode) => {

    let formData = new FormData();
    formData.append('fullname', data.target.fullname.value);
    formData.append('email', data.target.email.value);
    formData.append('role', data.target.role.value);
    formData.append('phone', data.target.phone.value);
    if (data.target.image.files[0] !== undefined)
        formData.append('image', data.target.image.files[0]);
    // try {
        
        operationMode === 'Create'
            ?
             axios.post(`${process.env.backurl}/api/users/Create`, formData)
            .then((data)=> success(data.response.data.message ))
            .catch((error)=> errorAlert(error.response.data.message ))
            : axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, formData)
            .then((data2)=> success(data2.response.data2.message ))
            .catch((error2)=> errorAlert(error2.response.data2.message))
        success(operationMode)

    // } catch (error3) {
    //     errorAlert("Oops! An error has occured. Please verify your data.")
    // }

}

export const verifyAccount = async (data, id) => {

    

    let user = JSON.stringify({
        'email' : data,
        'account_Verified': true
    })
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: user,
    }

        fetch(`${process.env.backurl}/api/users/Update/${id}`, options)
            .then(res => console.log(" user updated succesfuly "))
            .catch(err => console.log(" user updated err "+err))
}