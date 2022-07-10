import * as postAPI from "../../utilities/posts-api";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { Button, Checkbox, Form, TextArea, Divider } from "semantic-ui-react";
import "./PostForm.css";

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
    reward: "",
    contactInfo: "",
    date: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    console.log(e);
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

        <Form.Group widths="equal">
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
            label="Reward($)"
            name="reward"
            type="number"
            min="0"
            max="1000"
            onChange={handleChange}
            value={newPost.reward}
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
          label="Image URL / Upload(1 MB per file upload limit):"
          type="text"
          name="imgURL"
          placeholder="https://..."
          onChange={handleChange}
          value={newPost.imgURL}
        />
        <Divider horizontal>Or</Divider>
        {/*****************  not working??? ****************/}
        <FileBase64
          type="file"
          multiple={false}
          name="imgURL"
          onDone={({ base64 }) => setNewPost({ ...newPost, imgURL: base64 })}
        />
        {/* <input
          placeholder="or Upload(1 MB per file upload limit):"
          type="file"
          name="imgURL"
          value={newPost.imgURL}
          onChange={handleChange}
        /> */}

        <Form.TextArea
          label="Description"
          name="description"
          placeholder="Desciption of pet..."
          onChange={handleChange}
          value={newPost.description}
        />
        {/* <Form.Checkbox
          control={Checkbox}
          label="I agree to Privacy Policy that there is no privacy policy"
        /> */}
        <Form.Button color="blue" fluid control={Button}>
          Submit
        </Form.Button>
      </Form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
