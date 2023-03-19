import { success } from "@/services/alerts"

export const submitSubCategory = async (event, operation) => {
    const JSONdata = JSON.stringify({
        title: event.target.category.value
    })
    const method = operation === 'Create' ? 'POST' : 'PUT'
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    }
    const response =
        operation === 'Create'
            ? await fetch(`${process.env.backurl}/api/admin/subcategories/create`, options)
            : await fetch(`${process.env.backurl}/api/admin/subcategories/update/${event.target.id.value}`, options)
    const result = await response.json()
    success(result.message)
}