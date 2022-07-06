import { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./Api.css"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

export default function Api() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCGBOGKipXcebuQ9uROeeHPyeIsG_CQQx4',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

async function Map() {
 

const results = await getGeocode("Washington D.C. Temple, Stoneybrook Drive, Kensington, MD, USA");
const { lat, lng } = await getLatLng(results[0]);
// setSelected({ lat, lng });
const center = useMemo(() => ({ lat, lng}), []);
  return (
    <GoogleMap 
    zoom={10} 
    center={center}
    mapContainerClassName="map-container">
    <Marker position={center} />
    </GoogleMap>
  );
}
