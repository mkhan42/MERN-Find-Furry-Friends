import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PetDetails() {
  // let { petId } = useParams();
  // const thePet = petsData.find((element) => element._id === petId);
  // console.log(thePet);
  const [comments, setComments] = useState([
    {
      commentTitle: "Initialize Title",
      content: "Initialize content",
      user: null, // update from dbs
    },
  ]);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch("/api/comments");
      const json = await response.json();
      if (response.ok) {
        setComments(json);
      }
    }
    fetchComments();
  }, [comments]);

  return (
    <div className="pet-detail-container">
      <h1>This is PetDetails: name, last seen location, Map Api ...</h1>
      <p>Author: </p>
      <p>ContactInfo:</p>
      <p>Title: </p>
      <p>Animal Name:</p>
      <p>Animal Type: </p>
      <p>Images: </p>
      <p>Age: </p>
      <p>Last Seen Location: </p>
      <p>reserved place for map api</p>
      <p>Description: </p>
      <p>Reward($): </p>
      <p>Created Date: </p>
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
          <p>Comments:</p>
          {comments.map((comment) => {
            return <CommentsCard key={comment._id} comment={comment} />;
          })}
        </>
      ) : (
        <p>No Comments</p>
      )}

      <CommentsForm comments={comments} setComments={setComments} />
    </div>
  );
}
