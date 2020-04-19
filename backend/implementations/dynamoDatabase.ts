import { v4 as uuid } from "uuid";

import { DatabaseOperations } from "../interfaces/databaseOperations";
import { Product } from "../interfaces/Product";

/* Stores all objects of driveinmarkt in a dynamoDatabase
 The structure is the following:
 primaryKey:
 can be USER# to indicate user objects which contain the ids to their respective stores and orders
 can be STORE# to indicate store objects
 can be ORDER# to indicate an order object
 secondaryKey:
 can be METADATA# to indicate data belonging to the parent (User or store)
 can be PRODUCT# for STORE# entries to indicate a product
*/

import AWS from "aws-sdk";
AWS.config.update({
  region: process.env.AWS_REGION,
});

const dynamodb = new AWS.DynamoDB({ apiVersion: "2020-04-04" });

export class DynamoDatabase<T> implements DatabaseOperations<T> {
  tableName: string;
  tablePrimaryKey: string;
  constructor(tableName: string, tablePrimaryKey: string) {
    this.tableName = tableName;
    this.tablePrimaryKey = tablePrimaryKey;
  }

  async createUser({ name, email, phone }): Promise<boolean> {
    // TODO: add authentication
    const dynamoT: any = {
      PK: { S: "USER#" + email },
      SK: { S: "METADATA#" },
      name: { S: name },
      email: { S: email },
      phone: { S: phone },
    };
    try {
      const result = await dynamodb
        .putItem({
          TableName: this.tableName,
          Item: dynamoT,
          ConditionExpression: "attribute_not_exists (PK)",
        })
        .promise();
      if (result) {
        return true;
      }
    } catch (error) {
      if (error.name == "ConditionalCheckFailedException") {
        throw new Error("user exists");
      }

      throw new Error(error);
    }
    return false;
  }

  async createStore({
    userPK,
    name,
    description,
    picture,
    street,
    street_number,
    zip,
    city,
    country,
  }): Promise<boolean> {
    // Add storePK to userObject
    const storePK = uuid();
    const storeObjectUser: any = {
      PK: { S: userPK },
      SK: { S: "STORE#" + name },
      StorePK: { S: storePK },
    };
    try {
      await dynamodb
        .putItem({
          TableName: this.tableName,
          Item: storeObjectUser,
          ConditionExpression: "attribute_not_exists (SK)",
        })
        .promise();
    } catch (error) {
      // Reject if store name exists for this user
      if (error.name == "ConditionalCheckFailedException") {
        throw new Error("Store name exists for this user");
      }

      throw new Error(error);
    }

    // Create store dynamo object.
    const dynamoT: any = {
      PK: { S: "STORE#" + storePK },
      SK: { S: "METADATA#" + storePK },
      name: { S: name },
      description: { S: description },
      picture: { S: picture },
      street: { S: street },
      street_number: { S: street_number },
      zip: { S: zip },
      city: { S: city },
      country: { S: country },
      userPK: { S: userPK },
    };
    try {
      // Store dynamo object in database.
      const result = await dynamodb
        .putItem({
          TableName: this.tableName,
          Item: dynamoT,
          ConditionExpression: "attribute_not_exists (PK)",
        })
        .promise();
      if (result) {
        return true;
      }
    } catch (error) {
      if (error.name == "ConditionalCheckFailedException") {
        throw new Error("Store key exists. (Should not happen.)");
      }

      throw new Error(error);
    }
    return false;
  }

  async createProduct({
    name,
    description,
    price,
    pictures,
    storePK,
  }): Promise<boolean> {
    // Add storePK to userObject
    const dynamoStoreProduct: any = {
      PK: { S: storePK },
      SK: { S: "PRODUCT#" + name },
      name: { S: name },
      description: { S: description },
      price: { S: price },
      pictures: { SS: pictures },
    };
    try {
      await dynamodb
        .putItem({
          TableName: this.tableName,
          Item: dynamoStoreProduct,
          ConditionExpression: "attribute_not_exists (SK)",
        })
        .promise();
      return true;
    } catch (error) {
      // Reject if product name exists for this user
      if (error.name == "ConditionalCheckFailedException") {
        throw new Error("Product name exists for this user");
      }

      throw new Error(error);
    }
  }

  async getAll(key: string): [T] {
    // Read store object from current user.
    const userStoresParams = {
      KeyConditionExpression: "#PK = :PK AND begins_with(#SK,:SK)",
      ExpressionAttributeNames: {
        "#PK": "PK",
        "#SK": "SK",
      },
      ExpressionAttributeValues: {
        ":PK": { S: userPK },
        ":SK": { S: "STORE#" },
      },
      TableName: this.tableName,
    };
    const storesFromUser = await dynamodb.query(userStoresParams).promise();

    try {
      dynamodb
        .query({
          TableName: this.tableName,
          ExpressionAttributeValues: {
            ":store_id": {
              S: key,
            },
            ":product_id": {
              S: "123",
            },
          },
          KeyConditionExpression: "store_id = :store_id ",
        })
        .promise()
        .then((values: any) => {
          console.log("RESULT", values);
          return values;
        });
    } catch (error) {
      console.log("Error in reading:", error);
      return undefined;
    }
  }
  update(object: Product, key: string): Product {
    throw new Error("Method not implemented.");
  }

  delete(key: string): boolean {
    throw new Error("Method not implemented.");
  }

  static isProduct(object: any): object is Product {
    return "product_id" in object;
  }

  buildDynamoT(object: T): any {
    let types;
    if (DynamoDatabase.isProduct(object)) {
      types = {
        name: "S",
        description: "S",
        price: "N",
        url: "SS",
        store_id: "S",
        product_id: "S",
      };
    } else {
      throw Error("No dynamo definition found for object:" + object);
    }

    let dynamoProduct: any = {};
    for (const entry in object) {
      let value;
      if (types[entry] == "SS") {
        let str = object[entry];
        str = str.replace(/'/g, '"');
        value = JSON.parse(str);
      } else if (types[entry] == "S" || types[entry] == "N") {
        value = object[entry];
      } else {
        throw Error("missing type found:" + types[entry]);
      }

      dynamoProduct[entry] = { [types[entry]]: value };
    }
    console.log(dynamoProduct);
    return dynamoProduct;
  }
}
