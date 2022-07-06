import "./AllPostsPage.css";
import PetCard from "../../components/PetCard/PetCard";

import { Link } from "react-router-dom";
export default function AllPostsPage({ posts }) {
  // limit LOST & FOUND pet data to 6
  const losts6 = posts.filter((p) => p.postType === "Lost").slice(0, 6);
  console.log(losts6);
  const found6 = posts.filter((p) => p.postType === "Found").slice(0, 6);
  console.log(found6);

  return (
    <>
      {posts.length ? (
        <div className="all-posts-container">
          <h1>All Posts Home Page</h1>
          <div className="first6-lost-container">
            {losts6.map((lost) => {
              return <PetCard key={lost._id} post={lost} />;
            })}
          </div>
          <br />
          {/* Jump to LOST page */}
          <Link to="/LostPosts">
            <h3>More in LOST</h3>
          </Link>

          <div className="first6-found-container">
            {found6.map((found) => {
              return <PetCard key={found._id} post={found} />;
            })}
          </div>
          <br />
          {/* Jump to LOST page */}
          <Link to="/FoundPosts">
            <h3>More in FOUND</h3>
          </Link>
        </div>
      ) : (
        <h1> No Post Yet - Create One</h1>
      )}
    </>
  );
}
