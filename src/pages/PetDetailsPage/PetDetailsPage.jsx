import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import {
  Button,
  Icon,
  Label,
  Divider,
  Header,
  Grid,
  Image,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import * as commentsAPI from "../../utilities/comments-api";
import * as postsAPI from "../../utilities/posts-api";
import { ChakraProvider, theme } from '@chakra-ui/react'
import React from 'react'
// import "@reach/combobox/styles.css";
import Map from "../../components/Api/map/Api"
// import "../../components/Api/map/AdressInput.css";
// import Api from "../../components/Api/map/Api";

import "./PetDetailsPage.css";

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
    <div className="pet-detail-page">
      <div className="pet-detail-container">
        <h1>Post Details</h1>

        <Grid>
          {thePost && (
            <>
              <Grid.Column width={4} className="post-details-info">
                {/********* Post info **********/}
                <Header as="h2">
                  <Image
                    circular
                    src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
                  />{" "}
                  {thePost.userName}
                </Header>
                <Header as="h3">
                  <p>Contact Info: {thePost.contactInfo}</p>
                  <p>Post Type: {thePost.postType}</p>
                </Header>
                <Header as="h4">
                  <p>
                    Post Created at:{" "}
                    {postCreatedTime.format("MM/DD/YYYY HH:mm")}
                  </p>


                  {/* only show the updated time if there is an update */}
                  {thePost.createdAt !== thePost.updatedAt ? (
                    <p>
                      Post Updated at:{" "}
                      {postUpdatedTime.format("MM/DD/YYYY HH:mm")}
                    </p>
                  ) : (
                    " "
                  )}
                </Header>
                {btn && (
                  <div>
                    <p>As Author, you can:</p>
                    <Button
                      icon="edit"
                      content="Edit"
                      color="green"
                      size="small"
                      onClick={handleEditPost}
                    />
                    <Button
                      icon="trash alternate"
                      content="Delete"
                      size="small"
                      onClick={handleDeletePost}
                    />
                  </div>
                )}
              </Grid.Column>

              {/* ********* Post Details ************** */}
              <Grid.Column width={9} className="post-details-details">
                <h2> {thePost.postTitle.toUpperCase()}</h2>
                <p>name: {thePost.name.toUpperCase()}</p>
                <p>type: {thePost.animalType} </p>
                <p>age: {thePost.age}</p>
                <Image
                  src={thePost.imgURL}
                  alt={thePost.name}
                  size="large"
                  rounded
                />
                <p>Description: {thePost.description}</p>
                <p>Reward($): {thePost.reward}</p>
                <p>Day pet was lost/found?: {dateTime.format("MM/DD/YYYY")}</p>
                <p>Last Seen Location: {thePost.lastAddress} </p>
                {/* <Map /> */}
                <React.StrictMode>
            <ChakraProvider  theme={theme}>
            <Map lastAddress={thePost.lastAddress} />
            </ChakraProvider>
            </React.StrictMode>
              </Grid.Column>
              <Grid.Column width={1}>
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
              </Grid.Column>
            </>
          )}
        </Grid>

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
        <h2 className="comments-card-container">No Comments</h2>
      )}

      {/* New Comment */}
      <Divider horizontal>
        <Header as="h3">
          <Icon name="comment alternate outline" />
          Create a New Comment
        </Header>
      </Divider>
      <div className="add-form-container">
        <CommentsForm addComments={addComments} />
      </div>
    </div>
  );
}
