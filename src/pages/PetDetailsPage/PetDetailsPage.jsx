import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState ,useMemo} from "react";
//import { useCommentsContext } from "../../hooks/useCommentsContext";
import * as commentsAPI from "../../utilities/comments-api";
import * as postsAPI from "../../utilities/posts-api";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import "../../components/Api/map/AdressInput.css"
import Api from "../../components/Api/map/Api"

//import post from "../../../models/post";


export default function PetDetails() {
  /*========================================
        Post Part
========================================*/

  let { postId } = useParams();
  const [thePost, setThePost] = useState(null);

  useEffect(() => {
    // load the post
    async function fetchPosts() {
      const po = await postsAPI.getById(postId);
      console.log(po);
      setThePost(po);
    }
    fetchPosts();
  }, []);

  /*========================================
        Comments Part
========================================*/

  const [comments, setComments] = useState([]);
  // const { comments, dispatch } = useCommentsContext();

  useEffect(() => {
    // load comments only at the first time
    async function fetchComments() {
      const com = await commentsAPI.getAll(postId);
      setComments(com);
      // dispatch({ type: "SET_COMMENTS", payload: com });
    }
    fetchComments();
  }, []);

  // function addComment(comment) {
  //   setComments({ ...comments, comment });
  //   console.log(comments); //got array of comment objects
  // }

  let editURL = `/${postId}/EditPost`;

  function Places() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: 'AIzaSyCGBOGKipXcebuQ9uROeeHPyeIsG_CQQx4',
      libraries: ["places"],
    });
  
    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
  }
  
  function Map() {
    const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
    const [selected, setSelected] = useState(null);
  
    return (
      <>
        <div className="places-container">
          <PlacesAutocomplete setSelected={setSelected} />
        </div>
  
        <GoogleMap
          zoom={15}
          center={selected}
          mapContainerClassName="map-container"
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </>
    );
  }
  
  const PlacesAutocomplete = ({ setSelected }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (address) => {
      setValue(address, false);
      let naddress = JSON.stringify(address)
      clearSuggestions();
      
      const results = await getGeocode({ address});
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    };
    // handleSelect()
    return (
      <Combobox onSelect={handleSelect}>
        {/* <ComboboxInput
         value={thePost.lastAddress}
          onChange={(e) => setValue(thePost.lastAddress)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
          name="lastAddress"
        /> */}
         <ComboboxInput
         value={thePost.lastAddress}
         onSelect={(e) => setValue(thePost.lastAddress)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
          name="lastAddress"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
       
      </Combobox>
    );
  };
  
 
  

  return (
    <>
      <div className="pet-detail-container">
        <h1>This is PetDetails: name, last seen location, Map Api ...</h1>
        {thePost && (

        <>
        <p>Author: </p>
        <p>Contact Info: {thePost.contactInfo}</p>
        <p>Title: {thePost.postTitle}</p>
        <p>Animal Name:{thePost.name}</p>
        <p>Animal Type:{thePost.animalType} </p>
        <p>Images: </p>
        <img src={thePost.imgURL} alt={thePost.name} />
        <p>Animal Age: {thePost.age}</p>
        <p>Last Seen Location: {thePost.age}</p>
        <p>reserved place for map api</p>
        <p>Description: {thePost.description}</p>
        <p>Reward($): {thePost.reward}</p>
        <p>Day pet was lost/found?: {thePost.date}</p>
       <Places/>
     {/* < Api/>  */}
        </>


        )}
        <br />
        <br />
        <hr />
        <hr />
        <br />
        <br />
        {/* </div>let petURL = `/${post._id}`; */}
        <a href={editURL}>
          <button>Edit</button>
        </a>
      </div>
      {/* Is there any comments? comments.length -not works every time?! */}
      {/* comments for the pet! */}
      {comments ? (
        <>
          <h3>Comments:</h3>
          {comments.map((comment) => {
            return <CommentsCard key={comment._id} comment={comment} />;
          })}
        </>
      ) : (
        <h3>No Comments</h3>
      )}
      <h3>Create a New Comment:</h3>
      <CommentsForm postId={postId} />
      {/* <CommentsForm
        comments={comments}
        setComments={dispatch({ type: "CREATE_COMMENTS", payload: comments })}
      /> */}
    </>
  );
}
