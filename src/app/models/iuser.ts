import { Imovie } from "./imovie";

export interface Iuser {
  username: string;
  email: string;
  password: string;
  wishlist: Imovie[];
}
