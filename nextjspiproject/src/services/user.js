import { success, errorAlert } from "@/components/layouts/Alerts"
import axios from "axios";
import { Router } from "next/router";

export const submitUser = async (data, operationMode) => {
    // let valueReturn = false
    let formData = new FormData();
    formData.append('fullname', data.target.fullname.value);
    formData.append('email', data.target.email.value);
    formData.append('role', data.target.role.value);
    formData.append('phone', data.target.phone.value);
    formData.append('password', data.target.password.value);
    if (data.target.image.files[0] !== undefined)
        formData.append('image', data.target.image.files[0]);

    operationMode === 'Create'
        ?
        axios.post(`${process.env.backurl}/api/users/Create`, formData)
            .then((data) => { if (data.data) { success(data.data.message); window.location = "/users" } })
            .catch((error) => { if (error.response) { errorAlert(error.response.data.message) } })
        : axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, formData)
            .then((data2) => { if (data2.data) { success(data2.data.message); window.location = "/users" } })
            .catch((error2) => { if (error2.response) { errorAlert(error2.response.data.message) } })
    // return valueReturn

}

export const verifyAccount = async (data, id) => {

    let formData = new FormData();
    formData.append('email', data)
    formData.append('account_Verified', true)

    axios.put(`${process.env.backurl}/api/users/Update/${id}`, formData)
        .then(res => window.location = '/users' )
        .catch(err => console.log(" user updated err " + err))
}
