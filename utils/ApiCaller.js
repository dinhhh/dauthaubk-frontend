import { API_URL } from "../config/Api"

const LOG_TAG = "[GET API Handler] ";

export const getApi = async (path, page = 0, size = 10) => {
  const url = API_URL + path + "?page=" + page + "&size=" + size;
  console.log(LOG_TAG + " Start get API at " + url);
  const response = await fetch(url);
  const myJson = await response.json();
  // console.log(LOG_TAG + " my json = " + JSON.stringify(myJson));
  return myJson;
}