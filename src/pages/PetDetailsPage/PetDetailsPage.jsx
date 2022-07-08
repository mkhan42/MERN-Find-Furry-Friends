import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
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

import "../../components/Api/map/AdressInput.css";
import Api from "../../components/Api/map/Api";

//import post from "../../../models/post";

const moment = require("moment");
//import user from "../../../models/user";
//import post from "../../../models/post";

export default function PetDetails({ user }) {
  /*========================================
        Post Part
========================================*/

  let { postId } = useParams();
  const [thePost, setThePost] = useState(null);
  const [comments, setComments] = useState([]);
  const postCreatedTime = thePost && moment(thePost.createdAt);
  const postUpdatedTime = thePost && moment(thePost.updatedAt);
  const dateTime = thePost && moment(thePost.date);
  ///btn - to display edit/delete button or not
  let btn = thePost?.user === user._id;

  useEffect(() => {
    // load the post and Comments
    async function fetchPostComment() {
      const po = await postsAPI.getById(postId);
      setThePost(po);
      const com = await commentsAPI.getAll(postId);
      setComments(com);
    }
    fetchPostComment();
  }, [postId]);

  /*========================================
        Event handler
========================================*/

  async function handleDeletePost() {
    const del = await postsAPI.deletePost(postId);
    console.log(del);
    window.location.href = `/AllPosts`;
  }

  function handleEditPost() {
    window.location.href = `/${postId}/EditPost`;
  }

  function addComments(com) {
    setComments([...com]);
  }

  ////////////////////////////////////////////////////////////////
  //       GOOGLE MAP API
  ////////////////////////////////////////////////////////////////
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
      let naddress = JSON.stringify(address);
      clearSuggestions();

      const results = await getGeocode({ address });
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
  ////////////////////////////////////////////////////////////////
  //       GOOGLE MAP API
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="pet-detail-container">
        <h1>This is PetDetails: name, last seen location, Map Api ...</h1>
        {thePost && (
          <>
            <p>Author: {thePost.userName}</p>
            <p>Contact Info: {thePost.contactInfo}</p>
            <p>Post Type: {thePost.postType}</p>

            <p>Post Created at: {postCreatedTime.format("MM/DD/YYYY HH:mm")}</p>
            {/* only show the updated time if there is an update */}
            {thePost.createdAt !== thePost.updatedAt ? (
              <p>
                Post Updated at: {postUpdatedTime.format("MM/DD/YYYY HH:mm")}
              </p>
            ) : (
              " "
            )}
            <p>Title: {thePost.postTitle}</p>
            <p>Animal Name:{thePost.name}</p>
            <p>Animal Type:{thePost.animalType} </p>
            <p>Images: </p>
            <img src={thePost.imgURL} alt={thePost.name} width="200px" />
            <p>Animal Age: {thePost.age}</p>
            <p>Last Seen Location:{thePost.lastAddress} </p>
            <p>reserved place for map api</p>
            <p>Description: {thePost.description}</p>
            <p>Reward($): {thePost.reward}</p>
            <p>Day pet was lost/found?: {dateTime.format("MM/DD/YYYY")}</p>
            <Places />
          </>
        )}
        <br />
        <br />

        {btn && (
          <div>
            <button onClick={handleEditPost}>Edit</button>
            <button onClick={handleDeletePost}>Delete</button>
          </div>
        )}

        <hr />
        <hr />
        <br />
        <br />
      </div>
      {/* Is there any comments? comments.length -not works every time?! */}
      {/* comments for the pet! */}
      {comments?.length ? (
        <>
          <h3>Comments:</h3>
          {comments.map((comment) => {
            return (
              <CommentsCard
                key={comment._id}
                allComments={comments}
                comment={comment}
                setComments={setComments}
                userId={user._id}
              />
            );
          })}
        </>
      ) : (
        <h3>No Comments</h3>
      )}

      {/* New Comment */}
      <h3>Create a New Comment:</h3>
      <CommentsForm addComments={addComments} />
    </>
  );
}
