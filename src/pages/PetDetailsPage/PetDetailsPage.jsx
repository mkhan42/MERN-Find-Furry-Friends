import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import { useParams } from "react-router-dom";

export default function PetDetails({ comments, setComments }) {
  // let { petId } = useParams();
  // const thePet = petsData.find((element) => element._id === petId);
  // console.log(thePet);

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
          <CommentsCard comments={comments} />
        </>
      ) : (
        <p>No Comments</p>
      )}

      <CommentsForm setComments={setComments} />
    </div>
  );
}
