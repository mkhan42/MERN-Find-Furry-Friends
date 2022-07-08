import { Link } from "react-router-dom";
import React from "react";
export default function PetCard({ post }) {
  let petURL = `/${post._id}`;
  return (
    <>
      <Link to={petURL}>
        {/* <p>{post.postTitle}</p> */}
        <img src={post.imgURL} alt={post.name} className="animalImg" />
      </Link>
    </>
  );
}
