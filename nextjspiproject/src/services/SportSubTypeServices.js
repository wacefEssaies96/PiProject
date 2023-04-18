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
    formData.append('definitionHistory', data.target.definitionHistory.value)
    const res =
        operationMode === 'Add'
            ? await axios.post(`${process.env.backurl}/api/sportSubTypes/addSportSubType`, formData)
            : await axios.put(`${process.env.backurl}/api/sportSubTypes/${data.target.id.value}`, formData)
}