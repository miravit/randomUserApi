import { randomUsers } from "./services/randomUsersApi";
import { IUser } from "./models/IUser";

export async function createHtml(): Promise<void> {
  const userList: IUser[] = await randomUsers();
  userList.forEach((users: IUser) => {
    console.log("en user", users.picture.large);
  });
}

createHtml();
