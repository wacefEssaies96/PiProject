import { success, errorAlert } from "@/services/alerts"
import axios from "axios";

export const submitArticle = async (data, operationMode, content) => {
    let formData = new FormData();
    formData.append('title', data.target.title.value);
    formData.append('content', content);
    formData.append('description', data.target.description.value);
    formData.append('category', JSON.stringify({ title: data.target.category.value }));
    formData.append('subcategory', JSON.stringify({ title: data.target.subcategory.value }));
    if (data.target.thumbnail.files[0] !== undefined)
        formData.append('thumbnail', data.target.thumbnail.files[0]);
    try {
        const response =
            operationMode === 'Create'
                ? await axios.post(`${process.env.backurl}/api/admin/articles/create`, formData)
                : await axios.put(`${process.env.backurl}/api/admin/articles/update/${data.target.id.value}`, formData)
        success(response.message)
    } catch (error) {
        errorAlert("Oops! An error has occured. Please try again later.")
    }
}