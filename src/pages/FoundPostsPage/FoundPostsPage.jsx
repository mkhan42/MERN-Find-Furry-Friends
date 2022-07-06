import PetCard from "../../components/PetCard/PetCard";

export default function FoundPostsPage({ posts }) {
  // data with postType=Found
  const foundData = posts.filter((p) => p.postType === "Found");
  // console.log(foundData);
  return (
    <>
      <h1>this is FoundPostsPage</h1>
      {foundData.length ? (
        <div>
          {foundData.map((post) => {
            return <PetCard key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <h2>No Found Post</h2>
      )}
    </>
  );
}
