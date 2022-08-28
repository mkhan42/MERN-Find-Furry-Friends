import sendRequest from "./send-request";

const BASE_URL = "https://mern-find-furry-friends.vercel.app/api/comments";

// get all comments by Postid
export function getAll(postId) {
  return sendRequest(`${BASE_URL}/${postId}`);
}

// get all comments by UserId
export function getUserComments(userId) {
  return sendRequest(`${BASE_URL}/user/${userId}`);
}

// create a comment in a Post
export function createComment(postId, data) {
  return sendRequest(`${BASE_URL}/${postId}`, "POST", data);
}

// delete a comment in a Post
export function deleteComment(commentId) {
  return sendRequest(`${BASE_URL}/${commentId}`, "DELETE");
}
