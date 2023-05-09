import Map from "@/components/Map"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
// import { Icon } from 'leaflet';

function MapPage() {
  const router = useRouter();

  const [DEFAULT_CENTER, setDefaultCenter] = useState([36.8065, 10.1815]);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_CENTER);

  const address = router.query.address;
  
  // const markerIcon = new Icon({
  //   iconUrl: '/marker-icon.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   tooltipAnchor: [16, -28],
  // });
  useEffect(() => {
    // Use a geocoding service to get the latitude and longitude of the address
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);
          setDefaultCenter([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
        }
      });
  }, [address]);

  return (
    <Map width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
      {({ TileLayer, Marker, Popup }) => (
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={markerPosition} >
            <Popup>
              {address}
            </Popup>
          </Marker>
        </>
      )}
    </Map>
  );
}

export default MapPage;
