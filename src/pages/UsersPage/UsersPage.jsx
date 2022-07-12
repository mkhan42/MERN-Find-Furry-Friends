import "./UsersPage.css";
import React from "react";
import { useState, useEffect } from "react";
import PetCard from "../../components/PetCard/PetCard";
import * as commentsAPI from "../../utilities/comments-api";
import Avatar, { ConfigProvider } from "react-avatar";

const today = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const moment = require("moment");

export default function UsersPage({ user, posts }) {
  ///////////////////////////
  // grab user posts
  ///////////////////////////
  const userPosts = posts?.filter((p) => p.user === user._id);
  ///////////////////////////
  // grab user comments
  ///////////////////////////
  const [userComments, setUserComments] = useState([]);
  useEffect(() => {
    // load comments only at the first time
    async function fetchComments() {
      const com = await commentsAPI.getUserComments(user._id);
      setUserComments(com);
    }
    fetchComments();
  }, [user._id]);
  return (
    <>
      {/* <div className="my-user-card card">
      <div className="my-header-card">
      <div className="user-welcome card-title"> */}
      <div id="accContainer">
        <div className="my-header-card">
          <h1 id="my-title">HI, {user.name.toUpperCase()}</h1>
          {/* </div> */}
          {/* <img src={user.userProfileImg}  alt="hello" width="200px"/> */}
          {/* (<Avatar name={ user.name } /> ) */}
          {user.userProfileImg === "" ? (
            <ConfigProvider
              colors={[
                "red",
                "green",
                "blue",
                "pink",
                "purple",
                "orange",
                "yellow",
              ]}
            >
              <Avatar name={user.name} round={true} />
            </ConfigProvider>
          ) : (
            <img src={user.userProfileImg} alt="hello" width="200px" />
          )}
        </div>
        <p className="my-info-p">All info as of {today}</p>
        {/* <div className="user-info-container"> */}
        <h3 className="my-email">{user.email}</h3>
        <h3 className="my-posts">POSTS</h3>
        {/* if I have post then show posts, else show "No Post yet" */}
        {userPosts?.length ? (
          <section className="user-posts-container card-text">
            <ol>
              {userPosts?.map((post) => {
                return (
                  <li>
                    <hr className="my-hr" />
                    <PetCard key={post._id} post={post} />
                    created at:{" "}
                    {moment(post.createdAt).format("MM/DD/YYYY HH:mm")}
                  </li>
                );
              })}
            </ol>
            <hr />
          </section>
        ) : (
          <h3>No Posts Yet</h3>
        )}
        {/* </div> */}
        {/* COMMENTS SECTION */}
        {/* if I have comments, else show "No Comments yet" */}
        <h3 className="my-comments">COMMENTS</h3>
        {userComments.length ? (
          <section className="user-comments-container">
            <ol>
              {userComments.map((c) => {
                return (
                  <li>
                    <a
                      className="my-linked-comm"
                      key={c._id}
                      href={`/${c.post}`}
                    >
                      {c.commentTitle}
                    </a>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : (
          <h3>You haven't made any comments yet</h3>
        )}

        {/* after mvp */}
        {/* if someone comment our post, we got notification... */}
        {/* <h3>
        InMail: ??number?? - click then show the list - comment in the post
      </h3>  */}
        {/* </div>
      </div>
      </div> */}
      </div>
    </>
  );
}
