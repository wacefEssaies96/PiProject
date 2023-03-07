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

    const method = operationMode === 'Add' ? 'POST' : 'PUT'
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: data.target.title.value,
            demoVideo : data.target.demoVideo.value,
            advantages : data.target.advantages.value,
            limits : data.target.limits.value,
        }),
    }
    const res =
        operationMode === 'Add'
            ? await fetch(`${process.env.backurl}/api/sportSubTypes/addSportSubType`, options)
            : await fetch(`${process.env.backurl}/api/sportSubTypes/${data.target.id.value}`, options)

    const result = await res.json()
    return result
}