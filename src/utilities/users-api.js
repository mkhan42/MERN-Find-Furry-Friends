import { getToken } from "./users-service";
import sendRequest from "./send-request";

// This is the base path of the Express rout we'll defing
const BASE_URL = "/api/users";

// Get user name by user id
// export async function getUserInfoById(userId) {
//   return sendRequest(`${BASE_URL}/${userId}`, "GET");
// }

export async function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
