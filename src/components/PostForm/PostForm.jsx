import * as postAPI from "../../utilities/posts-api";
import { useState, useMemo } from "react";
import FileBase64 from "react-file-base64";

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
import "../Api/map/AdressInput.css";

export default function PostForm({ user }) {
  const [newPost, setNewPost] = useState({
    postTitle: "",
    postType: "Lost",
    name: "",
    imgURL: "",
    animalType: "",
    age: "",
    lastAddress: "",
    description: "",
    reward: "$5 or none",
    contactInfo: "",
    date: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    e.preventDefault();
    const newPostData = {
      ...newPost,
      [e.target.name]: e.target.value,
    };
    setNewPost(newPostData);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const json = await postAPI.createPost({ ...newPost });
      setNewPost({});
      window.location.href = `/${json._id}`;
    } catch {
      setError("Form Submission Failed - Try again");
    }
  }

  //let errTitle = newPost.postTitle = ''

  ///////////////////////////////////////////

  function Places() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCGBOGKipXcebuQ9uROeeHPyeIsG_CQQx4",
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
      <>
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            name="lastAddress"
            onChange={(e) => setValue(e.target.value)}
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

        <Combobox onChange={handleChange}>
          <ComboboxInput
            value={newPost.lastAddress}
            name="lastAddress"
            onChange={setNewPost}
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
      </>
    );
  };

  ///////////////////////////////////////////

  return (
    <>
      <h1>this is a create Post form</h1>
      <form onSubmit={handleSubmit}>
        <label>Author Name:</label>
        <input
          type="text"
          name="userName"
          defaultValue={user.name.toUpperCase()}
        />

        <label>Post Title:</label>
        <input
          type="text"
          name="postTitle"
          onChange={handleChange}
          value={newPost.postTitle}
          placeholder="Post Title"
          required
        />
        <label>Post Type:</label>
        <select
          name="postType"
          onChange={handleChange}
          value={newPost.postType}
          required
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
          placeholder="Pet Name or Unknown"
          required
        />

        {/* <label>Image URL:</label>
        <input
          type="text"
          name="imgURL"
          onChange={handleChange}
          value={newPost.imgURL}
          required
          placeholder="Image URL"
        /> */}
        <FileBase64
          type="file"
          multiple={false}
          name="imgURL"
          onDone={({ base64 }) => setNewPost({ ...newPost, imgURL: base64 })}
        />
        <br />
        <label>Animal Type:</label>
        <input
          type="text"
          name="animalType"
          onChange={handleChange}
          value={newPost.animalType}
          placeholder="Animal Type: Ex: Dog"
          required
        />
        <br />
        <label>Age:</label>
        <input
          type="text"
          name="age"
          onChange={handleChange}
          value={newPost.age}
          placeholder="Pet Age or Unknown"
        />

        <label>Last seen/found:</label>

        <input
          type="text"
          name="lastAddress"
          onChange={handleChange}
          value={newPost.lastAddress}
          placeholder="Ex: New York, NY, USA"
          required
        />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={newPost.description}
          placeholder="Description of pet"
        />
        <label>Reward:</label>
        <input
          type="text"
          name="reward"
          onChange={handleChange}
          value={newPost.reward}
        />
        <label>Contact Info:</label>
        <input
          type="email"
          name="contactInfo"
          onChange={handleChange}
          value={newPost.contactInfo}
          required
          placeholder="Ex: contactme@email.com"
        />
        <label>Day pet was lost/found?:</label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={newPost.date}
        />
        <input type="submit" onClick={handleSubmit} />
      </form>

      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
