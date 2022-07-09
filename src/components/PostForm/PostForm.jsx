import * as postAPI from "../../utilities/posts-api";
import { useState, useMemo } from "react";
import FileBase64 from "react-file-base64";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";

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

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* <label>Author Name:</label>
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
                    <label>Animal Type:</label>
          <input
            type="text"
            name="animalType"
            onChange={handleChange}
            value={newPost.animalType}
            placeholder="Ex: Dog"
            required
          />
          
          
          <label>Animal Age:</label>
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

                  <label>Image URL:</label>
        <input
          type="text"
          name="imgURL"
          onChange={handleChange}
          value={newPost.imgURL}
          required
          placeholder="Image URL"
        /> 
          */}

        <Form.Input
          label="Author Name"
          name="userName"
          defaultValue={user.name.toUpperCase()}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Post Title"
            placeholder="Post Title.."
            name="postTitle"
            onChange={handleChange}
            value={newPost.postTitle}
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
            value={newPost.postType}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Pet Name"
            placeholder="Pet Name or Unknown."
            name="name"
            onChange={handleChange}
            value={newPost.name}
            required
          />
          <Form.Input
            label="Pet Type"
            placeholder="Ex: Dog"
            name="animalType"
            onChange={handleChange}
            value={newPost.animalType}
            required
          />
          <Form.Input
            label="Pet Age"
            placeholder="Pet Age or Unknown"
            name="age"
            onChange={handleChange}
            value={newPost.age}
            required
          />
        </Form.Group>
        <Form.Input
          label="Last seen/found"
          placeholder="Ex: New York, NY, USA"
          name="lastAddress"
          onChange={handleChange}
          value={newPost.lastAddress}
          required
        />
        <Form.Input
          label="Reward($)"
          name="reward"
          type="number"
          min="0"
          max="1000"
          onChange={handleChange}
          value={newPost.reward}
        />
        <Form.Input
          label="Contact Info"
          placeholder="Ex: contactme@email.com"
          name="contactInfo"
          onChange={handleChange}
          value={newPost.contactInfo}
          required
        />
        <Form.Input
          label="Day pet was lost/found?:"
          type="date"
          name="date"
          onChange={handleChange}
          value={newPost.date}
        />
        <Form.Input
          label="Image URL / Upload(1 MB per file upload limit):"
          type="text"
          name="imgURL"
          placeholder="http.."
          onChange={handleChange}
          value={newPost.imgURL}
        />

        <FileBase64
          type="file"
          multiple={false}
          name="imgURL"
          onDone={({ base64 }) => setNewPost({ ...newPost, imgURL: base64 })}
        />

        {/* <label>Description:</label> */}
        {/* <input
          type="text"
          name="description"
          onChange={handleChange}
          value={newPost.description}
          placeholder="Description of pet"
        /> */}
        <Form.TextArea
          control={TextArea}
          label="Description"
          placeholder="Desciption of pet..."
          onChange={handleChange}
          value={newPost.description}
          type="text"
        />
        <Form.Checkbox
          control={Checkbox}
          label="I agree to Privacy Policy that there is no privacy policy"
        />
        <Form.Button control={Button}>Submit</Form.Button>
      </Form>

      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
