import { useEffect, useState } from "react";
import * as postsAPI from "../../utilities/posts-api";
import { useParams } from "react-router-dom";

export default function UpdatePostForm({posts}) {

  const [currentPost, setCurrentPost] = useState({});
  let { postId } = useParams();
  const [editAPost, setEditAPost] = useState({
    postTitle: "",
    postType: "",
    name: "",
    imgURL: "",
    animalType: "",
    age: "",
    lastAddress: "",
    description: "",
    reward: "",
    contactInfo: "",
    date: "",
  });



useEffect(() => {
  const fetchPosts = async () => {
    try{
      const po = await postsAPI.getById(postId);
      setEditAPost({
        postTitle: po.postTitle,
        postType: po.postType,
        name: po.name,
        imgURL: po.imgURL,
        animalType: po.animalType,
        age: po.age,
        lastAddress: po.lastAddress,
        description: po.description,
        reward: po.reward,
        contactInfo: po.contactInfo,
        date: po.date,
      })
      console.log(po, "ZOHAIB");
      setCurrentPost(po);
    } catch (error){
      console.log(error)
    }
  }
  // load the post
  fetchPosts();

}, []);

console.log(currentPost)

console.log(editAPost, "MICHALLE")

function handleChange(e) {
  e.preventDefault();
  const editPostData = {
    ...editAPost,
    [e.target.name]: e.target.value,
  };
  setEditAPost(editPostData);
  // console.log(newPostData);
}

//console.log(newPost);


async function handleSubmit(e) {
  e.preventDefault();
  const json = await postsAPI.updatePost(postId, {...editAPost });
  console.log(json);
  //setPosts(newPost)
  setEditAPost({});
  //window.location.href = "/AllPosts"
 window.location.href = `/${json._id}`
}

// function handleEditInputChange(e) {
//   // set the new state value to what's currently in the edit input box
//   setCurrentPost({ ...currentPost, text: e.target.value });
//   console.log(currentTodo);
// }

  return (
    <>
    <h1>this is edit Post form</h1>
    <form onSubmit={handleSubmit}>
      <label>Post Title:</label>
      <input
        type="text"
        name="postTitle"
        onChange={handleChange}
        value={editAPost.postTitle}
        // defaultValue={thePost.postTitle}
      ></input>
      <label>Post Type:</label>
      <select
        name="postType"
        onChange={handleChange}
        //defaultValue={thePost.postType}
        value={editAPost.postType}
      >
        <option>Lost</option>
        <option>Found</option>
      </select>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={editAPost.name}
      ></input>
      <label>Image URL:</label>
      <input
        type="text"
        name="imgURL"
        onChange={handleChange}
        value={editAPost.imgURL}
      ></input>
      <label>Animal Type:</label>
      <input
        type="text"
        name="animalType"
        onChange={handleChange}
        value={editAPost.animalType}
      ></input>
      <label>Age:</label>
      <input
        type="text"
        name="age"
        onChange={handleChange}
        value={editAPost.age}
      ></input>
      <label>Last seen/found:</label>
      <input
        type="text"
        name="lastAddress"
        placeholder="Address"
        onChange={handleChange}
        value={editAPost.lastAddress}
      ></input>
      <label>Description:</label>
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={editAPost.description}
      ></input>
      <label>Reward:</label>
      <input
        type="text"
        name="reward"
        onChange={handleChange}
        value={editAPost.reward}
      ></input>
      <label>Contact Info:</label>
      <input
        type="text"
        name="contactInfo"
        onChange={handleChange}
        value={editAPost.contactInfo}
      ></input>
      <label>Day pet was lost/found?:</label>
      <input
        type="text"
        name="date"
        onChange={handleChange}
        value={editAPost.date}
      ></input>
    {/* <Link to={`/AllPosts`}> */}
      <input type="submit" onClick={handleSubmit} />
    {/* </Link> */}
    </form>
  </>
  )
}
