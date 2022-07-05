import { useState } from "react";
import * as commentsAPI from "../../utilities/comments-api";

export default function CommentsForm({ addComment }) {
  const [newComment, setNewComment] = useState({});
  // const [error, setError] = useState(null);

  function handleChange(event) {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log({ ...newComment });
    // it goes to controller
    // POST into dbs
    const json = await commentsAPI.createComment({ ...newComment });
    console.log(json); //got comment id
    // ???
    //setComments({ ...comments, ...newComment }); //got a warning - not working
    // BUG: TypeError: comments.map is not a function
    // addComment({ ...newComment });
    setNewComment({});
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
