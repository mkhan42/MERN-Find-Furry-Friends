export default function PostForm() {
  return (
    <>
      <h1>this is a create Post form</h1>
      <form>
        <label>Post Title:</label>
        <input type="text" name="postTitle"></input>
        <label>Post Type:</label>
       <select name="postType">
         <option>Lost</option>
         <option>Found</option>
       </select>
        <label>Name:</label>
        <input type="text" name="name"></input>
        <label>Image URL:</label>
        <input type="text" name="imgURL"></input>
        <label>Animal Type:</label>
        <input type="text" name="animalType"></input>
        <label>Age:</label>
        <input type="text" name="age"></input>
        <label>Last seen/found:</label>
        <input type="text" name="lastAddress" placeholder="Address"></input>
        <label>Description:</label>
        <input type="text" name="description"></input>
        <label>Reward:</label>
        <input type="text" name="reward"></input>
        <label>Contact Info:</label>
        <input type="text" name="contactInfo"></input>
        <label>Day pet was lost/found?:</label>
        <input type="text" name="date"></input>
        <input type="submit"></input>
      </form>
    </>
  );
}
