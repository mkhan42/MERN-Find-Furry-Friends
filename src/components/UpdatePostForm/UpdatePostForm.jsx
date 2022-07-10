import { useEffect, useState } from "react";
import React from "react";
import * as postsAPI from "../../utilities/posts-api";
import { useParams } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { Button, Checkbox, Form, TextArea } from "semantic-ui-react";
import "../PostForm/PostForm.css";

export default function UpdatePostForm({ posts }) {
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
      try {
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
        });
        setCurrentPost(po);
      } catch (error) {
        console.log(error);
      }
    };
    // load the post
    fetchPosts();
  }, []);

  //console.log(currentPost);

  function handleChange(e) {
    e.preventDefault();
    const editPostData = {
      ...editAPost,
      [e.target.name]: e.target.value,
    };
    setEditAPost(editPostData);
  }

  //console.log(newPost);

  async function handleSubmit(e) {
    e.preventDefault();
    const json = await postsAPI.updatePost(postId, { ...editAPost });
    console.log(json);
    //setPosts(newPost)
    setEditAPost({});
    //window.location.href = "/AllPosts"
    window.location.href = `/${json._id}`;
  }

  // function handleEditInputChange(e) {
  //   // set the new state value to what's currently in the edit input box
  //   setCurrentPost({ ...currentPost, text: e.target.value });
  //   console.log(currentTodo);
  // }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* <label>Post Title:</label>
        <input
          type="text"
          name="postTitle"
          onChange={handleChange}
          value={editAPost.postTitle}
        ></input>
        <label>Post Type:</label>
        <select
          name="postType"
          onChange={handleChange}
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

        <FileBase64
          type="file"
          multiple={false}
          name="imgURL"
          onDone={({ base64 }) =>
            setEditAPost({ ...currentPost, imgURL: base64 })
          }
        />

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
        <input type="submit"  /> */}
{/* *************************************************** */}
        <Form.Group widths="equal">
          <Form.Input
            label="Post Title"
            placeholder="Post Title.."
            name="postTitle"
            onChange={handleChange}
            value={editAPost.postTitle}
            required
          />

          <Form.Select
            label="Post Type"
            options={[
              { key: "l", text: "Lost", value: "Lost" },
              { key: "f", text: "Found", value: "Found" },
            ]}
            name="postType"
            onChange={handleChange}
            value={editAPost.postType}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Pet Name"
            placeholder="Pet Name or Unknown."
            name="name"
            onChange={handleChange}
            value={editAPost.name}
            required
          />
          <Form.Input
            label="Pet Type"
            placeholder="Ex: Dog"
            name="animalType"
            onChange={handleChange}
            value={editAPost.animalType}
            required
          />
          <Form.Input
            label="Pet Age"
            placeholder="Pet Age or Unknown"
            name="age"
            onChange={handleChange}
            value={editAPost.age}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            label="Contact Info"
            placeholder="Ex: contactme@email.com"
            name="contactInfo"
            onChange={handleChange}
            value={editAPost.contactInfo}
            required
          />
          <Form.Input
            label="Day pet was lost/found?:"
            type="date"
            name="date"
            onChange={handleChange}
            value={editAPost.date}
          />
          <Form.Input
            label="Reward($)"
            name="reward"
            type="number"
            min="0"
            max="1000"
            onChange={handleChange}
            value={editAPost.reward}
          />
        </Form.Group>
        <Form.Input
          label="Last seen/found"
          placeholder="Ex: New York, NY, USA"
          name="lastAddress"
          onChange={handleChange}
          value={editAPost.lastAddress}
          required
        />
        <Form.Input
          label="Image URL / Upload(1 MB per file upload limit):"
          type="text"
          name="imgURL"
          placeholder="https://..."
          onChange={handleChange}
          value={editAPost.imgURL}
        />
        <p>-------------------------- or -------------------------- </p>
        <FileBase64
          type="file"
          multiple={false}
          name="imgURL"
          onDone={({ base64 }) =>
            setEditAPost({ ...currentPost, imgURL: base64 })
          }
        />

        <Form.TextArea
          label="Description"
          name="description"
          placeholder="Desciption of pet..."
          onChange={handleChange}
          value={editAPost.description}
        />
        {/* <Form.Checkbox
          control={Checkbox}
          label="I agree to Privacy Policy that there is no privacy policy"
        /> */}
        <Form.Button color="blue" fluid control={Button}>
          Submit
        </Form.Button>
      </Form>
    </>
  );
}
