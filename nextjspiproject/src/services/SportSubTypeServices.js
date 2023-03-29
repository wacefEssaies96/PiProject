import axios from "axios"

export const deleteSportSubType = async (id) => {
    const res = await fetch(`${process.env.backurl}/api/sportSubTypes/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}

export const fetchSubTypeData = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export const submitSubTypeForm = async (data, operationMode) => {

    const formData = new FormData()
    formData.append('title', data.target.title.value)
    formData.append('demoVideo', data.target.demoVideo.files[0])
    formData.append('limits', data.target.limits.value)

    // const method = operationMode === 'Add' ? 'POST' : 'PUT'
    // const options = {
    //     method: method,
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    //     body:
    //         // JSON.stringify({
    //         // title: data.target.title.value,
    //         // demoVideo : data.target.demoVideo.files[0],
    //         // limits : data.target.limits.value,
    //         // })
    //         formData
    //     ,
    // }
    const res =
        operationMode === 'Add'
            ? await axios.post(`${process.env.backurl}/api/sportSubTypes/addSportSubType`, formData)
            : await axios.put(`${process.env.backurl}/api/sportSubTypes/${data.target.id.value}`, formData)

    // const result = await res.json()
    // return result
}