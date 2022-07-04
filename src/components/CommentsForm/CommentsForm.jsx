import { useState } from "react";

export default function CommentsForm({ comments, setComments }) {
  const [newComment, setNewComment] = useState({});
  const [error, setError] = useState(null);

  function handleChange(event) {
    event.preventDefault();
    setNewComment({
      [event.target.name]: event.target.value,
    });
  }
  // JSON.stringify([

  //   {
  //     commentTitle: event.target.commentTitle,
  //     content: event.target.content,
  //   },    ])
  async function handleSubmit(event) {
    event.preventDefault();
    // to post the new data
    const comment = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json;

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setNewComment({});
      setError(null);
      console.log("new comment added");
    }
  }

  return (
    <form className="create-comment" onSubmit={handleSubmit}>
      <label>Comment Title: </label>
      <input
        onChange={handleChange}
        type="text"
        value={newComment.commentTitle}
        name="commentTitle"
      ></input>
      <label>Content:</label>
      <input
        onChange={handleChange}
        type="text"
        value={newComment.content}
        name="content"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
