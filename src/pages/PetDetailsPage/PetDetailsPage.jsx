import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";

export default function PetDetails() {
  // google map api here? - yes
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

      <CommentsCard />
      <CommentsForm />
    </div>
  );
}
