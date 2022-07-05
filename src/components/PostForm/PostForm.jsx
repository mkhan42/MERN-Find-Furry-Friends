import { useState } from "react";
import * as postAPI from "../../utilities/posts-api";
import { Link, Navigate } from "react-router-dom";

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

  // let petURL = `/${posts._id}`;

  // async function handleAddToPosts(e) {

  //   const addNewPost = await postsAPI.addPost(postData);

  //   setPosts(addNewPost);
  // }

  // useEffect(() => {
  //   // load comments only at the first time
  //   async function fetchComments() {
  //     const com = await commentsAPI.getAll();
  //     setComments(com);
  //     // dispatch({ type: "SET_COMMENTS", payload: com });
  //   }
  //   fetchComments();
  // }, []);

  // function addComment(comment) {
  //   setComments({ ...comments, comment });
  //   console.log(comments); //got array of comment objects
  // }

  function handleChange(e) {
    e.preventDefault();
    const newPostData = {
      ...newPost,
      [e.target.name]: e.target.value,
    };
    setNewPost(newPostData);
    // console.log(newPostData);
  }

  let temp = {}

  async function handleSubmit(e) {
    e.preventDefault();
    const json = await postAPI.createPost({ ...newPost });
    console.log(json);
    temp = json;
    console.log(temp);
    //setPosts(newPost)
    setNewPost({});
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
        <input
          type="text"
          name="lastAddress"
          placeholder="Address"
          onChange={handleChange}
          value={newPost.lastAddress}
        ></input>
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
      <Link to={`/AllPosts`}>
        <input type="submit" />
      </Link>
      </form>
    </>
  );
}

//
