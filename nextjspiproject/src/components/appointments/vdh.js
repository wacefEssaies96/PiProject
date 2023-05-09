import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
import { errorAlert, success } from "@/services/alerts";


const Vdh = ({user}) => {
  
  
  const [roomCode, setRoomCode] = useState(null);
  const [name, setName] = useState(null);
  const router = useRouter();

  const submitCode = async(e) => {
    e.preventDefault();
    if(user && user.role=="DOCTOR"){
      await axios.post(`${process.env.backurl}/api/meet/addMeet/${user._id}`,{"code":roomCode,"mode":"CREATE"})
      .then((data) => { if (data.data) { success(data.data.message); 
          router.push(`/appointments/vd?RoomCode=${roomCode}&name=${name}`) } })
      .catch((error) => { if (error.response) { errorAlert(error.response.data.message) } })
    }else{
      await axios.post(`${process.env.backurl}/api/meet/addMeet/${user._id}`,{"code":roomCode,"mode":"JOIN"})
      .then((data) => { if (data.data) { success(data.data.message); 
          router.push(`/appointments/vd?RoomCode=${roomCode}&name=${name}`) } })
      .catch((error) => { if (error.response) { errorAlert(error.response.data.message) } })
    }
      
      
  };

  useEffect(() => {
    const newRoomCode = router.query.RoomCode?.toString();
    const newName = router.query.name?.toString();
    console.log("name : " + newName)
    if (newRoomCode) {
      setRoomCode(newRoomCode);
    }
    if (newName) {
      setName(newName);
    }
  }, [router.query.RoomCode, router.query.name]);
  return (
   
        
        <div className="lg:flex lg:pt-20 flex-col items-center justify-center relative z-10 px-6 md:max-w-[90vw] mx-auto col-6 ">
          {/* Main */}
          

          {/* Enter Code */}
          <form onSubmit={submitCode} className="text-white md:pt-12 flex flex-col items-center justify-center">
  <div className="form-group flex flex-col justify-center items-center ">
  <div className="flex flex-col justify-center items-center ">

    <label htmlFor="roomCode">{name} Enter Room Code</label>
    <input
  type="text"
  required
  placeholder="Enter Room Code"
  id="roomCode"
  value={roomCode}
  onChange={(e) => setRoomCode(e.target.value)}
  className="form-control py-1.5 md:py-2 px-4 rounded-full max-w-[16rem] mt-2 text-black md:mt-6 outline-0 "
/>
   <br></br>
  
  <button type="submit" className="btn wd-btn-round-2   ">
    Go
  </button>
  </div>
  </div>
</form>

        </div>
   
   
  );
};

export default Vdh;
