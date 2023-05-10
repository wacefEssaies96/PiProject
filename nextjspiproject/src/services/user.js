import { success, errorAlert } from "@/services/alerts"
import axios from "axios";
// import { useRouter } from "next/router";
import { Cookies } from "react-cookie";


export const submitUser = async (data, operationMode) => {
    const cookies = new Cookies();
    
    // if(cookies.get('user')["_id"] == data.target.id.value){
    //     console.log("same user")
    // //     var u = await fetchData(`${process.env.backurl}/api/users/findOne/${cookies.get('user')["_id"]}`);
    // //     cookies.set('user', u, { maxAge: 60 * 60 * 24 })
    // //     console.log( " user cookies "+cookies.get('user')+"u "+u)
    // }
    let formData = new FormData();
    formData.append('fullname', data.target.fullname.value);
    formData.append('email', data.target.email.value);
    formData.append('phone', data.target.phone.value);
    formData.append('dateOfBirth', data.target.dateOfBirth.value);
    formData.append('height', data.target.height.value);
    formData.append('weight', data.target.weight.value);
    formData.append('gender', data.target.gender.value);
    formData.append('address', data.target.address.value);
    if(data.target.password.value)
        formData.append('password', data.target.password.value);
    
    if (data.target.image.files[0] !== undefined)
        formData.append('image', data.target.image.files[0]);
    else
        formData.append('image', data.target.pathImg.value.replace(/^http:\/\/localhost:3030\//, ""));
    

    if(operationMode === 'Create User' ){
        formData.append('role', data.target.role.value);
        if(data.target.role.value == "DOCTOR"){
            formData.append('speciality', data.target.speciality.value)
        }else{
            formData.append('disease', data.target.disease.value);
        }
    axios.post(`${process.env.backurl}/api/users/Create`, formData)
            .then((data) => { if (data.data) { success(data.data.message); 
                window.location = "/admin/users" } })
            .catch((error) => { if (error.response) { errorAlert(error.response.data.message) } })
        
    }
    else if(operationMode === 'Modify User' ){
        formData.append('role', data.target.role.value);
        if(data.target.role.value == "DOCTOR"){
            formData.append('speciality', data.target.speciality.value)
        }else{
            formData.append('disease', data.target.disease.value);
        }

        axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, formData)
            .then(async (data2) => { 
                if (data2.data) { 
                    // cookies.remove('user')
                      // const router = useRouter()

    //   window.location.reload()
      // router.replace(router.asPath);
                    //change profile
                    if(cookies.get('user')["_id"] == data.target.id.value){
                        // console.log("same user")

                    //     var u = await fetchData(`${process.env.backurl}/api/users/findOne/${cookies.get('user')["_id"]}`);
                        cookies.remove('token')
                        cookies.remove('user')
                        var e =data2.email
                        var p =data2.password
                        await loginService2({ e , p })
                        cookies.set('user', data2, { maxAge: 60 * 60 * 24 })
                        window.location.reload()

                    //     console.log( " user cookies "+cookies.get('user')+"u "+u)
                    }
                    success(data2.data.message);
                    window.location = "/admin/users" 
                } 
            })
            .catch((error2) => { if (error2.response) { errorAlert(error2.response.data.message) } })
        }
        else if (operationMode === 'Register User' ){
            formData.append('role', 'USER');
            formData.append('disease', data.target.disease.value);
            
            axios.post(`${process.env.backurl}/api/auth/register`, formData)  
            .then((data3) => { if (data3.data) { success(data3.data.message); 
                window.location = "/auth/login" } }) 
            .catch((error3) => { if (error3.response) { errorAlert(error3.response.data.message) } })  
        }
        else if (operationMode === 'Profile User' ){
            formData.append('role', 'USER');
            formData.append('disease', data.target.disease.value);

            axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, formData)
            .then((data4) => { if (data4.data) { success(data4.data.message); 
                window.location.reload() } }) 
            .catch((error4) => { if (error4.response) { errorAlert(error4.response.data.message) } })
        }
        else if ( operationMode === 'Register Doctor'){
            formData.append('role', 'DOCTOR');
            formData.append('speciality', data.target.speciality.value)
            
            axios.post(`${process.env.backurl}/api/auth/register`, formData)   
            .then(async (data5) => { 
                if (data5.data) { 
                    success(data5.data.message);
                    window.location = "/auth/login" 
                } 
            })
            .catch((error5) => { if (error5.response) { errorAlert(error5.response.data.message) } })  
        }
        else if (operationMode === 'Profile Doctor'){
            formData.append('role', 'DOCTOR');
            formData.append('speciality', data.target.speciality.value)

            axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, formData)
            .then((data6) => { if (data6.data) { success(data6.data.message); 
                window.location.reload() } }) 
            .catch((error6) => { if (error6.response) { errorAlert(error6.response.data.message) } })
        }

            
}

export const verifyAccount = async (data, id) => {

    let formData = new FormData();
    formData.append('email', data)
    formData.append('account_Verified', true)

    axios.put(`${process.env.backurl}/api/users/Update/${id}`, formData)
        .then(res => window.location = '/admin/users')
        .catch(err => console.log(" user updated err " + err))
}

export const registerDoctor = async (data, operationMode) => {

    let options = new FormData()
    options.append('fullname', data.target.fullname.value)
    options.append('email', data.target.email.value)
    options.append('password', data.target.password.value)
    options.append('speciality', data.target.speciality.value)
    options.append('gender', data.target.gender.value)
    options.append('phone', data.target.phone.value)
    options.append('address', data.target.address.value)
    options.append('role', 'DOCTOR')
    options.append('image', data.target.image.files[0]);

    const res =
        operationMode === 'Add'
            ? await axios.post(`${process.env.backurl}/api/auth/register`, options)
            : await axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, options)

    return res
}

export const registerUser = async (data, operationMode) => {
    let options = new FormData()
    options.append('fullname', data.target.fullname.value)
    options.append('email', data.target.email.value)
    options.append('password', data.target.password.value)
    options.append('height', data.target.height.value)
    options.append('weight', data.target.weight.value)
    options.append('disease', data.target.disease.value)
    options.append('gender', data.target.gender.value)
    options.append('phone', data.target.phone.value)
    options.append('address', data.target.address.value)
    options.append('dateOfBirth', data.target.dateOfBirth.value)
    options.append('role', 'USER')
    options.append('image', data.target.image.files[0]);
    const res =
        operationMode === 'Add'
            ? await axios.post(`${process.env.backurl}/api/auth/register`, options)
            : await axios.put(`${process.env.backurl}/api/users/Update/${data.target.id.value}`, options)

    return res
}
