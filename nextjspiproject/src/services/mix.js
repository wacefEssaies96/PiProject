import axios from "axios";


export const deleteData = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE'
    })
    const data = await response.json()
    return data
}

export const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const VerifImg = async (path) =>{
    var dataImg = false;
    
    axios.get(`${process.env.backurl}/api/Img/Verif?url=${path}`)
    .then((data) => { if (data.data) {
         dataImg=data.data.message;
         console.log(" path "+path+" response dataImg "+dataImg)
         return dataImg
        } })
    .catch((error) => { if (error.response) { 
        dataImg=error.response.data.message;
        console.log(" path "+path+" response dataImg "+dataImg)
        return dataImg
     } })
     return dataImg
    }

// export const VerifImg = async (path) =>{
//     var dataImg = false;
//     var url = `${process.env.backurl}/api/Img/Verif?url=${path}`;
//      const response = await fetch(url)
//     //  .then((data) => { if (data.data) { 
        
//     //  console.log(" data "+data.message)
//     //     return data
//     //      } })
//     //  .catch((error) => { if (error.response) { 
//     //     console.log(" error "+error.response.data.message)
//     //     return false } })
//     // //  dataImg = await response.json()
//     if(response.data)
//     dataImg = await response.data.json()
//     console.log(" dataImg "+dataImg)
//     if(response.response)
//     dataImg = await response.response.json()
//     console.log(" dataImg "+dataImg)
//     return dataImg.message
//       }