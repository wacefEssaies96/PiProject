export const getSporTypes = async () => {
    const res = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    const json = await res.json()
    return json
}
export const deleteSportType = async (id) => {
    const res = await fetch(`${process.env.backurl}/api/sportTypes/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}

export const postSportType = async (data, operationMode, advantages,selectedSubTypes) => {
    console.log("service");
    const method = operationMode === 'Add' ? 'POST' : 'PUT'
    const options = {
        method : method,
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            title : data.target.title.value,
            advantages : advantages,
            sportSubType : selectedSubTypes
        }),

    }
    const res =
        operationMode === 'Add'
            ? await fetch(`${process.env.backurl}/api/sportTypes/addSportType`, options)
            : await fetch(`${process.env.backurl}/api/sportTypes/${data.target.id.value}`, options)
    const result = await res.json()
    return result
}

export const submitSportTypeForm = async (data, operationMode, selectedSubTypes) => {

    const method = operationMode === 'Add' ? 'POST' : 'PUT'
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
         
        body: JSON.stringify({
            title : data.target.title.value,
            sportSubType : selectedSubTypes
        }),
    }
    const res =
        operationMode === 'Add'
            ? await fetch(`${process.env.backurl}/api/sportTypes/addSportType`, options)
            : await fetch(`${process.env.backurl}/api/sportSubTypes/${data.target.id.value}`, options)

    const result = await res.json()
    return result
}