// import * as usersService from "../../utilities/users-service";
//import post from "../../../models/post";
import PetCard from "../../components/PetCard/PetCard";
import { useEffect, useState } from "react";

export default function LostPostsPage( { posts } ) {
  // data with type=Lost
  // const lostData = ...;
  return (
    <>
      <h3>This is LostPostsPage</h3>
      {posts.map((post) => {
       return <PetCard key={post._id} post={post}/>
      })}
    </>
  );
}
