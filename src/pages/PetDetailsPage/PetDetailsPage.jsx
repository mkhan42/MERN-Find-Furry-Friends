import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { Button, Icon, Label, Divider, Header } from "semantic-ui-react";

import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
//import { useCommentsContext } from "../../hooks/useCommentsContext";
import * as commentsAPI from "../../utilities/comments-api";
import * as postsAPI from "../../utilities/posts-api";
import { ChakraProvider, theme } from '@chakra-ui/react'
// import React from 'react'
// import "@reach/combobox/styles.css";
import Map from "../../components/Api/map/Api"
// import "../../components/Api/map/AdressInput.css";
// import Api from "../../components/Api/map/Api";

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
  const [upvote, setUpvote] = useState(0);
  const [voted, setVoted] = useState(false);
  const [unvotedColor, setUnvotedColor] = useState("grey");
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
    //console.log(del);
    window.location.href = `/AllPosts`;
  }

  function handleEditPost() {
    window.location.href = `/${postId}/EditPost`;
  }

  function addComments(com) {
    setComments([...com]);
  }

  function handleUpvote() {
    setUpvote(!voted ? upvote + 1 : upvote - 1);
    setVoted(!voted);
    setUnvotedColor(!voted ? "red" : "grey");
  }

  ////////////////////////////////////////////////////////////////
  //       GOOGLE MAP API
  // ////////////////////////////////////////////////////////////////
  
    
  ////////////////////////////////////////////////////////////////
  //       GOOGLE MAP API
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="pet-detail-container">
        <h1>Post Details</h1>

        {thePost && (
          <>
            <p>Posted by: {thePost.userName}</p>
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
            {/* <Divider horizontal>
              <Header as="h4">
                <Icon name="tag" />
                Description
              </Header>
            </Divider> */}
            <p>Title: {thePost.postTitle}</p>
            <p>Animal Name:{thePost.name}</p>
            <p>Animal Type:{thePost.animalType} </p>
            <img src={thePost.imgURL} alt={thePost.name} width="600px" />
            <p>Animal Age: {thePost.age}</p>
            <p>Last Seen Location: {thePost.lastAddress} </p>

            <p>Description: {thePost.description}</p>
            <p>Reward($): {thePost.reward}</p>
            <p>Day pet was lost/found?: {dateTime.format("MM/DD/YYYY")}</p>
            <React.StrictMode>
            <ChakraProvider theme={theme}>
            <Map lastAddress={thePost.lastAddress} />
            </ChakraProvider>
            </React.StrictMode>
         
          </>
        )}
        <br />
        <br />

      
          <div>
            <Button
              icon="edit"
              content="Edit"
              color="green"
              onClick={handleEditPost}
            />
            <Button
              icon="trash alternate"
              content="Delete"
              onClick={handleDeletePost}
            />
          </div>
    

        <Button
          color="red"
          content="Upvote"
          icon="angle double up"
          label={{
            basic: true,
            color: unvotedColor,
            pointing: "left",
            content: upvote,
          }}
          onClick={handleUpvote}
        />
      </div>

      <Divider horizontal>
        <Header as="h3">
          <Icon name="comments outline" />
          Comments
        </Header>
      </Divider>

      {/* Is there any comments? comments.length -not works every time?! */}
      {/* comments for the pet! */}
      {comments?.length ? (
        <>
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
        <h2>No Comments</h2>
      )}

      {/* New Comment */}
      <Divider horizontal>
        <Header as="h3">
          <Icon name="comment alternate outline" />
          Create a New Comment
        </Header>
      </Divider>

      <CommentsForm addComments={addComments} />
    </>
  );
}
