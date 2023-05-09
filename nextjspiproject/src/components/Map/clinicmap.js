// import React, { useState, useRef } from 'react';
// import 'leaflet/dist/leaflet.css';
// import dynamic from 'next/dynamic';

// const ClinicMap = () => {
//     const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
//         ssr: false,
//       });
      
//       const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
//         ssr: false,
//       });
      
//       const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
//         ssr: false,
//       });
      
//       const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//         ssr: false,
//       });
//   const [center, setCenter] = useState({ lat: -4.043477, lng: 39.668205 });
//   const [location, setLocation] = useState({
//     loaded: false,
//     coordinates: { lat: "", lng: "" }
//   });
//   const ZOOM_LEVEL = 9;
//   const mapRef = useRef();

//   const success = position => {
//     setLocation({
//       loaded: true,
//       coordinates: {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       }
//     });
//   };

//   const error = () => {
//     setLocation({
//       loaded: true,
//       error: true
//     });
//   };

//   if (location.loaded === false) {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//       setLocation({
//         loaded: true,
//         error: true
//       });
//     }
//   }

//   return (
//     <>
//       <div className='container'>
//         <div className='container'>
//           <h1 className='text-center-mt-5'>OpenStreetMap Embeded</h1>
//         </div>
//         <div className='row'>
//           <div className='col'>
//             <div className='container'>
//               <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//                 />
//                 {location.loaded && !location.error && (
//                   <Marker
//                     position={[
//                       location.coordinates.lat,
//                       location.coordinates.lng,
//                     ]}
//                   ></Marker>
//                 )}
//               </MapContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ClinicMap;
import { useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const { MapContainer } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  return (
    <MapContainer style={{ width: '100%', height: '100%' }} {...rest} center={[51.505, -0.09]} zoom={13}>
      {typeof children === 'function' ? children(ReactLeaflet, Leaflet) : children}
    </MapContainer>
  );
};

export default Map;
