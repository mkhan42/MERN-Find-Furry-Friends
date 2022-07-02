import { Link } from "react-router-dom";

export default function PetCard() {
  // TBD???
  // for example: /found/12345 or /lost/12346
  // let petURL = `/${petData.type}/${petData.id}`;

  return (
    <>
      <h4>This is a PetCard</h4>
      <Link to={"/"}> This is a link to the Pet Details Page</Link>
    </>
  );
}
