import PetCard from "../../components/PetCard/PetCard";
import { useState } from "react";
import { Card, Input, Dropdown } from "semantic-ui-react";
import "./LostPostsPage.css";

export default function LostPostsPage({ posts }) {
  // data with postType=Lost
  const lostData = posts && posts.filter((p) => p.postType === "Lost");

  const [searchContent, setSearchContent] = useState("animalType");
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const options = [
    { key: "animalType", text: "Animal Type", value: "animalType" },
    { key: "lastAddress", text: "Last Found Address", value: "lastAddress" },
    { key: "reward", text: "Reward", value: "reward" },
  ];

  function handleOptions(e, data) {
    setSearchContent(data.value);
  }

  function searchItems(searchValue) {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = lostData.filter((post) => {
        return Object.values(post[searchContent])
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
    <div className="container">
      <h1 className="lostpageh1">Lost Posts</h1>
      <Input
        action={
          <Dropdown
            button
            basic
            floating
            options={options}
            defaultValue="animalType"
            onChange={handleOptions}
            className="navbar navbar-light bg-light"
            id="searchforlostpage"
          />
        }
        icon="search"
        iconPosition="left"
        placeholder="Search..."
        onChange={(e) => {
          searchItems(e.target.value);
        }}
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
        <h2 className="lostpageh1">No Lost Post</h2>
      )}
    </div>
  );
}
