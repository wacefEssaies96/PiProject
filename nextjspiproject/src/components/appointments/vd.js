// import { useEffect } from "react";

// function ZoomMeeting() {
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const { ZoomMtg } = require('@zoomus/websdk');

//       ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av");
//       ZoomMtg.preLoadWasm();
//       ZoomMtg.prepareJssdk();

//       ZoomMtg.init({
//         leaveUrl: "http://localhost:3000",
//         isSupportAV: true,
//         success: (success) => {
//           console.log(success);
//         },
//         error: (error) => {
//           console.log(error);
//         },
//       });

//       ZoomMtg.join({
//         //signature: "YOUR_SIGNATURE",
//         apiKey: "RtXejFGsSOGMNUIDA4HU9A",
//         meetingNumber: "359 739 8888",
//         userName: "Mariem",
//         userEmail: "mariem.fraj99@gmail.com",
//         passWord: "Mariem19999",
//         success: (success) => {
//           console.log(success);
//         },
//         error: (error) => {
//           console.log(error);
//         },
//       });
//     }
//   }, []);

//   return <div id="zmmtg-root"></div>;
// }

// export default ZoomMeeting;
// y

// import crypto from "crypto";
// import dynamic from "next/dynamic";
// import React from "react";
// import { useParams } from "react-router-dom";
// const Room = () => {
//     const ZegoUIKitPrebuilt =dynamic(
//         () => import("@zegocloud/zego-uikit-prebuilt").then((module) => module.ZegoUIKitPrebuilt),
//         { ssr: false }
//       );
      
//   const meeting = async (element) => {
//     const appID = 1178035961;
//     const serverSecret = "7370b2a7e9fa2d32168732b2f1e4d80e";
//     const roomID = "your_room_id";
//     const timestamp = Date.now().toString();
//     const userID = "your_user_id";

//     const hmac = crypto.createHmac("sha256", serverSecret);
//     hmac.update(`${appID}${roomID}${userID}${timestamp}`);
//     const token = hmac.digest("hex");

//     const zp = ZegoUIKitPrebuilt.create(token);

//     zp.joinRoom({
//       container: element,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.GroupCall,
//       },
//     });
//   };

//   return <div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>;
// };

// export default Room;
import { useEffect, useRef } from "react";
import ZegoExpressEngine from "@zego/zego-express-webrtc-sdk";

const Room = () => {
  const videoRef = useRef(null);
  const appId = YOUR_APP_ID;
  const server = "wss://wsliveroom" + YOUR_APP_ID + "-api.zego.im:8282/ws";
  const roomId = YOUR_ROOM_ID;
  const userId = YOUR_USER_ID;
  const userName = YOUR_USER_NAME;

  useEffect(() => {
    const zg = new ZegoExpressEngine(appId, server);

    zg.setDebugVerbose(true);

    const initSDK = async () => {
      await zg.checkSystemRequirements();

      const stream = await zg.createStream({
        camera: {
          audioInput: null,
          videoInput: null,
          video: true,
        },
        renderer: {
          audio: false,
          video: videoRef.current,
        },
      });

      await stream.startPreview();

      zg.loginRoom(roomId, {
        userId,
        userName,
      });

      zg.startPublishingStream(stream.streamID);
    };

    initSDK();

    return () => {
      zg.logoutRoom(roomId);
      zg.destroy();
    };
  }, []);

  return <video ref={videoRef} />;
};

export default Room;
