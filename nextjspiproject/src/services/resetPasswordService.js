export const resetPassword = async (data, id, token) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: data.target.password1.value,
        }),
    }

const res = await fetch(`${process.env.backurl}/api/reset_password/${id}/${token}`, options)
const result = await res.json()

return result
}