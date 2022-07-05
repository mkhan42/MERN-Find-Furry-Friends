import { useState, useEffect, useRef } from 'react';
import * as postsAPI from '../../utilities/posts-api';
import { Routes, Route, Navigate } from 'react-router-dom';
export default function PostForm( { posts, setPosts } ) {
  const [newPost, setNewPost] = useState({
    postTitle: "",
    postType: 'Lost',
    name: "",
    imgURL: "",
    animalType: "",
    age: "",
    lastAddress: "",
    description: "",
    reward: "$5",
    contactInfo: "",
    date: ""
  });

  // async function handleAddToPosts(e) {

  //   const addNewPost = await postsAPI.addPost(postData);

  //   setPosts(addNewPost);
  // }

  function handleChange(e) {
    e.preventDefault();
    const newPostData = {
      ...newPost,
      [e.target.name]: e.target.value }
      setNewPost(newPostData)
    }



  function handleSubmit(e) {
    e.preventDefault();
    setPosts(newPost)
    setNewPost(newPost)
  }

  return (
    <>
      <h1>this is a create Post form</h1>
      <form onSubmit={handleSubmit}>
        <label>Post Title:</label>
        <input type="text" name="postTitle" onChange={handleChange}></input>
        <label>Post Type:</label>
       <select name="postType" onChange={handleChange}>
         <option>Lost</option>
         <option>Found</option>
       </select>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange}></input>
        <label>Image URL:</label>
        <input type="text" name="imgURL" onChange={handleChange}></input>
        <label>Animal Type:</label>
        <input type="text" name="animalType" onChange={handleChange}></input>
        <label>Age:</label>
        <input type="text" name="age" onChange={handleChange}></input>
        <label>Last seen/found:</label>
        <input type="text" name="lastAddress" placeholder="Address" onChange={handleChange}></input>
        <label>Description:</label>
        <input type="text" name="description" onChange={handleChange}></input>
        <label>Reward:</label>
        <input type="text" name="reward" onChange={handleChange}></input>
        <label>Contact Info:</label>
        <input type="text" name="contactInfo" onChange={handleChange}></input>
        <label>Day pet was lost/found?:</label>
        <input type="text" name="date" onChange={handleChange}></input>
        <input type="submit"/>
      </form>
    </>
  );
}
