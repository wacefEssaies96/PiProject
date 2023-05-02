export const postProgress = async (userId, videoId) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            videoId: videoId,
            userId: userId,
            progress: 10
        }),

    }
    const res = await fetch(`${process.env.backurl}/api/sportsProgress/addProgress`, options)
    const result = await res.json()
    return result
}

export const updateProgress = async (userId, videoId) => {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            videoId: videoId,
            userId: userId
        }),

    }
    const res = await fetch(`${process.env.backurl}/api/sportsProgress/update`, options)
    const result = await res.json()
    return result
}

export const deleteProgress = async (videoId) => {
    const res = await fetch(`${process.env.backurl}/api/sportsProgress/delete/${videoId}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}