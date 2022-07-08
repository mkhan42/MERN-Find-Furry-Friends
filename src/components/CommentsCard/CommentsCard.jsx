import "./CommentsCard.css";
import * as commentsAPI from "../../utilities/comments-api";
// import * as usersAPI from "../../utilities/users-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const moment = require("moment");

export default function CommentsCard({ comment, userId }) {
  // variables
  const { postId } = useParams();
  const time = moment(comment.createdAt);
  let btn = comment?.user === userId;
  console.log("button: " + btn); //re-render is still false, after refresh, then it's true
  console.log(comment);
  console.log(comment?.user); //undefined
  console.log(userId); //id

  ///try to move it to the petDetailsPage
  // comment.user is the author of the comment
  // console.log("comment_userid: " + comment.user); //undefined
  //console.log("comment_userName: " + comment.userName);
  // const [author, setAuthor] = useState("");
  // //get comment author name by user id - this is not working???
  // useEffect(() => {
  //   async function fetchCommentAuthorName() {
  //     // this is a promise?!
  //     const newAuthor = await usersAPI.getUserInfoById(comment.user);
  //     setAuthor(newAuthor);
  //   }
  //   fetchCommentAuthorName();
  // }, []);
  // console.log("author name: " + author);

  /*========================================
        Event Handlers
========================================*/

  async function handleDelete() {
    // if the user of the comment is same as the login user
    const deleteCom = await commentsAPI.deleteComment(comment._id);
    //console.log(deleteCom);
    // need to refresh it
    window.location.href = `/${postId}`;
  }

  return (
    <div className="comments-card-container">
      <p>
        <strong>Title:</strong> {comment.commentTitle}
      </p>
      <p>
        <strong>Contents:</strong> {comment.content}
      </p>
      {/* Need the comment author name .. not the user name/post author name */}
      <p>
        <strong>Author:</strong> {comment.userName}
      </p>
      <p>
        <strong>Created Date:</strong> {time.format("MM/DD/YYYY HH:mm")}
      </p>
      {btn && (
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
