import { Link } from "react-router-dom";

export default function PetCard({ post }) {
  // TBD???
  // for example: /found/12345 or /lost/12346
  let petURL = `/${post._id}`;
  return (
    <>
      <Link to={petURL}>
        <h3>{post.title}</h3>
      </Link>
      <div>
        <p>animal name: {post.name}</p>
      </div>
      <br />
    </>
  );
}
