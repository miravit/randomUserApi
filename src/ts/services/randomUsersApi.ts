import axios from "axios";

export function randomUsers() {
  return axios.get("https://randomuser.me/api/?results=50").then((response) => {
    return response.data;
  });
}
