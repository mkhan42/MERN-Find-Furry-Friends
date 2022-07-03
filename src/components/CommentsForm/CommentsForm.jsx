export default function CommentsForm({ setComments }) {
  function handleChange() {}

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Comment Title: </label>
      <input type="text" name="commentTitle"></input>
      <label>Content:</label>
      <input type="text" name="content" />
      <input type="submit" />
    </form>
  );
}
