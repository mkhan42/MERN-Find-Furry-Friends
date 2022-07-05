import PetCard from "../../components/PetCard/PetCard";

export default function FoundPostsPage({ posts }) {
  // data with type=Found
  // const foundData = ...;
  return (
    <div>
      <h3>this is FoundPostsPage</h3>
      {posts.map((post) => {
        return <PetCard key={post._id} post={post} />;
      })}

      
    </div>
  );
}
