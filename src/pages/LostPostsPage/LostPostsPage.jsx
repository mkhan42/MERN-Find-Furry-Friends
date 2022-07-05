import PetCard from "../../components/PetCard/PetCard";

export default function LostPostsPage({ posts }) {
  // data with postType=Lost
  const lostData = posts.filter((p) => p.postType === "Lost");
  // console.log(lostData);
  return (
    <>
      <h3>This is LostPostsPage</h3>
      {lostData.map((post) => {
        return <PetCard key={post._id} post={post} />;
      })}
    </>
  );
}
