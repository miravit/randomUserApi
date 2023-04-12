import { randomUserApi } from "./services/randomUsersApi";

export async function createHtml() {
  const result = await randomUserApi();
  for (let i = 0; i < result.results.length; i++) {
    const response = result.results[i];
    console.log("-->", response.location.street.number);
  }
}
