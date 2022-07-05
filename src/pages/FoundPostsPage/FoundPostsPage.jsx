import PetCard from "../../components/PetCard/PetCard";

export default function FoundPostsPage({ posts }) {
  // data with postType=Found
  const foundData = posts.filter((p) => p.postType === "Found");
  // console.log(foundData);
  return (
    <div>
      <h3>this is FoundPostsPage</h3>
      {foundData.map((post) => {
        return <PetCard key={post._id} post={post} />;
      })}
    </div>
  );
}
