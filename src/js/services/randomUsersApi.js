import { UserResponse } from "../models/UserResponse";

export async function randomUserApi(page, results, gender) {
  return fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&gender=${gender}`
  )
    .then((response) => response.json())
    .then((data) => {
      const result = new UserResponse(data.results);
      return result;
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
      throw error;
    });
}
