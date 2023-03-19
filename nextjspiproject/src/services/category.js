import { success } from "@/services/alerts"

export const submitCategory = async (event, subcategories, operation) => {
    const JSONdata = JSON.stringify({
        title: event.target.category.value,
        subcategory: subcategories
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
            ? await fetch(`${process.env.backurl}/api/admin/categories/create`, options)
            : await fetch(`${process.env.backurl}/api/admin/categories/update/${event.target.id.value}`, options)
    const result = await response.json()
    success(result.message)
}
