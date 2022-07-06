import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
// Pages
import AuthPage from "../AuthPage/AuthPage";
import AllPostsPage from "../AllPostsPage/AllPostsPage";
import NewPostPage from "../NewPostPage/NewPostPage";
import FoundPostsPage from "../FoundPostsPage/FoundPostsPage";
import LostPostsPage from "../LostPostsPage/LostPostsPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import PetDetailsPage from "../../pages/PetDetailsPage/PetDetailsPage";
import UpdatePostPage from "../../pages/UpdatePostPage/UpdatePostPage";
// Components
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import * as postsAPI from "../../utilities/posts-api";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // load all posts at the first time
    async function fetchPosts() {
      const po = await postsAPI.getAll();
      setPosts(po);
    }
    fetchPosts();
  }, []);
  // BUG:
  // [posts] - infinite running
  // [] - refresh lost/found page then it's gone
  //    - refresh home page is fine

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/AllPosts" element={<AllPostsPage posts={posts} />} />
            <Route
              path="/FoundPosts"
              element={<FoundPostsPage posts={posts} />}
            />
            <Route
              path="/LostPosts"
              element={<LostPostsPage posts={posts} />}
            />
            <Route path="/NewPost" element={<NewPostPage user={user} />} />
            <Route
              path="/myaccount"
              element={<UsersPage user={user} posts={posts} />}
            />
            <Route path="/:postId" element={<PetDetailsPage user={user} />} />

            <Route
              path=":postId/EditPost"
              element={<UpdatePostPage posts={posts} />}
            />

            {/* redirect to /AllPosts if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/AllPosts" />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}

      <Footer />
    </main>
  );
}
