import PetCard from "../../components/PetCard/PetCard";
import { useState } from "react";
import { Card, Input } from "semantic-ui-react";

export default function LostPostsPage({ posts }) {
  // data with postType=Lost
  const lostData = posts && posts.filter((p) => p.postType === "Lost");
  // console.log(lostData);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  function searchItems(searchValue) {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = lostData.filter((post) => {
        return Object.values(post.animalType)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(lostData);
    }
  }

  return (
    <>
      <h1>Lost Posts</h1>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <div></div>

      {lostData?.length ? (
        <div>
          <Card.Group>
            {searchInput.length === 0
              ? lostData.map((post) => {
                  return <PetCard key={post._id} post={post} />;
                })
              : filteredResults.map((post) => {
                  return <PetCard key={post._id} post={post} />;
                })}
          </Card.Group>
        </div>
      ) : (
        <h2>No Lost Post</h2>
      )}
    </>
  );
}
