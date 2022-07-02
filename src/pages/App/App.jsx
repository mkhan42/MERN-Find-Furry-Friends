import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
// Pages
import AuthPage from "../AuthPage/AuthPage";
import AllPostsPage from "../AllPostsPage/AllPostsPage";
import NewPostPage from "../NewPostPage/NewPostPage";
import FoundPostsPage from "../FoundPostsPage/FoundPostsPage";
import LostPostsPage from "../LostPostsPage/LostPostsPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
// Components
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* TODO: confirm w/ team */}
            <Route path="/AllPosts" element={<AllPostsPage />} />
            {/* <Route path="/FoundPosts" element={<FoundPostsPage />} />
            <Route path="/LostPosts" element={<LostPostsPage />} /> */}
            <Route path="/NewPost" element={<NewPostPage />} />
            <Route path="/:UserId" element={<UsersPage />} />
            {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
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
