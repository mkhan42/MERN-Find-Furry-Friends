import { useState } from "react";
import * as commentsAPI from "../../utilities/comments-api";

export default function CommentsForm({ postId }) {
  const [newComment, setNewComment] = useState({});
  // console.log("postId:" + postId);

  function handleChange(event) {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log({ ...newComment });
    // it goes to controller
    // POST into dbs
    const json = await commentsAPI.createComment(postId, { ...newComment });
    console.log(json); //got comment id
    //redirect to the post....
    window.location.href = `/${postId}`;
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
