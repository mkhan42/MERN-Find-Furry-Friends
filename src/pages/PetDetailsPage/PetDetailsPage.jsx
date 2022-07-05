import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCommentsContext } from "../../hooks/useCommentsContext";
import * as commentsAPI from "../../utilities/comments-api";

export default function PetDetails() {
  // let { petId } = useParams();
  // const thePet = petsData.find((element) => element._id === petId);
  // console.log(thePet);

  const [comments, setComments] = useState(null);
  // const { comments, dispatch } = useCommentsContext();

  useEffect(() => {
    // load comments only at the first time
    async function fetchComments() {
      const com = await commentsAPI.getAll();
      setComments(com);
      // dispatch({ type: "SET_COMMENTS", payload: com });
    }
    fetchComments();
  }, []);

  function addComment(comment) {
    setComments({ ...comments, comment });
    console.log(comments); //got array of comment objects
  }

  return (
    <div className="pet-detail-container">
      <h1>This is PetDetails: name, last seen location, Map Api ...</h1>
      <p>Author: </p>
      <p>Contact Info:</p>
      <p>Title: </p>
      <p>Animal Name:</p>
      <p>Animal Type: </p>
      <p>Images: </p>
      <p>Animal Age: </p>
      <p>Last Seen Location: </p>
      <p>reserved place for map api</p>
      <p>Description: </p>
      <p>Reward($): </p>
      <p>Day pet was lost/found?:: </p>
      <br />
      <br />
      <hr />
      <hr />
      <br />
      <br />

      {/* Is there any comments? */}
      {/* comments for the pet! */}
      {comments ? (
        <>
          <h3>Comments:</h3>
          {comments.map((comment) => {
            return <CommentsCard key={comment._id} comment={comment} />;
          })}
        </>
      ) : (
        <h3>No Comments</h3>
      )}

      <CommentsForm addComment={addComment} />
      {/* <CommentsForm
        comments={comments}
        setComments={dispatch({ type: "CREATE_COMMENTS", payload: comments })}
      /> */}
    </div>
  );
}
