import sendRequest from "./send-request";

const BASE_URL = "/api/posts";

//get all posts
export function getAll() {
  return sendRequest(BASE_URL);
}

// Add post not create post?
export function addPost(postId) {
  // Just send postId for best security (no pricing)
  return sendRequest(`${BASE_URL}/${postId}`, "POST");
}
