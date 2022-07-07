import "./UsersPage.css";
import PetCard from "../../components/PetCard/PetCard";

// "Friday, Jul 2, 2021"
const today = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function UsersPage({ user, posts }) {
  const userPosts = posts.filter((p) => p.user === user._id);
  console.log(userPosts);
  //const userComments;

  return (
    <>
      <h1>HI, {user.name.toUpperCase()}</h1>
      <p>All info as of {today}</p>
      <div className="user-info-container">
        <h3>YOUR EMAIL: {user.email}</h3>
        <h3>YOUR POSTS:</h3>
        {/* if I have post then show posts, else show "No Post yet" */}
        {userPosts.length ? (
          <section className="user-posts-container">
            <ul>
              {userPosts.map((post) => {
                return (
                  <li>
                    <PetCard key={post._id} post={post} />
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <h3>No Posts Yet</h3>
        )}
      </div>
      {/* COMMENTS SECTION */}
      {/* if I have comments, else show "No Comments yet" */}
      <h3>YOUR COMMENTS:</h3>
      <section className="user-comments-container">
        <ul>
          <li>
            <a href="/">comment1</a>
            &nbsp; | &nbsp;
            <a href="/">Delete</a>
          </li>
        </ul>
      </section>

      {/* after mvp */}
      {/* if someone comment our post, we got notification... */}
      {/* <h3>
        InMail: ??number?? - click then show the list - comment in the post
      </h3>  */}
    </>
  );
}
