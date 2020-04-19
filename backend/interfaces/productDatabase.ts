import { Product } from "./Product";
import { DynamoDatabase } from "../implementations/dynamoDatabase";
export interface ProductDatabase extends DynamoDatabase<Product> {}
