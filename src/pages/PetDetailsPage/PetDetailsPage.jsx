import CommentsCard from "../../components/CommentsCard/CommentsCard";
import CommentsForm from "../../components/CommentsForm/CommentsForm";

export default function PetDetails() {
  // google map api here? - yes
  return (
    <div className="pet-detail-container">
      <h1>This is PetDetails, name, last seen location, ...</h1>
      {/* TBD */}
      <button onClick={"/"}>Edit</button>
      <CommentsCard />
      <CommentsForm />
    </div>
  );
}
