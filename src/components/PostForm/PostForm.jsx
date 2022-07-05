
import * as postAPI from "../../utilities/posts-api";
import { useState, useMemo } from "react";
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

import "../Api/map/AdressInput.css"

export default function PostForm({ posts, setPosts }) {

  // let petURL = `/${posts._id}`;

  const [newPost, setNewPost] = useState({
    postTitle: "",
    postType: "Lost",
    name: "",
    imgURL: "",
    animalType: "",
    age: "",
    lastAddress: "",
    description: "",
    reward: "$5",
    contactInfo: "",
    date: "",
  });
///////////////////////////////////////////////////
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
      clearSuggestions();
  
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    };
  
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          name='lastAddress'
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
          type="text"
        />
   
        <ComboboxInput
          value={value}
          name='lastAddress'
          onChange={handleChange}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
          type="text"
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



///////////////////////////////////////////////////



  function handleChange(e) {
    e.preventDefault();
    const newPostData = {
      ...newPost,
      [e.target.name]: e.target.value,
    };
    setNewPost(newPostData);
    // console.log(newPostData);
  }

  //console.log(newPost);


  async function handleSubmit(e) {
    e.preventDefault();
    const json = await postAPI.createPost({ ...newPost });
    console.log(json);
    //setPosts(newPost)
    setNewPost({});
    //window.location.href = "/AllPosts"
   window.location.href = `/${json._id}`
  }

  return (
    <>
      <h1>this is a create Post form</h1>
      <form onSubmit={handleSubmit}>
        <label>Post Title:</label>
        <input
          type="text"
          name="postTitle"
          onChange={handleChange}
          value={newPost.postTitle}
        ></input>
        <label>Post Type:</label>
        <select
          name="postType"
          onChange={handleChange}
          value={newPost.postType}
        >
          <option>Lost</option>
          <option>Found</option>
        </select>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={newPost.name}
        ></input>
        <label>Image URL:</label>
        <input
          type="text"
          name="imgURL"
          onChange={handleChange}
          value={newPost.imgURL}
        ></input>
        <label>Animal Type:</label>
        <input
          type="text"
          name="animalType"
          onChange={handleChange}
          value={newPost.animalType}
        ></input>
        <label>Age:</label>
        <input
          type="text"
          name="age"
          onChange={handleChange}
          value={newPost.age}
        ></input>
        <label>Last seen/found:</label>
        <Places />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={newPost.description}
        ></input>
        <label>Reward:</label>
        <input
          type="text"
          name="reward"
          onChange={handleChange}
          value={newPost.reward}
        ></input>
        <label>Contact Info:</label>
        <input
          type="text"
          name="contactInfo"
          onChange={handleChange}
          value={newPost.contactInfo}
        ></input>
        <label>Day pet was lost/found?:</label>
        <input
          type="text"
          name="date"
          onChange={handleChange}
          value={newPost.date}
        ></input>
         
      {/* <Link to={`/AllPosts`}> */}
        <input type="submit" onClick={handleSubmit} />
      {/* </Link> */}
      </form>
    </>
  );
}

//
