
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRouter } from "next/router";

function Room() {
  const meetingRef = useRef(null);
  const router = useRouter();
  const [roomCode, setRoomCode] = useState(null);
  const [name, setName] = useState(null);
  console.log("roomCode:", roomCode);
  const [zp, setZp] = useState(null);

  useEffect(() => {

    const newRoomCode = router.query.RoomCode?.toString();
    const name = router.query.name?.toString();

    if (newRoomCode) {
      setRoomCode(newRoomCode);
    }
    if (name) {
      setName(name);
    }
  }, [router.query.RoomCode,router.query.name]);
  

  useEffect(() => {
    const joinRoom = async () => {
      const appID = 1178035961;
      const serverSecret = "7370b2a7e9fa2d32168732b2f1e4d80e";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomCode,
        Date.now().toString(),
        name
     );
      const zpInstance = ZegoUIKitPrebuilt.create(kitToken);
      setZp(zpInstance);
  
      if (zpInstance){
        zpInstance.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    }
    };
  
    if (roomCode && !zp) { // Only call joinRoom if roomCode exists and zp is not already set
      joinRoom();
    }
  
    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [roomCode, zp]);
  

  return <div ref={meetingRef} style={{ width: "100vw", height: "100vh" }} />;
}

export default Room;
