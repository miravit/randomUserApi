import axios from "axios";
import { IUser } from "../models/IUser";
import { IUserResponse } from "../models/IUserResponse";

export const randomUsers = async (): Promise<IUser[]> => {
  return await axios
    .get<IUserResponse>("https://randomuser.me/api/?results=50")
    .then((data) => {
      return data.data.results;
    })
    .catch(() => {
      return [];
    });
};
