import "./CommentsCard.css";
import * as commentsAPI from "../../utilities/comments-api";
// import * as usersAPI from "../../utilities/users-api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Comment } from "semantic-ui-react";

const moment = require("moment");

export default function CommentsCard({
  comment,
  allComments,
  setComments,
  userId,
}) {
  // variables
  const { postId } = useParams();
  const time = moment(comment.createdAt);
  let btn = comment?.user === userId;

  ///try to move this to the petDetailsPage
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
    await commentsAPI.deleteComment(comment._id);
    //console.log(deleteCom);
    //window.location.href = `/${postId}`;
    setComments(allComments.filter((com) => com._id !== comment._id));
  }

  return (
    <div className="comments-card-container">
      <Comment.Group>
        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author>{comment.userName}</Comment.Author>
            <Comment.Metadata>
              <div>
                {time.format("MM/DD/YYYY HH:mm")} -{" "}
                {moment.utc(time).local().startOf("seconds").fromNow()}
              </div>
            </Comment.Metadata>
            <Comment.Text>{comment.commentTitle}</Comment.Text>
            <Comment.Text>{comment.content}</Comment.Text>
          </Comment.Content>
        </Comment>
        {btn && (
          <Button
            onClick={handleDelete}
            labelPosition="left"
            icon="trash alternate"
            content="Delete"
          />
        )}
      </Comment.Group>
      {/* <p>
        <strong>Title:</strong> {comment.commentTitle}
      </p>
      <p>
        <strong>Contents:</strong> {comment.content}
      </p>
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
      )} */}
    </div>
  );
}
