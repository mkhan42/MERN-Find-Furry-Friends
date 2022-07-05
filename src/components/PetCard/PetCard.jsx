import { Link } from "react-router-dom";

export default function PetCard() {
  // TBD???
  // for example: /found/12345 or /lost/12346
  // let petURL = `/${petData.type}/${petData.id}`;
  // how many comments
  return (
    <>
      <Link to={"/:petId"}>
        This is a PetCard ant its link to the Pet Details Page
      </Link>
    </>
  );
}
