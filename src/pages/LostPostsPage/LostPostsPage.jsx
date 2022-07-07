import PetCard from "../../components/PetCard/PetCard";

export default function LostPostsPage({ posts }) {
  // data with postType=Lost
  const lostData = posts && posts.filter((p) => p.postType === "Lost");
  console.log(lostData);
  return (
    <>
      <h1>This is LostPostsPage</h1>
      {lostData.length ? (
        <>
          {lostData.map((post) => {
            return <PetCard key={post._id} post={post} />;
          })}
        </>
      ) : (
        <h2>No Lost Post</h2>
      )}
    </>
  );
}
