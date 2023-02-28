import { success } from "@/components/article/Alerts"

export const deleteArticle = async (id) => {
    const response = await fetch(`${process.env.backurl}/api/admin/articles/delete/${id}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    return data
}

export const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
  }

export const submitArticle = async (data, operationMode, content) => {

    const JSONdata = JSON.stringify({
        title: data.target.title.value,
        content: content,
        description: data.target.description.value,
        category: { title: data.target.category.value },
        subcategory: { title: data.target.subcategory.value },
    })
    const method = operationMode === 'Create' ? 'POST' : 'PUT'
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    }
    const response =
        operationMode === 'Create'
            ? await fetch(`${process.env.backurl}/api/admin/articles/create`, options)
            : await fetch(`${process.env.backurl}/api/admin/articles/update/${data.target.id.value}`, options)

    const result = await response.json()
    success(result.message)
}