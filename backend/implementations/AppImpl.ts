import { ProductDatabase } from "../interfaces/productDatabase";
import { DynamoDatabase } from "./dynamoDatabase";
export class AppImpl {
  static productDb: ProductDatabase;

  static getProductDB(): ProductDatabase {
    if (!AppImpl.productDb) {
      //
      AppImpl.productDb = new DynamoDatabase(
        process.env.PRODUCT_TABLE_NAME,
        "product_id"
      );
    }
    return AppImpl.productDb;
  }
}
