import "./Header.css";
import React from "react";

export default function Header({ user, setUser }) {
  return (
    <header>
      {/* Add each one's GitHub link later  - and year */}
      <span id="title" >FIND FURRY FRIENDS</span>
      
      <br />
      <span class="username"> Welcome, {user.name}</span> 
      <div class="img"></div>
    </header>
  );
}
