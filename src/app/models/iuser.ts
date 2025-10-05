import { Iwatchlist } from "./iwatchlist";

export interface Iuser {
  username: string;
  email: string;
  password: string;
  wishlist: Iwatchlist;
}
