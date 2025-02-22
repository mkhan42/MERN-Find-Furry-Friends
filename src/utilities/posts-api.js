import sendRequest from "./send-request";

const BASE_URL = "/api/posts";

export function getAll() {
  return sendRequest(BASE_URL);
}

export function createPost(postData) {
    return sendRequest(`${BASE_URL}`, 'POST', postData);
  }

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function updatePost(id, body) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', body);
}

export function deletePost(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export function vote(id, body) {
  return sendRequest(`${BASE_URL}/${id}/vote`, 'PUT', body);
}
