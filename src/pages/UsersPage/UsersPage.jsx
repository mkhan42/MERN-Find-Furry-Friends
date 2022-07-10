import "./UsersPage.css";
import React from "react";
import { useState, useEffect } from "react";
import PetCard from "../../components/PetCard/PetCard";
import * as commentsAPI from "../../utilities/comments-api";
import Avatar, { ConfigProvider } from 'react-avatar';

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
      <div className="my-user-card card" style={{height: '10rem'}}>
      <div className="my-header-card">
      <div className="user-welcome card-title">
      <h1>HI, {user.name.toUpperCase()}</h1>
      </div>

      <div className="my-user-img">
      { user.userProfileImg === "" ? 
      (<ConfigProvider colors={['red', 'green', 'blue', 'pink', 'purple', 'orange', 'yellow']}>
        <Avatar name={ user.name } round={true} className="card-img-top"/>
      </ConfigProvider> )
       : (<img src={user.userProfileImg} className="card-img-top my-user-img" alt="hello" width="200px"/>)
       }
       </div>
       </div>

       <div className="card-body my-user-card-body">
       <div className="my-user-info">
      <p className="card-text">All info as of {today}</p>
      <div className="user-info-container">
        <h3 className="card-title">YOUR EMAIL: {user.email}</h3>
        <h3 className="card-title">YOUR POSTS:</h3>
        {/* if I have post then show posts, else show "No Post yet" */}
        {userPosts?.length ? (
          <section className="user-posts-container card-text">
            <ol>
              {userPosts?.map((post) => {
                return (
                  <li>
                  <div className="user-pet-card-div">
                    <PetCard className="user-pet-card" key={post._id} post={post} /> <br/>
                    created at:{" "}
                    {moment(post.createdAt).format("MM/DD/YYYY HH:mm")}
                    </div>
                    <hr/>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : (
          <h3 className="card-title">No Posts Yet</h3>
        )}
      </div>
      {/* COMMENTS SECTION */}
      {/* if I have comments, else show "No Comments yet" */}
      <h3 className="card-title">YOUR COMMENTS:</h3>
      {userComments.length ? (
        <section className="user-comments-container">
          <ol>
            {userComments.map((c) => {
              return (
                <li>
                  <a href={`/${c.post}`}>{c.commentTitle}</a>
                </li>
              );
            })}
          </ol>
        </section>
      ) : (
        <h3 className="card-title">You haven't made any comments yet</h3>
      )}
      </div>
      </div>
      </div>

      {/* after mvp */}
      {/* if someone comment our post, we got notification... */}
      {/* <h3>
        InMail: ??number?? - click then show the list - comment in the post
      </h3>  */}
    </>
  );
}


{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}
