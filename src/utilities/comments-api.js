import sendRequest from "./send-request";

const BASE_URL = "/api/comments";

//get all comments
export function getAll() {
  return sendRequest(BASE_URL);
}

// export function addComment(commentId) {
//   // Just send commentId for best security (no pricing)
//   return sendRequest(`${BASE_URL}/comments/${commentId}`, "POST");
// }

// create a comment
export function createComment(data) {
  return sendRequest(BASE_URL, "POST", data);
}
