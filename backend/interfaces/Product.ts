import { Url } from "url";
export interface Product {
  name: string;
  description: string;
  price: number;
  url: [Url];
  store_id: string;
  product_id: string;
}
