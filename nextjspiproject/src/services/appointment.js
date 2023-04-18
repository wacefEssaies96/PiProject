import axios from "axios";
import moment from 'moment';
export const handleUpdateOrAdd  = async (data, operationMode) => {
   
    let op= {
         
        'Date':moment(data.target.Date.value, "DD/MM/YYYY").toDate(),
        
        'Hour':data.target.Hour.value ,
        'Duration': data.target.Duration.value ,
       
    }
   
    // let options = new FormData()
    // options.append('Name', data.target.Name.value)
    // options.append('Adress', data.target.Adress.value)
    // options.append('phone_number', data.target.phone_number.value)
    console.log("op " + JSON.stringify(op)
    )
    
    // const res =
        operationMode === 'Add'
            ? await axios.post(`${process.env.backurl}/api/app/addapp`, op).then((data) => { if (data.data) { window.location = "/appointments/appointments" } })
            : await axios.put(`${process.env.backurl}/api/app/upapp/${data.target.id.value}`, op).then((data) => { if (data.data) { window.location = "/appointments/appointments" } })

    // return res
}