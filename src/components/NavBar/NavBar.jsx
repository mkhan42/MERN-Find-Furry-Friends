import "./NavBar.css";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  // Add the following function
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav>
      {/* TODO: to update the link?? */}
      <Link to="/findfurryfriends">All Posts</Link>
      &nbsp; | &nbsp;
      {/* TODO: to update the link?? */}
      <Link to="/findfurryfriends/new">New Post</Link>
      &nbsp; | &nbsp; Welcome, {user.name}
      &nbsp; | &nbsp;
      {/* TODO: to update the link?? */}
      <Link to="/findfurryfriends/:userName">My Account</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
