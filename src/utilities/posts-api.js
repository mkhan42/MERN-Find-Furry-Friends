import sendRequest from './send-request';

const BASE_URL = '/api/posts';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function addPost(postData) {
    return sendRequest(`${BASE_URL}/addPost`, 'POST', postData);
  }