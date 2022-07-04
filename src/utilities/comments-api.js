import sendRequest from "./send-request";

const BASE_URL = "/api/comments";

//get all comments
export function getAll() {
  return sendRequest(BASE_URL);
}

// Add a comment to the comments????
export function addComment(commentId) {
  // Just send commentId for best security (no pricing)
  return sendRequest(`${BASE_URL}/${commentId}`, "POST");
}
