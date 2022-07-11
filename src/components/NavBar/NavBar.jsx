import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import Avatar, { ConfigProvider } from 'react-avatar';
export default function NavBar({ user, setUser }) {
  // Add the following function
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav  id="navbar" >
      <Link className="navbar-brand" to="/AllPosts">All Posts</Link>
      &nbsp; | &nbsp;
      <Link  className="navbar-brand" to="/LostPosts">LOST</Link>
      &nbsp; | &nbsp;
      <Link className="navbar-brand" to="/FoundPosts">FOUND</Link>
    
      &nbsp; | &nbsp;
      <Link className="navbar-brand" to="/NewPost">New Post</Link>
      &nbsp; | &nbsp;
      <Link className="navbar-brand" to="/myaccount">My Account</Link>
      &nbsp; | &nbsp;
      <Link className="navbar-brand" to="" onClick={handleLogOut}>
        Log Out
      </Link>
      
   
    </nav>
  );
}
