import { Address } from "./Address";
import { Url } from "url";

export interface Store {
  name: string;
  address: Address;
  description: string;
  picture: Url;
}
