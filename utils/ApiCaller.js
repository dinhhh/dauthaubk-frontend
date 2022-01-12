import { API_URL } from "../config/Api";
import { getToken, AUTH_TOKEN_STORAGE_KEY } from "./AuthToken";

export const AUTH_PREFIX = "Bearer ";

export const getApi = async (path, page = 0, size = 10) => {
  const LOG_TAG = "[GET API Handler] ";
  const url = API_URL + path + "?page=" + page + "&size=" + size;
  console.log(LOG_TAG + " Start get API at " + url);
  const response = await fetch(url);
  const myJson = await response.json();
  // console.log(LOG_TAG + " my json = " + JSON.stringify(myJson));
  return myJson;
}

export const postApi = async (path, requestBody = {}, page = 0, size = 10) => {
  const LOG_TAG = "[POST API Handler] ";
  const url = API_URL + path + "?page=" + page + "&size=" + size;
  console.log(LOG_TAG + " Start get API at " + url + " with request body = " + JSON.stringify(requestBody));
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const myJson = await response.json();
  return myJson;
}

export const postApiWithAuth = async (path, requestBody = {}) => {
  const authToken = await getToken(AUTH_TOKEN_STORAGE_KEY);

  const url = API_URL + path;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': AUTH_PREFIX + authToken
    },
    body: JSON.stringify(requestBody)
  });

  return response;
}
