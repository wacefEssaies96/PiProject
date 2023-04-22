export const getYourMorphology = async (userId, shoulders, hips) => {
    console.log(userId);
    console.log(shoulders);
    console.log(hips);
    const method = 'PUT'
    const options = {
        method : method,
        headers : {
            'Content-Type' : 'application/json'
        },
    }
    const res = await fetch(`${process.env.backurl}/api/get-your-morphology/bodyShapeType/${userId}/${shoulders}/${hips}`, options)
    const result = await res.json()
    return result
}