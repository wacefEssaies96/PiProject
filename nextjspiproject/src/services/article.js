import { success, errorAlert } from "@/services/alerts"
import axios from "axios";
import { Cookies } from "react-cookie";


export const submitArticle = async (data, operationMode, content) => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    let formData = new FormData();
    formData.append('user', user._id)
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

export const getScrappedArticle = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            link: data
        })
    }
    const response = await fetch(`${process.env.backurl}/api/admin/articles/scrap/wired/one`, options)
    return response.json()
}

export const approve = async (articleid, userid) => {
    const response = await fetch(`${process.env.backurl}/api/admin/articles/approve/${userid}/${articleid}`, {
        method: 'GET'
    })
    const data = await response.json()
    return data.message
}
export const reject = async (articleid, userid) => {
    const response = await fetch(`${process.env.backurl}/api/admin/articles/reject/${userid}/${articleid}`, {
        method: 'GET'
    })
    const data = await response.json()
    return data.message
}
export const sendRequest = async (articleid, userid) => {
    const response = await fetch(`${process.env.backurl}/api/admin/articles/send-request/${userid}/${articleid}`, {
        method: 'GET'
    })
    const data = await response.json()
    return data.message
}

export const createComment = async (articleid, userid, content) => {

    const JSONdata = JSON.stringify({
        userId: userid,
        articleId: articleid,
        content: content
    })
    const response = await fetch(`${process.env.backurl}/api/comment/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    })
    const data = await response.json()
    return data.message
    // success(data.message)
}
export const updateComment = async (articleid, userid, content) => {
    const JSONdata = JSON.stringify({
        userId: userid,
        articleId: articleid,
        content: content
    })
    const response = await fetch(`${process.env.backurl}/api/comment/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    })
    const data = await response.json()
    return data.message
    // success(data.message)
}

