import LostPostsPage from "../LostPostsPage/LostPostsPage";
import FoundPostsPage from "../FoundPostsPage/FoundPostsPage";
import { Link } from "react-router-dom";
export default function AllPostsPage({ posts }) {
  return (
    <div className="all-posts-container">
      <h1>AllPostsPage</h1>
      {/* ONLY Show 6 LOST pets */}
      <LostPostsPage />
      &nbsp; | &nbsp;
      {/* Jump to LOST page */}
      <Link to="/LostPosts">More in LOST</Link>
      {/* ONLY Show 6 FOUND pets */}
      <FoundPostsPage />
      &nbsp; | &nbsp;
      {/* Jump to LOST page */}
      <Link to="/FoundPosts">More in FOUND</Link>
    </div>
  );
}
