export const getSporTypes = async () => {
    const res = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    const json = await res.json()
    return json
}

export const postSportType = async (data) => {
    const res = await fetch(
        `${process.env.backurl}/api/sportTypes/addSportType`, {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const json = await res.json()
    return json
}