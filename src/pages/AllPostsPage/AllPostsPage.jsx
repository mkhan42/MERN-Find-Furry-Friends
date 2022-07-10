import "./AllPostsPage.css";
import PetCard from "../../components/PetCard/PetCard";

import { Link } from "react-router-dom";
export default function AllPostsPage({ posts }) {
  // limit LOST & FOUND pet data to 6
  const losts6 =
    posts && posts.filter((p) => p.postType === "Lost").slice(0, 8);
  // console.log(losts6);
  const found6 =
    posts && posts.filter((p) => p.postType === "Found").slice(0, 8);
  // console.log(found6);

  return (
    <>
      {posts ? (
        <div className="all-posts-container">
          <h2>Lost Pets</h2>
          <div className="lostfirst6-container">
            {losts6.map((lost) => {
              return <PetCard key={lost._id} post={lost} />;
            })}
          </div>
       
          {/* Jump to LOST page */}
          <Link className="morein" to="/LostPosts">
            <h5 className="allposth5">...More in LOST</h5>
          </Link>
          <br />
            <hr className="devider"/>
            <hr className="devider"/>
            <hr className="devider"/>
            <h2>Found Pets</h2>
          <div className="foundfirst6-container">
        {found6.map((found) => {
              return <PetCard key={found._id} post={found} />;
            })}
          </div>
          {/* Jump to LOST page */}
          <Link  className="morein" to="/FoundPosts">
            <h5 className="allposth5">...More in FOUND</h5>
          </Link>
          <br />
        </div>
      ) : (
        <h1> No Post Yet - Create One</h1>
      )}
    </>
  );
}
