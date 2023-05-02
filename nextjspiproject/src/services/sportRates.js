export const deleteRate = async (id) => {
    const res = await fetch(`${process.env.backurl}/api/sportsRating/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}

export const deleteAllRates = async (userId, title) => {
    const res = await fetch(`${process.env.backurl}/api/sportsRating/deleteAllUserRatesSportSubType/${userId}/${title}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}

export const postRate = async (rate, userId, sportSubTypeTitle) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rating: rate
        }),

    }
    const res = await fetch(`${process.env.backurl}/api/sportsRating/addRating/${userId}/${sportSubTypeTitle}`, options)
    const result = await res.json()
    return result
}

export const updateRate = async (rate, rateId, userId, sportSubTypeTitle) => {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rating: rate
        }),

    }
    const res = await fetch(`${process.env.backurl}/api/sportsRating/${rateId}/${userId}/${sportSubTypeTitle}`, options)
    const result = await res.json()
    return result
}