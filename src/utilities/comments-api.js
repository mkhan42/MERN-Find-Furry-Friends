import sendRequest from "./send-request";

const BASE_URL = "/api/comments";

// get all comments by Postid
export function getAll(postId) {
  return sendRequest(`${BASE_URL}/${postId}`);
}

// export function addComment(commentId) {
//   // Just send commentId for best security (no pricing)
//   return sendRequest(`${BASE_URL}/comments/${commentId}`, "POST");
// }

// create a comment in a Post
export function createComment(postId, data) {
  return sendRequest(`${BASE_URL}/${postId}`, "POST", data);
}
