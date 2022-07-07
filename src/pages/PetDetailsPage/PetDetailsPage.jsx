import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { useCommentsContext } from "../../hooks/useCommentsContext";
import * as commentsAPI from "../../utilities/comments-api";
import * as postsAPI from "../../utilities/posts-api";
//import user from "../../../models/user";
//import post from "../../../models/post";

export default function PetDetails({ user }) {
  /*========================================
        Post Part
========================================*/

  let { postId } = useParams();
  const [thePost, setThePost] = useState(null);
  const [comments, setComments] = useState([]);


  // const disableBtn = thePost.user !== user._id
  // const { comments, dispatch } = useCommentsContext();

  useEffect(() => {
    // load the post
    async function fetchPosts() {
      const po = await postsAPI.getById(postId);
      console.log(po);
      setThePost(po);
    }
    fetchPosts();


    // load comments only at the first time
    async function fetchComments() {
      const com = await commentsAPI.getAll(postId);
      setComments(com);
    }
    fetchComments();
    // why warning??? React Hook useEffect has a missing dependency: 'postId'.
  }, []);

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
  
  let btn = thePost?.user === user._id

  return (
    <>
      <div className="pet-detail-container">
        <h1>This is PetDetails: name, last seen location, Map Api ...</h1>
        {thePost && (
          <>
            <p>Author: {thePost.userName}</p>
            <p>Contact Info: {thePost.contactInfo}</p>
            <p>Post Type: {thePost.postType}</p>
            {/* Need to update time later --- */}
            <p>Post Created at: {thePost.createdAt}</p>
            <p>Post Updated at: {thePost.updatedAt}</p>
            <p>Title: {thePost.postTitle}</p>
            <p>Animal Name:{thePost.name}</p>
            <p>Animal Type:{thePost.animalType} </p>
            <p>Images: </p>
            <img src={thePost.imgURL} alt={thePost.name} width="200px" />
            <p>Animal Age: {thePost.age}</p>
            <p>Last Seen Location: </p>
            <p>reserved place for map api</p>
            <p>Description: {thePost.description}</p>
            <p>Reward($): {thePost.reward}</p>
            <p>Day pet was lost/found?: {thePost.date}</p>
          </>
        )}
        <br />
        <br />
        <hr />
        <hr />
        <br />
        <br />

        {btn && (
          <div>
            <button onClick={handleEditPost}>Edit</button>
            <button onClick={handleDeletePost}>Delete</button>
          </div> )
        }
      </div>
      {/* Is there any comments? comments.length -not works every time?! */}
      {/* comments for the pet! */}
      {comments ? (
        <>
          <h3>Comments:</h3>
          {comments.map((comment) => {
            return (
              <CommentsCard key={comment._id} comment={comment} user={user} thePost={thePost}/>
            );
          })}
        </>
      ) : (
        <h3>No Comments</h3>
      )}

      {/* New Comment */}
      <h3>Create a New Comment:</h3>
      <CommentsForm />
    </>
  );
}
