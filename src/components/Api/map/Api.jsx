import { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Api.css"

export default function Api() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCGBOGKipXcebuQ9uROeeHPyeIsG_CQQx4',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 8.9806, lng: 38.7578 }), []);

  return (
    <GoogleMap 
    zoom={15} 
    center={center}
    mapContainerClassName="map-container">
    <Marker position={center} />
    </GoogleMap>
  );
}
