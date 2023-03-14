import DoctorsForm from '@/components/users/doctorform'
import Link from 'next/link'
import { Component, useState } from 'react'
import { Form } from 'react-bootstrap'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'
import{BsFillShieldLockFill,BsTelephoneFill} from "react-icons/bs"
import OtpInput from 'react18-input-otp'
import {CgSpinner} from "react-icons/cg"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'




export default function phoneverify() {
  const [code, setCode] = useState("");
  const [loading,setLoading]=useState(false);
  const handleChange = (code) => setCode(code);

  const [ph, setPh] = useState("");



    return (

      <div>
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4" >
            
        <>
                <div className=' text-center bg-white w-fit mx-auto p-4 rounded-full'>
                  <BsTelephoneFill size={30}/>
                  <br/>
                  </div>
                
      
                 <div className='container d-flex align-items-center justify-content-center'>
                <label htmlFor="ph" className=" font-bold text-2xl text-black ">
                  Enter your phone number
                </label>
                </div>
                <br/>
             <div className='container d-flex align-items-center justify-content-center' >
                <PhoneInput country={"TUNISIA"} value={ph} onChange={setPh} style={{marginLeft: "500px"}}/>
              </div>
         
                        <br/>
                        <div className='container d-flex align-items-center justify-content-center' >
                        <button style={{ alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 8,
    border: 'none',
    backgroundColor: '#018749'}}>
                            <span style={{  
    fontSize: 16,
    lineWidth: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',}}>Send code via SMS</span>
    {
      loading&&<CgSpinner size={20} className="mt-1 animate-spin"/>
    }
                            
                              </button>
                        </div>

              
         
         
         
         
                
                

                
                
                
                
                </>
   
               
                


            

        </div>


      </div>
       


    )

}










