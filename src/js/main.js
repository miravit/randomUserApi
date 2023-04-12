import { UserResponse } from "./models/UserResponse";
import { randomUserApi } from "./services/randomUsersApi";

async function getUserResult() {
  const result = await randomUserApi();
  for (let i = 0; i < result.results.length; i++) {
    const test = result.results[i].dob;
    console.log("lol", test);
  }
}

getUserResult();
