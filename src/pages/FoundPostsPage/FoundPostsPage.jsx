import PetCard from "../../components/PetCard/PetCard";

export default function FoundPostsPage() {
  // data with type=Found
  // const foundData = ...;
  return (
    <div>
      <h3>this is FoundPostsPage</h3>
      <PetCard />
      <button
        onClick={() => {
          alert("it will jump to Found Page");
        }}
      >
        More in FOUND
      </button>
    </div>
  );
}
