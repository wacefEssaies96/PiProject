import axios from "axios";
import moment from 'moment';
 import { Cookies } from 'react-cookie'
export const handleUpdateOrAdd  = async (data, operationMode) => {
   const cookies= new Cookies()
   let u =null

   if(cookies.get('user')){
     u = cookies.get('user')["_id"]
   }
   let op = {
    'Date': moment(data.target.Date.value, 'YYYY-MM-DD').toDate(),
    'Hour': data.target.Hour.value,
    'Duration': data.target.Duration.value,
    'user': u,
    'reserved': false,
    'fullname': u.fullname,
    'speciality': u.speciality,
  };
  console.log(op)
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