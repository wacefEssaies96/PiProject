import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { withSSR } from "next-ssr";
import dynamic  from "next/dynamic";
// import * as parkData from "./data/datamap.json"

function Map({ address}) {
    const [position, setPosition] = useState([0,0]);

  useEffect(() => {
    // Use an external geocoding API to get the coordinates of the address
    fetch(`http://nominatim.openstreetmap.org/search?q=${address}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0 && data[0]) {
          // Set the position to the first result returned by the API
          setPosition([data[0].lat, data[0].lon]);
        }
      });
  }, [address]);
// useEffect(() => {
//     // Use Photon API to get the coordinates of the address
//     fetch(`https://photon.komoot.de/api/?q=${address}&format=json`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.features && data.features.length > 0) {
//           // Set the position to the coordinates returned by the API
//           setPosition([
//             data.features[0].geometry.coordinates[1],
//             data.features[0].geometry.coordinates[0],
//           ]);
//         }
//       });
//   }, [address]);
  

  
  const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
    ssr: false,
  });

  const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
    ssr: false,
  });

  const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
    ssr: false,
  });
  const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
  });


  return (
    <div style={{ width: "800px", height: "300px" }}>
      <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={position}>
            <Popup>{address}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
