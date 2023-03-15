import axios from "axios"

export const registerDoctor = async (data, operationMode) => {

    let options = new FormData()
    options.append('fullname', data.target.fullname.value)
    options.append('email', data.target.email.value)
    options.append('password', data.target.password.value)
    options.append('speciality', data.target.speciality.value)
    options.append('gender', data.target.gender.value)
    options.append('phone', data.target.phone.value)
    options.append('address', data.target.address.value)
    options.append('role', 'DOCTOR')
    options.append('image', data.target.image.files[0]);
 
    const res =
        operationMode === 'Add'
            ? await axios.post(`${process.env.backurl}/api/auth/register`, options)
            : await axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, options)

    return res
}