import LostPostsPage from "../LostPostsPage/LostPostsPage";
import FoundPostsPage from "../FoundPostsPage/FoundPostsPage";

export default function AllPostsPage() {
  return (
    <div className="all-posts-container">
      <h1>AllPostsPage</h1>
      <LostPostsPage />
      <FoundPostsPage />
    </div>
  );
}
