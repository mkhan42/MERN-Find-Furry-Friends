import "./AdressInput.css"
import {
    Button,
    Input,
    SkeletonText,
  } from "@chakra-ui/react";
  
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from "@react-google-maps/api";
  import { useRef, useState } from "react";
  
  const center = { lat: 38.9072, lng: -77.0369 };
  
  export default function Map({lastAddress}) {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });
  
    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const originRef = useRef();
  
    const destiantionRef = useRef();
  
    if (!isLoaded) {
      return <SkeletonText />;
    }
  
    async function calculateRoute() {
      if (originRef.current.value === "" || destiantionRef.current.value === "") {
        return;
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }

   
    return (
      <>
        <GoogleMap
          center={center}
          zoom={15}
         mapContainerClassName="map-container"
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
  
        <Autocomplete>
          <Input type="text" placeholder="Your Adress" ref={originRef} />
        </Autocomplete>
  
        <Autocomplete>
          <Input type="text"  ref={destiantionRef} value={lastAddress}/>
        </Autocomplete>       
          <Button colorScheme="green" type="submit" onClick={calculateRoute}>
            Calculate Route
          </Button>
        
      
  
        <h1>Distance: {distance} </h1>
        <h1>Duration: {duration} </h1>
      </>
    );
  }
  