// import LostPostsPage from "../LostPostsPage/LostPostsPage";
// import FoundPostsPage from "../FoundPostsPage/FoundPostsPage";
import PetCard from "../../components/PetCard/PetCard";

import { Link } from "react-router-dom";
export default function AllPostsPage() {
  // limit LOST & FOUND pet data to 6
  // const lost6pets = [{ name: "Benben" }, { name: "Hanna" }];
  // const found6pets = [{ name: "Tina" }, { name: "Stella" }];

  return (
    <div className="all-posts-container">
      <h1>All Posts Home Page</h1>
      {/* TODO: Show first 6 LOST pets - use pet card instead - need data */}
      <div className="first6-lost-container">
        <p>This is a LOST pet card.</p>
        <p>This is a LOST pet card.</p>
        <p>This is a LOST pet card.</p>
        <p>This is a LOST pet card.</p>
        <p>This is a LOST pet card.</p>
        <p>This is a LOST pet card.</p>
        {/* {lost6pets.map((lost, index) => {
          return <PetCard key="index" data="lost" type="found" />;
        })} */}
      </div>

      <br />
      {/* Jump to LOST page */}
      <Link to="/LostPosts">
        <h3>More in LOST</h3>
      </Link>
      {/* TODO: Show first 6 FOUND pets - use pet card instead */}
      <div className="first6-found-container">
        <p>This is a FOUND pet card.</p>
        <p>This is a FOUND pet card.</p>
        <p>This is a FOUND pet card.</p>
        <p>This is a FOUND pet card.</p>
        <p>This is a FOUND pet card.</p>
        <p>This is a FOUND pet card.</p>
        {/* {found6pets.map((found, index) => {
          return <PetCard key="index" data="found" type="found" />;
        })} */}
      </div>

      <br />
      {/* Jump to LOST page */}
      <Link to="/FoundPosts">
        <h3>More in FOUND</h3>
      </Link>
    </div>
  );
}
