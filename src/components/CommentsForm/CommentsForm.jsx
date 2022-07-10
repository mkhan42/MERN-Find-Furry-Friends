import { useState } from "react";
import { useParams } from "react-router-dom";
import * as commentsAPI from "../../utilities/comments-api";
import { Button, Form, TextArea } from "semantic-ui-react";
import "./CommentsForm.css";

export default function CommentsForm({ addComments }) {
  const [newComment, setNewComment] = useState({});
  const [error, setError] = useState("");
  const { postId } = useParams();

  function handleChange(event) {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // POST into dbs - does this work only after refresh?
      await commentsAPI.createComment(postId, {
        ...newComment,
      });

      //redirect to the post....
      //window.location.href = `/${postId}`;
      const allComments = await commentsAPI.getAll(postId);

      // re-render
      addComments(allComments);
      setNewComment({ commentTitle: "", content: "" });
    } catch {
      setError("Invalid Comment - Try Again");
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Title"
          onChange={handleChange}
          type="text"
          value={newComment.commentTitle}
          name="commentTitle"
        />
        <Form.TextArea
          label="Content"
          onChange={handleChange}
          type="text"
          value={newComment.content}
          name="content"
        />
        <Form.Button color="blue" fluid control={Button}>
          Submit
        </Form.Button>
      </Form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
