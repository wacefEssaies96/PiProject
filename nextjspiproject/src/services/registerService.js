export const registerUser = async (data, operationMode) => {

    const method = operationMode === 'Add' ? 'POST' : 'PUT'
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullname: data.target.fullName.value,
            email: data.target.email.value,
            password : data.target.password.value,
            height: data.target.height.value,
            weight: data.target.weight.value,
            gender: data.target.gender.value,
            phone: data.target.phone.value,
            address: data.target.address.value,
            disease: data.target.disease.value,
        }),
    }
    const res =
        operationMode === 'Add'
            ? await fetch(`${process.env.backurl}/api/auth/register`, options)
            : await fetch(`${process.env.backurl}/api/users/${data.target.id.value}`, options)
    console.log(data.target.id.value)
    
    const result = await res.json()
    return result
}