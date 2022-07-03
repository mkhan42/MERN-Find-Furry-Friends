export default function CommentsCard({ comments }) {
  return (
    <div className="Comments-Card-container">
      {comments.map((c) => {
        return (
          <>
            <p>Title: {c.commentTitle}</p>
            <p>Contents: {c.content}</p>
            <p>Created by: {c.user}</p>
          </>
        );
      })}
    </div>
  );
}
