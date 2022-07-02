// import * as usersService from "../../utilities/users-service";
import PetCard from "../../components/PetCard/PetCard";

export default function LostPostsPage() {
  // data with type=Lost
  // const lostData = ...;
  return (
    <>
      <h3>This is LostPostsPage</h3>
      <PetCard />

      <button
        onClick={() => {
          alert("it will jump to Lost Page");
        }}
      >
        More in LOST
      </button>
    </>
  );
}
