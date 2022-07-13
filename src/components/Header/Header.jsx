import "./Header.css";
import Title from "../Title/Title.jsx"
import React from "react";

export default function Header({ user, setUser }) {
  return (
    <header>
      {/* Add each one's GitHub link later  - and year */}
      <Title />
      
      <br />
      <span className="username"> Welcome, {user.name}</span> 
      <div className="img"></div>
    </header>
  );
}
