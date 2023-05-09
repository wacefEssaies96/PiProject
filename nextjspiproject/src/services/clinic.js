
import axios from "axios";
export const handleUpdateOrAdd  = async (data, operationMode) => {
    let op= {
        'Name': data.target.Name.value,
        'Adress':data.target.Adress.value ,
        'phone_number': data.target.phone_number.value ,
       
    }
  
    console.log("op " + JSON.stringify(op)
    )
    
    // const res =
        operationMode === 'Add'
            ? await axios.post(`${process.env.backurl}/api/clinic/addclinic`, op).then((data) => { if (data.data) { window.location = "/clinic/clinicPage" } })
            : await axios.put(`${process.env.backurl}/api/clinic/updateclinics/${data.target.id.value}`, op).then((data) => { if (data.data) { window.location = "/clinic/clinicPage" } })

    // return res
}