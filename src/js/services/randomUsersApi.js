import { UserResponse } from "../models/UserResponse";

export const randomUserApi = () => {
  return fetch("https://randomuser.me/api/?results=10") //results should be set to 50 after implementing pagination
    .then((response) => response.json())
    .then((data) => {
      const result = new UserResponse(data.results);
      return result;
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
      throw error;
    });
};
