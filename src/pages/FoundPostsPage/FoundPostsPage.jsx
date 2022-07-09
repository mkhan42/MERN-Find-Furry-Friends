import PetCard from "../../components/PetCard/PetCard";
import { useState } from "react";
import { Card, Input } from "semantic-ui-react";

export default function FoundPostsPage({ posts }) {
  // data with postType=Found
  const foundData = posts.filter((p) => p.postType === "Found");
  // console.log(foundData);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  function searchItem(value) {
    setSearchInput(value);
    if (searchInput !== 0) {
      const filteredData = foundData.filter((post) => {
        return Object.values(post.animalType)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    }
  }

  return (
    <>
      <h1>Found Posts</h1>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => {
          searchItem(e.target.value);
        }}
      />
      <div></div>
      {foundData.length ? (
        <div>
          <Card.Group>
            {searchInput.length === 0
              ? foundData.map((post) => {
                  return <PetCard key={post._id} post={post} />;
                })
              : filteredResults.map((post) => {
                  return <PetCard key={post._id} post={post} />;
                })}
          </Card.Group>
        </div>
      ) : (
        <h2>No Found Post</h2>
      )}
    </>
  );
}
