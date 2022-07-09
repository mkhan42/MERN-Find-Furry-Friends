import PostForm from "../../components/PostForm/PostForm";
import "./NewPostPage.css";

export default function NewPostPage({ user }) {
  return (
    <div className="new-post-container">
      <h1>Create a new POST:</h1>
      <PostForm user={user} />
    </div>
  );
}
